import subprocess

W = H = 1200
BASE = "public/media/hoodie/lund-hoodie-domkyrkan"

variants = {
    "dark-teal": {"cord": "#356b67", "highlight": "#a8cbc5"},
    "navy": {"cord": "#3d5578", "highlight": "#b0c0d6"},
    "kram": {"cord": "#d9c9b1", "highlight": "#fff8e9"},
    "bordeaux": {"cord": "#8b3e4a", "highlight": "#dbb0b5"},
    "ljusgra": {"cord": "#d0ceca", "highlight": "#ffffff"},
    "dark-grey": {"cord": "#64676d", "highlight": "#cdd0d4"},
}

old_left = "M 568 340 C 558 415 580 470 562 535 C 548 585 566 625 552 672"
old_right = "M 624 350 C 638 425 614 478 632 545 C 647 595 630 635 646 684"

new_left = (
    "M 566 312 C 556 372 574 418 592 462 "
    "C 572 512 552 560 548 630"
)
new_right = (
    "M 622 320 C 634 378 614 420 589 462 "
    "C 612 512 630 558 640 634"
)


def run(cmd, **kwargs):
    return subprocess.run(cmd, check=True, **kwargs)


def load(path):
    return bytearray(
        subprocess.check_output(["convert", path, "-depth", "8", "rgb:-"])
    )


def save(raw, path):
    ppm = b"P6\n%d %d\n255\n" % (W, H) + bytes(raw)
    run(
        [
            "convert",
            "ppm:-",
            "-strip",
            "-interlace",
            "Plane",
            "-sampling-factor",
            "4:2:0",
            "-quality",
            "94",
            path,
        ],
        input=ppm,
    )


def old_mask_png(variant):
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <g fill="none" stroke="#fff" stroke-width="38" stroke-linecap="round">
    <path d="{old_left}" transform="translate(4,5)"/>
    <path d="{old_right}" transform="translate(4,5)"/>
  </g>
  <g fill="#fff">
    <circle cx="552" cy="672" r="18"/>
    <circle cx="646" cy="684" r="18"/>
  </g>
</svg>"""
    svg_path = f".preview/{variant}-old-mask.svg"
    png_path = f".preview/{variant}-old-mask.png"
    open(svg_path, "w").write(svg)
    run(["convert", "-background", "none", svg_path, png_path])


def inpaint(raw, mask):
    out = bytearray(raw)
    for y in range(260, 730):
        for x in range(490, 720):
            if mask[y * W + x] < 10:
                continue
            left = right = None
            for d in range(1, 55):
                if x - d < 0:
                    break
                if mask[y * W + (x - d)] < 10:
                    left = x - d
                    break
            for d in range(1, 55):
                if x + d >= W:
                    break
                if mask[y * W + (x + d)] < 10:
                    right = x + d
                    break
            if left is not None and right is not None:
                t = (x - left) / (right - left)
                l = (y * W + left) * 3
                r = (y * W + right) * 3
                for c in range(3):
                    out[(y * W + x) * 3 + c] = round(
                        raw[l + c] * (1 - t) + raw[r + c] * t
                    )
            elif left is not None or right is not None:
                source = left if left is not None else right
                s = (y * W + source) * 3
                d = (y * W + x) * 3
                out[d : d + 3] = raw[s : s + 3]
            else:
                above = below = None
                for d in range(1, 55):
                    if y - d >= 0 and mask[(y - d) * W + x] < 10:
                        above = y - d
                        break
                for d in range(1, 55):
                    if y + d < H and mask[(y + d) * W + x] < 10:
                        below = y + d
                        break
                if above is not None and below is not None:
                    t = (y - above) / (below - above)
                    a = (above * W + x) * 3
                    b = (below * W + x) * 3
                    for c in range(3):
                        out[(y * W + x) * 3 + c] = round(
                            raw[a + c] * (1 - t) + raw[b + c] * t
                        )
    return out


def new_cords_svg(variant):
    colors = variants[variant]
    # The right cord passes in front of the left one around the upper chest,
    # then both fall separately with a soft, weighted curve.
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <defs>
    <filter id="cordShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3.4"/>
    </filter>
    <filter id="contactShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
  </defs>
  <g fill="none" stroke-linecap="round">
    <!-- Soft cast shadows on the fabric. -->
    <path d="{new_left}" stroke="#000" stroke-opacity=".24" stroke-width="15" filter="url(#contactShadow)" transform="translate(5,6)"/>
    <path d="{new_right}" stroke="#000" stroke-opacity=".28" stroke-width="16" filter="url(#contactShadow)" transform="translate(5,7)"/>

    <!-- Left cord. -->
    <path d="{new_left}" stroke="{colors['cord']}" stroke-width="7"/>
    <path d="{new_left}" stroke="{colors['highlight']}" stroke-opacity=".22" stroke-width="2.2" transform="translate(-1,-1)"/>

    <!-- Right cord sits lightly on top at the crossing. -->
    <path d="{new_right}" stroke="{colors['cord']}" stroke-width="7.3"/>
    <path d="{new_right}" stroke="{colors['highlight']}" stroke-opacity=".26" stroke-width="2.2" transform="translate(-1,-1)"/>

    <!-- Short, darker contact shadow under the right cord where it crosses. -->
    <path d="M 615 440 C 604 452 596 458 590 465" stroke="#000" stroke-opacity=".14" stroke-width="13" filter="url(#cordShadow)"/>
  </g>
  <g stroke="#5f5546" stroke-width="1.3" fill="#b0a491">
    <rect x="-5.2" y="-13" width="10.4" height="26" rx="5.2" transform="translate(548 632) rotate(6)"/>
    <rect x="-5.2" y="-13" width="10.4" height="26" rx="5.2" transform="translate(640 636) rotate(-4)"/>
  </g>
</svg>"""


for variant in variants:
    for side in ("fram", "bak"):
        if side != "fram":
            continue
        path = f"{BASE}-{variant}-{side}.jpg"
        raw = load(path)
        old_mask_png(variant)
        mask = subprocess.check_output(
            [
                "convert",
                f".preview/{variant}-old-mask.png",
                "-alpha",
                "extract",
                "-depth",
                "8",
                "gray:-",
            ]
        )
        cleaned = inpaint(raw, mask)
        temp = f".preview/{variant}-clean.jpg"
        save(cleaned, temp)

        svg_path = f".preview/{variant}-cords.svg"
        overlay_png = f".preview/{variant}-cords.png"
        open(svg_path, "w").write(new_cords_svg(variant))
        run(["convert", "-background", "none", svg_path, overlay_png])
        run(["convert", temp, overlay_png, "-compose", "over", "-composite", "-strip", "-quality", "94", path])
        print("redrew cords", path)
