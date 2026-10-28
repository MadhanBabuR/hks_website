# Images: inventory and usage rules

Pulled on 26 Oct 2026 from the shortlist in `content/hks-content-pack.md` (section D), at the largest size Instagram serves. Filenames follow the pack's suggestions. Carousel posts keep every slide as `-01`, `-02`, and so on. Reels give only their cover frame, so those files are low resolution.

Every photo was checked by eye. Captions below describe only what each image shows.

## Folders

| Folder | Use on the site? |
|---|---|
| `hero/`, `performances/`, `masters/`, `training/`, `healing/`, `events/`, `about/` | **Yes.** Posted by HKS itself, no children seen, no text overlays. |
| `_needs-permission/` | **Not yet.** The best photos we have, but they are a photographer-credited series or belong to another account. Get written permission and the credit line before using any of them. |
| `_children-consent/` | **No**, unless parental consent is confirmed (pack rule 6). |
| `_not-for-web/` | **No.** Text flyers (Shakthi series, Otta exhibition, Navratri Golu). Kept only as colour and style reference. The Shakthi flyers also carry other people's portraits. |

Skipped completely (not downloaded): pack items #8, #33, #39 (text or watermark) and #17, #20, #21, #22, #40 (children).

## Usable now

| File | Size | What it shows | Notes |
|---|---|---|---|
| `masters/master-sami-gurukkal.jpg` | 1440×1800 | Sami Gurukkal seated at prayer before a shrine | Archival, strong. Founder card. |
| `about/about-rashtrotthan-award.jpg` | 1440×1025 | Black-and-white press photo of an award being presented | Newspaper scan. About page, small. |
| `healing/heal-centre-01` to `-10` | 768² | Treatment centre: shrine niche in a round window, a homam, a garlanded portrait, lamp lighting, interiors, entrance | Best healing set. `-03` is a garlanded portrait (likely the founder; confirm). |
| `healing/heal-centre-2-01` to `-06` | 536² and smaller | Bandaged limbs and fracture splints | Patients aren't identifiable, but confirm consent before use. Small files. |
| `masters/master-shatrughnan.jpg` | 1080×1920 | A practitioner mid-movement in the Kalari pit, from a distance | Reel cover. Can't confirm it's him, and it isn't a portrait. |
| `masters/master-lakshmanan.jpg` | 720×1280 | Group of guests standing in the Kalari | Reel cover, with black bars. Not a portrait. |
| `performances/perf-gaja-01` to `-04` | 1440×960 | Gaja Kalari theatre, staged in the Kalari | Guest production (Anand Krishnan), so use it only under "Hosted". It may also carry a photographer credit. |
| `performances/perf-brics-2026.jpg` | 720×1280 | Audience members at the BRICS venue | Weak: shows spectators, not the team. |
| `performances/perf-veera-vaibhavam.jpg` | 720×405 | Aerial move in the Kalari | Too small for a hero. |
| `training/train-nere-kaal.jpg` | 640×1136 | High straight kick in the Kalari pit | Reel cover. |
| `training/train-kettukari.jpg` | 640×1136 | Staff sparring in the pit | Reel cover. |
| `training/class-chile.jpg` | 640×1136 | Students in low stances in the pit | Reel cover. |
| `training/class-international.jpg` | 720×405 | Group of students holding certificates | Small. |
| `events/event-guru-pooja.jpg` | 720×1280 | Students with folded hands in the Kalari | Reel cover, low light. |
| `hero/hero-urumi-radhika.jpg` | 720×1280 | A woman performing in the Kalari pit, seen from above, small in frame | Reel cover. **Not good enough for a hero.** |

## Needs permission (best quality)

- `perf-gurusmriti-2025-*` (14 files, 1440px): Gurusmriti 2025 joint showcase in the Kalari pit, warm laterite light. Pack credit: jibycharles. **These are the best hero candidates on the account.** `-10` (flying kick) and `-13`/`-14` (sword and shield) are the strongest.
- `perf-veera-vaibhavam-2-*` (8 files, 1440px): Veera Vaibhavam in the Kalari pit, wide shots. Photographer credit needed.
- `gallery-fencing-*`, `gallery-gada-*`, `gallery-spear-shield-*`, `gallery-sword-shield-*`, `gallery-dagger.jpg`, `master-radhika-*` (1080px): Oct 2023 weapons series shot on rocks by the sea. Photographer credit needed.
- `about-team.jpg`: team group photo, owned by another account.
- `gallery-sakthi-motion.jpg`: women practitioners in the Kalari, owned by another account.

## On the live site, pending permission

Madhan is getting the photographers' permission, so the site already uses these. If a series is refused, swap these files out (search `src/pages/` for the name) and rebuild.

| Series | Files used | Pages |
|---|---|---|
| Gurusmriti 2025 (credit: jibycharles) | `perf-gurusmriti-2025-02, -06, -08, -10, -12, -13, -14, -15` | home, about, events, performances, gallery |
| Veera Vaibhavam (photographer credit needed) | `perf-veera-vaibhavam-2-02, -03, -04, -06, -07, -08, -09` | home, classes, performances, contact, gallery |
| Oct 2023 weapons series by the sea (photographer credit needed) | `gallery-dagger, gallery-fencing-02, gallery-gada-02, gallery-spear-shield-02, gallery-sword-shield-02, master-radhika-portrait` (cropped from `master-radhika-01`) | masters, gallery |

Everything else on the site is HKS's own: its posts, the hero and Performances video loops (`assets/video/`, cut from HKS reels `international.mp4` and `vv-promo.mp4`), and stills from those reels (`video/stills/`).

Moved to `_children-consent/` during the build: `perf-gurusmriti-2025-01, -05, -07, -09, -11, -17`, `perf-veera-vaibhavam-2-01` and `event-guru-pooja` (children visible, some only in the background).

## Still missing (ask HKS)

1. **A hero image.** Ideally a landscape shot of 2400px or wider from the Kalari pit, or permission for the Gurusmriti 2025 set.
2. **Portraits** of Lakshmanan Gurukkal, Shatrughnan Gurukkal, Radhika Gurukkal and Amrutha Revathi. None of the current files is a usable portrait.
3. **Training photos without children**, landscape and full resolution.
4. **The logo source file** (vector or large PNG). `brand_assets/logo/` is traced from the 882px Instagram profile picture.
5. Original camera files for the treatment centre (the Instagram copies are only 768px).
