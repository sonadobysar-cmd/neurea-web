#!/usr/bin/env python3
"""Precise hero cutout — full-res + OpenCV grabCut + black-studio refinement."""

from __future__ import annotations

import shutil
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

SRC = Path("/Users/soni/Downloads/foto robin/IMG_0722.jpg")
OUT_PATHS = [
    Path("/Users/soni/Neurea/kouzlimesrobinem/public/robin/robin-hero.png"),
    Path("/Users/soni/Neurea/public/robin/robin-hero.png"),
]
BACKUP_SRC = Path("/Users/soni/Neurea/kouzlimesrobinem/public/robin/IMG_0722-full.jpg")
OUTPUT_HEIGHT = 2800


def load_rgb(path: Path) -> tuple[np.ndarray, Image.Image]:
    pil = Image.open(path).convert("RGB")
    if pil.height != OUTPUT_HEIGHT:
        w = int(pil.width * OUTPUT_HEIGHT / pil.height)
        pil = pil.resize((w, OUTPUT_HEIGHT), Image.LANCZOS)
    rgb = np.array(pil)
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    return bgr, pil


def retouch(pil: Image.Image) -> Image.Image:
    pil = ImageEnhance.Contrast(pil).enhance(1.07)
    pil = ImageEnhance.Color(pil).enhance(1.05)
    pil = ImageEnhance.Brightness(pil).enhance(1.02)
    return pil.filter(ImageFilter.UnsharpMask(radius=1.4, percent=100, threshold=2))


def grabcut_alpha(bgr: np.ndarray) -> np.ndarray:
    h, w = bgr.shape[:2]
    max_ch = np.max(bgr, axis=2)
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)

    mask = np.full((h, w), cv2.GC_PR_BGD, dtype=np.uint8)

    # Sure background — black studio + image borders
    pad = max(24, int(min(h, w) * 0.015))
    mask[:pad, :] = cv2.GC_BGD
    mask[-pad:, :] = cv2.GC_BGD
    mask[:, :pad] = cv2.GC_BGD
    mask[:, -pad:] = cv2.GC_BGD
    mask[max_ch < 24] = cv2.GC_BGD

    # Sure foreground — face, sequins, balloon, hands
    sure_fg = (max_ch > 95) | ((max_ch > 58) & (gray > 45))
    mask[sure_fg] = cv2.GC_FGD

    # Subject bounding box
    rect = (int(w * 0.06), int(h * 0.01), int(w * 0.90), int(h * 0.98))
    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)

    cv2.grabCut(
        bgr,
        mask,
        rect,
        bgd,
        fgd,
        8,
        cv2.GC_INIT_WITH_RECT | cv2.GC_INIT_WITH_MASK,
    )

    fg = np.isin(mask, (cv2.GC_FGD, cv2.GC_PR_FGD))
    alpha = fg.astype(np.uint8) * 255

    # Keep dark clothing connected to body
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel, iterations=2)
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_OPEN, kernel, iterations=1)

    # Soft hair / sequin edges
    dist_in = cv2.distanceTransform(alpha, cv2.DIST_L2, 5)
    dist_out = cv2.distanceTransform(255 - alpha, cv2.DIST_L2, 5)
    soft = dist_in / (dist_in + dist_out + 1e-6)
    soft = np.clip(soft * 255, 0, 255).astype(np.uint8)
    core = dist_in > 2.5
    soft[core] = 255
    soft[(dist_out > 3) & (dist_in < 0.5)] = 0

    # Force black backdrop transparent
    soft[max_ch < 22] = np.minimum(soft[max_ch < 22], 6)

    # Remove 1px dark fringe — shrink then restore soft edge
    er = cv2.erode(soft, kernel, iterations=1)
    fringe = (soft > 0) & (er < soft - 8)
    soft[fringe] = np.minimum(soft[fringe], er[fringe] + 12)

    return soft


def defringe(rgba: np.ndarray) -> np.ndarray:
    r, g, b, a = [rgba[:, :, i].astype(np.float32) for i in range(4)]
    edge = (a > 14) & (a < 252)
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    halo = edge & (lum > 170)
    a[halo] *= np.clip(1.0 - (lum[halo] - 170) / 85.0, 0, 1)
    an = np.clip(a / 255.0, 1e-3, 1.0)
    grey = edge & (lum < 60)
    for i in range(3):
        ch = rgba[:, :, i].astype(np.float32)
        ch[grey] = np.clip(ch[grey] / an[grey], 0, 255)
        rgba[:, :, i] = ch.astype(np.uint8)
    rgba[:, :, 3] = np.clip(a, 0, 255).astype(np.uint8)
    return rgba


def tight_crop(rgba: np.ndarray, pad: int = 14) -> np.ndarray:
    ys, xs = np.where(rgba[:, :, 3] > 10)
    if len(xs) == 0:
        return rgba
    x0, x1 = max(0, xs.min() - pad), min(rgba.shape[1], xs.max() + pad)
    y0, y1 = max(0, ys.min() - pad), min(rgba.shape[0], ys.max() + pad)
    return rgba[y0:y1, x0:x1]


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}")

    shutil.copy2(SRC, BACKUP_SRC)
    bgr, pil = load_rgb(SRC)
    pil = retouch(pil)
    rgb = np.array(pil)
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)

    print(f"Processing {rgb.shape[1]}×{rgb.shape[0]} px …")
    alpha = grabcut_alpha(bgr)
    rgba = np.dstack([rgb, alpha])
    rgba = defringe(rgba)
    rgba = tight_crop(rgba)

    h, w = rgba.shape[:2]
    print(f"Output {w}×{h} px")

    out_img = Image.fromarray(rgba)
    for path in OUT_PATHS:
        path.parent.mkdir(parents=True, exist_ok=True)
        out_img.save(path, format="PNG", optimize=False, compress_level=3)
        print(f"Saved {path} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
