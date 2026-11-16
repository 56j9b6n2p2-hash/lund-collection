from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "media" / "hoodie"
FRONT_MODEL = ROOT / ".preview" / "mockups" / "hoodie-front.png"
BACK_MODEL = ROOT / ".preview" / "mockups" / "hoodie-back.png"
MOTIF_SOURCE = ROOT / "dist" / "media" / "hoodie" / "lund-hoodie-domkyrkan-kram-fram.jpg"

W, H = 1200, 1500
BG_TOP = (222, 219, 214)
BG_BOTTOM = (201, 198, 192)

COLORS = [
    ("dark-teal", "dark-teal", "#1f4948"),
    ("navy", "navy", "#1e2c46"),
    ("stone", "kram", "#d8c8b2"),
    ("burgundy", "bordeaux", "#5e2430"),
    ("grey-melange", "ljusgra", "#b7b5b2"),
    ("dark-grey", "dark-grey", "#3a3d42"),
]


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def background() -> Image.Image:
    """Quiet warm-grey studio backdrop with a soft central light."""
    y = np.linspace(0, 1, H)[:, None, None]
    top = np.array(BG_TOP, dtype=float)[None, None, :]
    bottom = np.array(BG_BOTTOM, dtype=float)[None, None, :]
    rgb = top * (1 - y) + bottom * y

    yy, xx = np.mgrid[0:H, 0:W]
    # Gentle pool of light behind the product, not a visible gradient band.
    spot = np.clip(1 - (((xx - W * 0.5) / (W * 0.68)) ** 2 + ((yy - H * 0.34) / (H * 0.6)) ** 2), 0, 1)
    rgb = rgb + spot[:, :, None] * 10
    # Fine grain keeps large flat areas from looking synthetic.
    rng = np.random.default_rng(4)
    grain = rng.normal(0, 1.15, (H, W, 1))
    rgb = np.clip(rgb + grain, 0, 255)
    return Image.fromarray(rgb.astype(np.uint8), "RGB")


def recolour(model: Image.Image, target: tuple[int, int, int]) -> Image.Image:
    """Tint the white product photo while retaining all fibre shading."""
    rgba = np.asarray(model.convert("RGBA")).astype(float)
    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3:4] / 255.0
    lum = rgb.mean(axis=2, keepdims=True) / 255.0

    # Keep the model's highlights and folds; map white fabric to the chosen dye.
    shade = 0.36 + 0.78 * lum
    tinted = np.clip(np.array(target, dtype=float)[None, None, :] * shade, 0, 255)

    # A little of the original neutral value keeps the cords and metal ends readable.
    neutral = np.repeat(rgb.mean(axis=2, keepdims=True), 3, axis=2)
    tinted = tinted * 0.93 + neutral * 0.07

    out = np.dstack([tinted, alpha * 255]).clip(0, 255).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def scaled(model: Image.Image, height: int) -> Image.Image:
    width = round(model.width * height / model.height)
    return model.resize((width, height), Image.Resampling.LANCZOS)


def drop_shadow(sprite: Image.Image) -> Image.Image:
    alpha = sprite.getchannel("A")
    shadow = Image.new("RGBA", sprite.size, (38, 34, 29, 0))
    shadow.putalpha(alpha.point(lambda v: int(v * 0.50)))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    return shadow


def motif() -> Image.Image:
    """Crop the existing framed chest print, preserving its exact artwork."""
    src = Image.open(MOTIF_SOURCE).convert("RGB")
    # The print's dark panel occupies this region of the original front photo.
    box = (496, 407, 704, 551)
    crop = src.crop(box).convert("RGBA")

    # Feather only the outer crop edge so the print melts into the fabric.
    mask = Image.new("L", crop.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rectangle((2, 2, crop.width - 3, crop.height - 3), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(1.6))
    crop.putalpha(mask)
    return crop


def compose(color_id: str, file_slug: str, hex_value: str, art: Image.Image) -> None:
    target = hex_rgb(hex_value)
    bg = background()

    front = scaled(recolour(Image.open(FRONT_MODEL), target), 1380)
    back = scaled(recolour(Image.open(BACK_MODEL), target), 1380)

    # Front: motif sits on the chest, below the model's own cords.
    fg_x = (W - front.width) // 2
    fg_y = H - front.height - 38

    print_w = 286
    print_h = round(art.height * print_w / art.width)
    print_img = art.resize((print_w, print_h), Image.Resampling.LANCZOS)
    print_x = (W - print_w) // 2
    print_y = fg_y + round(front.height * 0.405)

    shadow = drop_shadow(front)
    bg.paste(shadow, (fg_x + 8, fg_y + 30), shadow)
    bg.paste(front, (fg_x, fg_y), front)
    bg.paste(print_img, (print_x, print_y), print_img)

    # Subtle print/fabric contact shadow, clipped to the print edge.
    contact = Image.new("RGBA", (print_w + 16, print_h + 16), (30, 25, 20, 0))
    contact.putalpha(print_img.getchannel("A").resize(contact.size).filter(ImageFilter.GaussianBlur(5)).point(lambda v: int(v * 0.25)))
    bg.paste(contact, (print_x - 8, print_y - 5), contact)
    bg.paste(print_img, (print_x, print_y), print_img)

    bg.convert("RGB").save(OUT / f"lund-hoodie-domkyrkan-{file_slug}-fram.jpg", quality=90, optimize=True, progressive=True)

    # Back: same model, no front print.
    bg_back = background()
    bg_x = (W - back.width) // 2
    bg_y = H - back.height - 38
    shadow_back = drop_shadow(back)
    bg_back.paste(shadow_back, (bg_x + 8, bg_y + 30), shadow_back)
    bg_back.paste(back, (bg_x, bg_y), back)
    bg_back.convert("RGB").save(OUT / f"lund-hoodie-domkyrkan-{file_slug}-bak.jpg", quality=90, optimize=True, progressive=True)

    print(color_id, front.size, back.size, "motif", (print_x, print_y, print_w, print_h))


def main() -> None:
    art = motif()
    for color_id, file_slug, hex_value in COLORS:
        compose(color_id, file_slug, hex_value, art)


if __name__ == "__main__":
    main()
