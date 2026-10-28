# HKS website

Phase 1 website for Hindustan Kalari Sangham, Kozhikode: nine static pages, no framework, no dependencies.

## Run it
```
node build.mjs     # assemble src/ into the nine *.html pages in the root
node serve.mjs     # http://localhost:3000
```
The root `*.html` files are generated, so edit `src/`, then rebuild.

## Where things live
- `src/pages/*.html`: page content, one file per page (front matter at the top holds the title and description)
- `src/partials/header.html`, `footer.html`, `src/layout.html`: shared frame for every page
- `build.mjs`: inserts the partials, marks the current nav link, expands `{{img}}`, `{{gallery}}`, `{{icon:…}}` and the contact tokens. The WhatsApp link and phone number are defined once at its top.
- `assets/css/site.css`, `assets/js/site.js`: styles and the small amount of JavaScript (header, mobile menu, video pause, gallery lightbox)
- `assets/img/`: web images made by `python tools/optimize-images.py` from the cleared folders in `images/`
- `assets/video/`: hero loops cut from HKS's own Instagram reels (`images/video/`)
- `brand_assets/`: emblem files, colour tokens, brand guide (`README.md`) and `brand-sheet.html`
- `images/`: source photos, sorted by clearance. Read `images/README.md` before adding any photo to the site.
- `content/hks-content-pack.md`: all site copy comes from section B of this pack

## Other tools
- `screenshot.mjs`: `node screenshot.mjs http://localhost:3000 [label] [--width 390 --height 844] [--scroll N] [--full] [--click ".menu-toggle"]`. On Windows with Node 20, set `CHROME_PATH` to Chrome and run with `node --experimental-websocket`.
- `CLAUDE.md` and `.claude/skills/`: the rules and skills Claude follows when working on the site
