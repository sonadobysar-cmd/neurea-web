#!/usr/bin/env python3
"""Hero cutout — MediaPipe segmentation + studio trimap + pymatting edges."""

from __future__ import annotations

import shutil
from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
from pymatting import estimate_alpha_cf, estimate_foreground_ml
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

SRC = Path("/Users/soni/Downloads/foto robin/IMG_0722.jpg")
MODEL = Path("/tmp/selfie_segmenter.tflite")
OUT_PATHS = [
    Path("/Users/soni/Neurea/kouzlimesrobinem/public/robin/robin-hero.png"),
    Path("/Users/soni/Neurea/public/robin/robin-hero.png"),
]
OUTPUT_HEIGHT = 2400


def resize_rgb(img: Image.Image, height: int) -> Image.Image:
    w = int(img.width * height / img.height)
    return img.resize((w, height), Image.LANCZOS)


def retouch(img: Image.Image) -> Image.Image:
    img = ImageEnhance.Contrast(img).enhance(1.05)
    img = ImageEnhance.Color(img).enhance(1.04)
    img = ImageEnhance.Brightness(img).enhance(1.02)
    return img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=85, threshold=3))


def mp_person_mask(rgb: np.ndarray, segmenter: vision.ImageSegmenter) -> np.ndarray:
    mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
    res = segmenter.segment(mp_img)
    mask = res.confidence_masks[0].numpy_view()
    if mask.ndim == 3:
        mask = mask[:, :, 0]
    return np.clip(mask, 0.0, 1.0)


def build_trimap(person: np.ndarray, rgb: np.ndarray) -> np.ndarray:
    h, w = person.shape
    max_ch = np.max(rgb, axis=2).astype(np.float32)

    trimap = np.full((h, w), 0.5, dtype=np.float32)
    trimap[person > 0.92] = 1.0
    trimap[person < 0.08] = 0.0

    pad = max(20, int(min(h, w) * 0.012))
    trimap[:pad, :] = 0.0
    trimap[-pad:, :] = 0.0
    trimap[:, :pad] = 0.0
    trimap[:, -pad:] = 0.0
    trimap[max_ch < 18] = 0.0

    unknown = (trimap > 0.05) & (trimap < 0.95)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    fg = (trimap > 0.95).astype(np.uint8) * 255
    fg = cv2.dilate(fg, kernel, iterations=2)
    bg = (trimap < 0.05).astype(np.uint8) * 255
    bg = cv2.dilate(bg, kernel, iterations=2)
    trimap[(fg > 0) & unknown] = 0.5
    trimap[(bg > 0) & (fg == 0)] = 0.0
    trimap[fg > 0] = 1.0
    return trimap


def matting(rgb: np.ndarray, trimap: np.ndarray) -> np.ndarray:
    rgb_f = rgb.astype(np.float64) / 255.0
    alpha = estimate_alpha_cf(rgb_f, trimap)
    fg = estimate_foreground_ml(rgb_f, alpha)
    rgba = np.dstack([(fg * 255).clip(0, 255), (alpha * 255).clip(0, 255)]).astype(np.uint8)
    return rgba


def cleanup(rgba: np.ndarray, rgb: np.ndarray) -> np.ndarray:
    a = rgba[:, :, 3].astype(np.float32)
    max_ch = np.max(rgb, axis=2)
    a[max_ch < 16] = np.minimum(a[max_ch < 16], 4)

    r, g, b = [rgba[:, :, i].astype(np.float32) for i in range(3)]
    edge = (a > 12) & (a < 250)
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    halo = edge & (lum > 175)
    a[halo] *= np.clip(1.0 - (lum[halo] - 175) / 90.0, 0, 1)
    rgba[:, :, 3] = np.clip(a, 0, 255).astype(np.uint8)
    return rgba


def tight_crop(rgba: np.ndarray, pad: int = 16) -> np.ndarray:
    ys, xs = np.where(rgba[:, :, 3] > 12)
    if len(xs) == 0:
        return rgba
    x0, x1 = max(0, xs.min() - pad), min(rgba.shape[1], xs.max() + pad)
    y0, y1 = max(0, ys.min() - pad), min(rgba.shape[0], ys.max() + pad)
    return rgba[y0:y1, x0:x1]


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing: {SRC}")
    if not MODEL.exists():
        raise SystemExit(f"Missing model: {MODEL}")

    pil = retouch(resize_rgb(Image.open(SRC).convert("RGB"), OUTPUT_HEIGHT))
    rgb = np.array(pil)
    print(f"Processing {rgb.shape[1]}×{rgb.shape[0]} px …")

    opts = vision.ImageSegmenterOptions(
        base_options=python.BaseOptions(model_asset_path=str(MODEL)),
        output_confidence_masks=True,
    )
    with vision.ImageSegmenter.create_from_options(opts) as segmenter:
        person = mp_person_mask(rgb, segmenter)

    trimap = build_trimap(person, rgb)
    print("Matting …")
    rgba = matting(rgb, trimap)
    rgba = cleanup(rgba, rgb)
    rgba = tight_crop(rgba)

    h, w = rgba.shape[:2]
    print(f"Output {w}×{h} px")
    out = Image.fromarray(rgba)
    for path in OUT_PATHS:
        path.parent.mkdir(parents=True, exist_ok=True)
        out.save(path, format="PNG", optimize=False, compress_level=4)
        print(f"Saved {path} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
