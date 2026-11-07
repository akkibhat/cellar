#!/usr/bin/env python3
"""
Cut a bottle out of a studio product shot.

    python scripts/remove-bottle-background.py IN [IN ...] -o OUTDIR

Retailer bottle shots are a subject on a white sweep, which makes this a
solved problem without a model - but three details decide whether the result
is usable, and all three were found the hard way:

1. The background is "near-white REACHABLE FROM THE BORDER", not "near-white".
   Thresholding alone punches a hole through a cream label; flood-filling
   inward does not, because the label is walled in by dark glass.

2. The white has to be un-blended back out of the partially covered rim
   pixels, or the cutout wears a light fringe on dark backgrounds.

3. The background is rarely pure white - usually near-white with JPEG
   speckle. That noise floor has to be subtracted, otherwise the alpha ramp
   divides noise by noise and hands back a half-opaque backdrop.
"""
import argparse, os, sys
import numpy as np
from PIL import Image, ImageFilter


def _sweep(reach, cand, axis, rev):
    """One directional pass: extend `reach` along rows/columns through unbroken `cand` pixels."""
    r, c = (reach, cand) if not rev else (np.flip(reach, axis), np.flip(cand, axis))
    if axis == 0:
        r, c = r.T, c.T
    ar = np.arange(r.shape[1])[None, :]
    lastblk = np.maximum.accumulate(np.where(~c, ar, -1), axis=1)
    lastrch = np.maximum.accumulate(np.where(r, ar, -1), axis=1)
    out = c & (lastrch > lastblk)
    if axis == 0:
        out = out.T
    return np.flip(out, axis) if rev else out


def flood_from_border(cand, max_sweeps=64):
    """Everything in `cand` reachable from the border.

    Vectorised: PIL's ImageDraw.floodfill is pure Python and ~13x slower on a
    1MP image. (It also silently no-ops on a fromarray image, which is
    read-only until you .copy() it.)
    """
    reach = np.zeros_like(cand)
    reach[0, :] |= cand[0, :]
    reach[-1, :] |= cand[-1, :]
    reach[:, 0] |= cand[:, 0]
    reach[:, -1] |= cand[:, -1]
    for _ in range(max_sweeps):
        before = reach.sum()
        for axis, rev in ((1, False), (1, True), (0, False), (0, True)):
            reach |= _sweep(reach, cand, axis, rev)
        if reach.sum() == before:
            break
    return reach


def cut(path, tol=None):
    """Cut the bottle out of one image; return (RGBA image, alpha array), or (None, None) if no background found."""
    im = Image.open(path).convert("RGBA")
    flat = Image.new("RGBA", im.size, "#ffffff")
    flat.alpha_composite(im)            # composite onto WHITE: an RGBA source
    rgb = np.asarray(flat.convert("RGB")).astype(np.float64)   # over black would
    h, w = rgb.shape[:2]                                       # read as subject
    d = 255.0 - rgb.min(axis=2)         # 0 = pure white
    ring = np.concatenate([d[0], d[-1], d[:, 0], d[:, -1]])

    if tol is None:
        # Median/MAD, not a high percentile: where the bottle touches the frame
        # those border pixels are subject, and a p99 would drag the estimate up
        # until the flood eats the label.
        med = float(np.median(ring))
        mad = float(np.median(np.abs(ring - med)))
        tol = min(60.0, max(25.0, med + 6.0 * mad + 15.0))

    bg = flood_from_border(d <= tol)
    if not bg.any():
        return None, None

    # Cap the noise floor - it cancels speckle, which is small. Uncapped, an
    # image with very little reachable background yields a floor high enough to
    # dissolve a pale label.
    floor = min(float(np.percentile(d[bg], 99.5)), 40.0)

    band = (np.asarray(Image.fromarray((bg * 255).astype(np.uint8), "L")
                       .filter(ImageFilter.MaxFilter(5))) == 255) & ~bg
    # An edge pixel is coverage a of foreground F over white, so d = a * d_F:
    # normalise against the nearest solid pixel, not a global constant.
    dmax = np.maximum(np.asarray(Image.fromarray(np.clip(d, 0, 255).astype(np.uint8), "L")
                                 .filter(ImageFilter.MaxFilter(9))).astype(np.float64), 1.0)

    alpha = np.ones((h, w))
    soft = bg | band
    alpha[soft] = np.clip(np.clip(d[soft] - floor, 0.0, None)
                          / np.clip(dmax[soft] - floor, 1e-6, None), 0.0, 1.0)

    out = rgb.copy()
    part = (alpha > 0.02) & (alpha < 0.98)
    if part.any():
        a3 = alpha[part][:, None]
        out[part] = np.clip((rgb[part] - (1.0 - a3) * 255.0) / a3, 0, 255)

    res = np.dstack([out, alpha * 255.0]).round().astype(np.uint8)
    return Image.fromarray(res, "RGBA"), res[..., 3]


def main():
    """Cut out each input, save it as PNG in the output folder and flag suspicious results."""
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("inputs", nargs="+")
    ap.add_argument("-o", "--outdir", default="public/bottles")
    ap.add_argument("--tol", type=float, default=None,
                    help="override the auto background tolerance")
    a = ap.parse_args()
    os.makedirs(a.outdir, exist_ok=True)

    bad = 0
    for src in a.inputs:
        slug = os.path.splitext(os.path.basename(src))[0]
        img, alpha = cut(src, tol=a.tol)
        if img is None:
            print(f"{slug:44s} SKIP  no background reachable from the border")
            bad += 1
            continue
        img.save(os.path.join(a.outdir, f"{slug}.png"))
        tr = (alpha == 0).mean() * 100
        ys, xs = np.nonzero(alpha > 8)
        note = ""
        if tr < 20:
            note = "  <- check: little was removed"
        elif tr > 97:
            note = "  <- check: almost everything was removed"
        print(f"{slug:44s} {tr:5.1f}% transparent  "
              f"bbox {xs.max()-xs.min()}x{ys.max()-ys.min()}{note}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
