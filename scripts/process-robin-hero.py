#!/usr/bin/env python3
"""Premium hero cutout — isnet + black-bg spill removal + crisp alpha."""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance
from rembg import new_session, remove

SRC = Path("/Users/soni/Neurea/kouzlimesrobinem/public/robin/IMG_0722.jpg")
OUT = Path("/Users/soni/Neurea/kouzlimesrobinem/public/robin/robin-hero.png")
OUT_MONO = Path("/Users/soni/Neurea/public/robin/robin-hero.png")
PAD = 10
BG = np.array([0.0, 0.0, 0.0], dtype=np.float32)


def ai_cutout(img: Image.Image) -> Image.Image:
    session = new_session("isnet-general-use")
    return remove(
        img,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=8,
        alpha_matting_erode_size=12,
        post_process_mask=True,
    )


def decontaminate_black_bg(rgba: np.ndarray) -> np.ndarray:
    rgb = rgba[:, :, :3].astype(np.float32)
    a = rgba[:, :, 3].astype(np.float32) / 255.0
    a3 = np.clip(a, 1e-3, 1.0)[..., None]

    fg = np.clip((rgb - (1.0 - a3) * BG * 255.0) / a3, 0, 255)
    lum = 0.2126 * fg[:, :, 0] + 0.7152 * fg[:, :, 1] + 0.0722 * fg[:, :, 2]
    sat = fg.max(axis=2) - fg.min(axis=2)

    bleed = (a > 0.02) & (a < 0.88) & (lum < 32)
    a[bleed] *= 0.25

    backdrop = (a < 0.95) & (lum < 20) & (sat < 28)
    a[backdrop] = 0.0

    out = np.zeros_like(rgba, dtype=np.float32)
    out[:, :, :3] = fg
    out[:, :, 3] = np.clip(a * 255.0, 0, 255)
    return out.astype(np.uint8)


def refine_alpha(rgba: np.ndarray) -> np.ndarray:
    from scipy.ndimage import gaussian_filter, grey_erosion

    a = rgba[:, :, 3].astype(np.float32)
    core = grey_erosion(a, size=(3, 3))
    edge = (a > 8) & (core < 220)
    a_smooth = gaussian_filter(a, sigma=0.5)
    a[edge] = a_smooth[edge]
    a[a < 5] = 0
    a[a > 249] = 255
    rgba = rgba.copy()
    rgba[:, :, 3] = np.clip(a, 0, 255).astype(np.uint8)
    return rgba


def retouch(rgba: Image.Image) -> Image.Image:
    rgb = rgba.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.05)
    rgb = ImageEnhance.Color(rgb).enhance(1.06)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.15)
    out = rgb.convert("RGBA")
    out.putalpha(rgba.split()[3])
    return out


def tight_crop(rgba: Image.Image, pad: int = PAD) -> Image.Image:
    bbox = rgba.getbbox()
    if not bbox:
        return rgba
    x0, y0, x1, y1 = bbox
    w, h = rgba.size
    return rgba.crop((max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad)))


def fringe_score(rgba: np.ndarray) -> float:
    a = rgba[:, :, 3]
    semi = (a > 5) & (a < 250)
    if not semi.any():
        return 0.0
    rgb = rgba[:, :, :3]
    return (rgb[semi].max(axis=1) < 45).sum() / semi.sum()


def main() -> None:
    if not SRC.exists():
        sys.exit(f"Missing {SRC}")

    src = Image.open(SRC).convert("RGB")
    print(f"Source {src.size}")

    print("isnet-general-use + alpha matting...")
    cut = ai_cutout(src)
    arr = np.array(cut)

    print("Spill decontamination...")
    arr = decontaminate_black_bg(arr)

    print("Alpha edge refine...")
    arr = refine_alpha(arr)

    img = Image.fromarray(arr)
    img = retouch(img)
    img = tight_crop(img)

    print(f"Dark fringe ratio: {fringe_score(np.array(img)):.1%}")

    img.save(OUT, "PNG", compress_level=3)
    img.save(OUT_MONO, "PNG", compress_level=3)
    print(f"Saved {OUT} {img.size}")


if __name__ == "__main__":
    main()
