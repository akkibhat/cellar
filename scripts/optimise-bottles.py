#!/usr/bin/env python3
"""
Make the web copies of the bottle shots.

    python scripts/optimise-bottles.py

Reads the hand-cut PNG masters in `_bottles/` and writes one WebP per wine
into `public/bottles/`, which is what the cards load. Run it after cutting a
new bottle out, then commit the WebP. `_bottles/` is git-ignored: the
full-size masters are kept locally, outside `public/`, so they are never
deployed.

Why 640px tall: a card's bottle is about 200px tall at most, so 640 covers
three times the pixel density. Nothing is upscaled; a short master stays
short and is flagged in the output.

Why WebP: these are photos with transparency, and WebP can be lossy where
PNG cannot (roughly 13 KB against 98 KB for the same bottle at quality 84).
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
    """Crop, resize and save one master as WebP; return (master bytes, WebP bytes, note)."""
    im = Image.open(os.path.join(SRC, name)).convert('RGBA')

    # Crop to the visible bottle. Usually a no-op since the masters are
    # already tight, but it stops a loose master shipping a card with the
    # bottle sitting small in a field of empty space.
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
    """Convert every PNG master and print a size summary; non-zero exit if none found."""
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
