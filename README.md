# HKS website

New website, set up for building with Claude Code on the web.

## What's in here
- `CLAUDE.md`: the rules Claude follows when designing and building the site (frontend website rules, adapted for Claude Code on the web)
- `.claude/skills/frontend-design`: design-quality skill, loaded before any frontend work
- `.claude/skills/scroll-craft`: skill for scroll-driven, animated marketing sites
- `.claude/skills/` also holds the superpowers process skills (brainstorming, writing-plans, systematic-debugging, …) and `skill-creator`, because `/plugin` isn't available in Claude Code on the web. Licences in `.claude/licenses/`.
- `.claude/skills/` design extras: `taste-skill` (art direction), `impeccable` (audit / polish), `playwright-cli` (browser automation), `img2threejs` (3D from an image). See "Design Toolkit" in CLAUDE.md for when to use each.
- `design-references/`: brand design systems from Awesome DESIGN.md, for inspiration.
- `content/hks-content-pack.md`: site content and sitemap for Hindustan Kalari Sangham. Phase 1 (general site: structure, layout, design) uses sections 0–B only; the appendix holds detail for Phase 2.
- `serve.mjs`: zero-dependency local server, `node serve.mjs` → http://localhost:3000
- `screenshot.mjs`: screenshots via the container's Chromium, `node screenshot.mjs http://localhost:3000`

## The site (Phase 1)
Nine pages for Hindustan Kalari Sangham, built from `content/hks-content-pack.md` (sections A and B).
- Edit pages in `src/pages/*.html` and the shared header, footer and `<head>` in `src/layout.html`.
- Run `node build.mjs` to regenerate the nine `.html` files in the project root. Commit both.
- Styles: `assets/site.css`. Behaviour (menu, scroll entrances, "this season" on Home and Events): `assets/site.js`.
- Brand: `brand_assets/brand-guide.md` (colours, type, the Poothara mark).
- Photos: labelled placeholders in `images/placeholders/` until real ones arrive; see `images/README.md`.

## Getting started
1. Add the logo, colours and style notes to `brand_assets/`, and photos to `images/`.
2. Open a Claude Code session on this repo and ask it to build Phase 1 from `content/hks-content-pack.md`.
