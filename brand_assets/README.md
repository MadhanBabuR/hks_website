# Brand assets

Open `brand-sheet.html` through the dev server (`http://localhost:3000/brand_assets/brand-sheet.html`) to see everything below in one page.

## Logo (`logo/`)

The HKS emblem: two rampant lions holding swords, flanking a tiered Kalari altar (puttara) with a lamp, over a ribbon reading "HINDUSTAN KALARI SANGAM". Note that the ribbon spells it **Sangam**, while the site copy uses **Sangham** (per the content pack).

| File | Use |
|---|---|
| `hks-emblem-original.jpg` | Source: the Instagram profile picture, 882×882 JPEG. |
| `hks-emblem-black.svg` / `hks-emblem-white.svg` | Traced vectors. Use these in the header and footer. |
| `hks-emblem-black.png` / `-white.png` | Transparent PNG, 2501×1893, cropped tight. |
| `hks-emblem-black-1200.png` / `-white-1200.png` | Same, 1200px wide. Use for social cards and OG images. |
| `favicon-32.png`, `favicon-180.png`, `favicon-512.png` | Emblem on a cream tile. 180 is the Apple touch icon. |

Use the black emblem on cream or white, and the white one on the dark-brown footer or on photographs. Don't recolour it in gold or clay, and don't set it inside a circle. The traced SVG follows a low-resolution source, so request the original vector file from HKS before launch.

## Colour and type (`tokens.css`)

Since 28 Oct 2026 the site shares its design system with GVS Ayurveda Gurukulam (gvsgurukulam.com), so the two related institutions look like one family. Source of truth: `C:\AI\Claude\Gurukkulam_Project\src\styles\variables.css`.

| Token | Hex | Role |
|---|---|---|
| Cream | `#fdf8ef` | Page background |
| Cream alt | `#f5f1e6` | Alternate sections |
| Ink | `#3a2418` | Text, footer, photo overlays |
| Terracotta | `#8a3a1e` | The one accent: buttons, links, eyebrow labels |
| Terracotta dark | `#6b2c16` | Accent hover |
| Gold | `#c9a13b` | Eyebrows on photographs and the footer only |
| Muted text | `#6b5644` | Secondary text |

- **Fraunces** (weight 600) for headings, **Inter** for body and interface, both from Google Fonts.
- Small uppercase eyebrow labels (13px, 600, 0.12em tracking) above headings.
- Spacing 8 / 16 / 24 / 40 / 64px, content width 1100px, 4px corner radius.

## Photography direction

Warm laterite light in the earthen pit, oil lamps, shrine portraits, wide shots that show the whole Kalari. Photos sit under a warm dark-brown gradient (35% at the top to 75% at the bottom), as on Gurukulam. See `../images/README.md` for which photos are cleared.
