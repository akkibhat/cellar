#!/usr/bin/env python3
"""
Make the web copies of the bottle shots.

    python scripts/optimise-bottles.py

Reads the hand-cut masters in `_bottles/` and writes one WebP per wine into
`public/bottles/`, which is what the cards load. Run it after cutting a new
bottle out, and commit both the master and the copy.

WHY TWO COPIES

The masters are the work - twenty-one bottles cut out by hand in Photoshop -
and they are kept at full size because a crop or a resize can be redone from
them and cannot be undone. But they are 5.8 MB together, and every byte of
`public/` is deployed and publicly served, so they sit outside it: `_bottles/`
is source, `public/bottles/` is output, the same way `_previews/` is not part
of the build.

WHY WEBP AT 640px

A card's picture is 175px wide at the widest the page ever gets, and the
bottle inside it is about 200px tall. 640px covers that at three times the
device pixel ratio, which is more than any phone asks for, and past that the
file is paying for detail no screen resolves. Nothing is upscaled: four of
the masters are shorter than 640 already, and stretching them would invent
sharpness the photograph never had.

WebP because these are photographs with an alpha channel, which leaves PNG
and WebP, and PNG cannot do lossy: the same bottle is 98 KB as an optimised
PNG and 13 KB as WebP at quality 84, with nothing to tell them apart at 2x
magnification. Every browser has read WebP since 2020.

Not next/image: it would do this at request time, once per deployment, and
tie a set of twenty-one files that change about never to a runtime image
service. These are content, so they are built once and committed like it.
"""
import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(HERE, '_bottles')
OUT = os.path.join(HERE, 'public', 'bottles')

MAX_H = 640
QUALITY = 84


def optimise(name: str) -> tuple[int, int, str]:
    im = Image.open(os.path.join(SRC, name)).convert('RGBA')

    # Crop to the glass. The masters are already tight, so this is usually a
    # no-op - it is here so a master that is not cannot quietly ship a card
    # with the bottle sitting small in a field of nothing, which is what the
    # scripted cutouts did.
    bbox = im.getchannel('A').getbbox()
    if bbox:
        im = im.crop(bbox)

    note = ''
    if im.height > MAX_H:
        im = im.resize((max(1, round(im.width * MAX_H / im.height)), MAX_H), Image.LANCZOS)
    else:
        note = f'master is only {im.height}px tall'

    dest = os.path.join(OUT, os.path.splitext(name)[0] + '.webp')
    im.save(dest, 'WEBP', quality=QUALITY, method=6)
    return os.path.getsize(os.path.join(SRC, name)), os.path.getsize(dest), note


def main() -> int:
    if not os.path.isdir(SRC):
        print(f'no masters at {SRC}', file=sys.stderr)
        return 1
    os.makedirs(OUT, exist_ok=True)

    names = sorted(n for n in os.listdir(SRC) if n.lower().endswith('.png'))
    if not names:
        print(f'no PNG masters in {SRC}', file=sys.stderr)
        return 1

    before = after = 0
    for name in names:
        src_bytes, out_bytes, note = optimise(name)
        before += src_bytes
        after += out_bytes
        print(f'{name[:-4]:<44} {src_bytes:>9,} -> {out_bytes:>7,}   {note}')

    print(f'\n{len(names)} bottles, {before / 1e6:.1f} MB -> {after / 1e3:.0f} KB '
          f'({after / before:.1%} of the masters)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
