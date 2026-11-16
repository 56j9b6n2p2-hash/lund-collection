from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "media" / "hoodie"
FRONT_MODEL = ROOT / ".preview" / "refs" / "hoodie-front.png"
BACK_MODEL = ROOT / ".preview" / "refs" / "hoodie-back.png"
MOTIF_SOURCE = ROOT / "dist" / "media" / "hoodie" / "lund-hoodie-domkyrkan-kram-fram.jpg"

W, H = 1200, 1500
BG_TOP = (217, 214, 209)
BG_BOTTOM = (196, 193, 187)

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


def make_background() -> Image.Image:
    y = np.linspace(0, 1, H)[:, None, None]
    top = np.array(BG_TOP, dtype=float)[None, None, :]
    bottom = np.array(BG_BOTTOM, dtype=float)[None, None, :]
    rgb = top * (1 - y) + bottom * y

    yy, xx = np.mgrid[0:H, 0:W]
    light = np.clip(
        1
        - (
            ((xx - W * 0.48) / (W * 0.7)) ** 2
            + ((yy - H * 0.30) / (H * 0.62)) ** 2
        ),
        0,
        1,
    )
    rgb = rgb + light[:, :, None] * 8
    rng = np.random.default_rng(8)
    grain = rng.normal(0, 1.0, (H, W, 1))
    rgb = np.clip(rgb + grain, 0, 255)

    base = Image.fromarray(rgb.astype(np.uint8), "RGB")
    # Very soft, out-of-focus studio light pools. Keeps the backdrop premium
    # and quiet while the product stays perfectly sharp.
    bokeh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(bokeh)
    draw.ellipse((-180, 180, 430, 790), fill=(255, 249, 238, 22))
    draw.ellipse((820, 70, 1360, 610), fill=(245, 241, 235, 18))
    draw.ellipse((650, 1000, 1350, 1660), fill=(255, 252, 245, 12))
    bokeh = bokeh.filter(ImageFilter.GaussianBlur(85))
    base = Image.alpha_composite(base.convert("RGBA"), bokeh).convert("RGB")
    return base


def recolour(model: Image.Image, target: tuple[int, int, int]) -> Image.Image:
    rgba = np.asarray(model.convert("RGBA")).astype(float)
    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3:4] / 255.0
    lum = rgb.mean(axis=2, keepdims=True) / 255.0

    shade = 0.37 + 0.76 * lum
    tinted = np.clip(np.array(target, dtype=float)[None, None, :] * shade, 0, 255)
    neutral = np.repeat(rgb.mean(axis=2, keepdims=True), 3, axis=2)
    tinted = tinted * 0.94 + neutral * 0.06

    return Image.fromarray(
        np.dstack([tinted, alpha * 255]).clip(0, 255).astype(np.uint8), "RGBA"
    )


def fit_height(model: Image.Image, height: int) -> Image.Image:
    width = round(model.width * height / model.height)
    return model.resize((width, height), Image.Resampling.LANCZOS).filter(
        ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=3)
    )


def shadow(sprite: Image.Image) -> Image.Image:
    alpha = sprite.getchannel("A")
    out = Image.new("RGBA", sprite.size, (35, 31, 26, 0))
    out.putalpha(alpha.point(lambda value: int(value * 0.42)))
    return out.filter(ImageFilter.GaussianBlur(24))


def motif() -> Image.Image:
    src = Image.open(MOTIF_SOURCE).convert("RGB")
    # This is the existing framed print, kept at its original pixel size.
    crop = src.crop((496, 407, 704, 551)).convert("RGBA")
    mask = Image.new("L", crop.size, 0)
    ImageDraw.Draw(mask).rectangle(
        (1, 1, crop.width - 2, crop.height - 2), fill=255
    )
    crop.putalpha(mask.filter(ImageFilter.GaussianBlur(0.7)))
    return crop


def compose(file_slug: str, hex_value: str, art: Image.Image) -> None:
    target = hex_rgb(hex_value)
    front = fit_height(recolour(Image.open(FRONT_MODEL), target), 1320)
    back = fit_height(recolour(Image.open(BACK_MODEL), target), 1320)

    fg_x = (W - front.width) // 2
    fg_y = H - front.height - 64

    bg = make_background()
    fg_shadow = shadow(front)
    bg.paste(fg_shadow, (fg_x + 10, fg_y + 34), fg_shadow)
    bg.paste(front, (fg_x, fg_y), front)

    # Keep the original 208 px artwork size and centre it on the chest.
    print_img = art
    print_x = (W - print_img.width) // 2
    print_y = 526
    bg.paste(print_img, (print_x, print_y), print_img)
    bg.convert("RGB").save(
        OUT / f"lund-hoodie-domkyrkan-{file_slug}-fram.jpg",
        quality=92,
        optimize=True,
        progressive=True,
    )

    bg_back = make_background()
    back_shadow = shadow(back)
    bg_back.paste(
        back_shadow,
        ((W - back.width) // 2 + 10, H - back.height - 64 + 34),
        back_shadow,
    )
    bg_back.paste(back, ((W - back.width) // 2, H - back.height - 64), back)
    bg_back.convert("RGB").save(
        OUT / f"lund-hoodie-domkyrkan-{file_slug}-bak.jpg",
        quality=92,
        optimize=True,
        progressive=True,
    )

    print(file_slug, front.size, "motif", print_img.size, "at", (print_x, print_y))


def main() -> None:
    art = motif()
    for _color_id, file_slug, hex_value in COLORS:
        compose(file_slug, hex_value, art)


if __name__ == "__main__":
    main()
