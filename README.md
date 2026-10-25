# HKS website

New website, set up for building with Claude Code on the web.

## What's in here
- `CLAUDE.md`: the rules Claude follows when designing and building the site (frontend website rules, adapted for Claude Code on the web)
- `.claude/skills/frontend-design`: design-quality skill, loaded before any frontend work
- `.claude/skills/scroll-craft`: skill for scroll-driven, animated marketing sites
- `.claude/skills/` also holds the superpowers process skills (brainstorming, writing-plans, systematic-debugging, …) and `skill-creator`, because `/plugin` isn't available in Claude Code on the web. Licences in `.claude/licenses/`.
- `serve.mjs`: zero-dependency local server, `node serve.mjs` → http://localhost:3000
- `screenshot.mjs`: screenshots via the container's Chromium, `node screenshot.mjs http://localhost:3000`

## Getting started
1. Add the logo, colours and style notes to `brand_assets/`, and photos to `images/`.
2. Open a Claude Code session on this repo and describe the site (or share a reference image).
