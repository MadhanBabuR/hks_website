// Assemble the site: src/pages/*.html + shared partials -> ./*.html
// Zero dependencies.  Run:  node build.mjs
//
// Page files start with a small front-matter block:
//   ---
//   title: About & Lineage
//   description: One sentence for search results.
//   ---
// and may use these tokens anywhere (pages and partials):
//   {{icon:whatsapp}}                          inline SVG from ICONS below
//   {{img name="..." alt="..." sizes="..." class="..." eager}}
//                                              responsive <img> from assets/img
//   {{gallery name="..." alt="..." caption="..."}}
//                                              gallery thumbnail that opens the lightbox
//   {{current:about.html}}                     aria-current on the active nav link
//   {{wa}} {{tel}} {{phone}}                   contact details, defined once here
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, "src");

const CONTACT = {
  wa: "https://wa.me/919400023904",
  tel: "tel:+919400023904",
  phone: "+91 94000 23904",
};

const ICONS = {
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  pause: '<svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
  play: '<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
};

const manifest = JSON.parse(await readFile(join(ROOT, "assets/img/manifest.json"), "utf8"));

function attrs(str) {
  const out = {};
  for (const m of str.matchAll(/(\w+)(?:="([^"]*)")?/g)) out[m[1]] = m[2] ?? true;
  return out;
}

function img(a, page) {
  const info = manifest[a.name];
  if (!info) throw new Error(`${page}: no image named "${a.name}" in assets/img`);
  const base = `assets/img/${a.name}`;
  const srcset = info.lg ? ` srcset="${base}-sm.webp 800w, ${base}-lg.webp 1600w"` : "";
  const sizes = info.lg ? ` sizes="${a.sizes || "100vw"}"` : "";
  const cls = a.class ? ` class="${a.class}"` : "";
  const loading = a.eager ? ' fetchpriority="high"' : ' loading="lazy"';
  return `<img src="${base}-sm.webp"${srcset}${sizes} width="${info.w}" height="${info.h}" alt="${a.alt ?? ""}"${cls}${loading} decoding="async">`;
}

function expand(html, page) {
  return html
    .replace(/\{\{icon:(\w+)\}\}/g, (_, n) => {
      if (!ICONS[n]) throw new Error(`${page}: unknown icon "${n}"`);
      return ICONS[n];
    })
    .replace(/\{\{img ([^}]*)\}\}/g, (_, a) => img(attrs(a), page))
    .replace(/\{\{gallery ([^}]*)\}\}/g, (_, raw) => {
      const a = attrs(raw);
      const full = `assets/img/${a.name}-${manifest[a.name]?.lg ? "lg" : "sm"}.webp`;
      const thumb = img({ ...a, sizes: "(max-width: 700px) 100vw, 33vw" }, page);
      return `<button type="button" data-lightbox data-full="${full}" data-caption="${a.caption ?? a.alt}" aria-label="Open photo: ${a.alt}">${thumb}</button>`;
    })
    .replace(/\{\{current:([\w.-]+)\}\}/g, (_, f) => (f === page ? ' aria-current="page"' : ""))
    .replace(/\{\{(wa|tel|phone)\}\}/g, (_, k) => CONTACT[k]);
}

const layout = await readFile(join(SRC, "layout.html"), "utf8");
const header = await readFile(join(SRC, "partials/header.html"), "utf8");
const footer = await readFile(join(SRC, "partials/footer.html"), "utf8");

const pages = (await readdir(join(SRC, "pages"))).filter((f) => f.endsWith(".html"));
for (const file of pages) {
  const raw = (await readFile(join(SRC, "pages", file), "utf8")).replace(/\r\n/g, "\n");
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) throw new Error(`${file}: missing front matter`);
  const meta = Object.fromEntries(fm[1].split("\n").map((l) => {
    const i = l.indexOf(":");
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  }));
  const body = raw.slice(fm[0].length);
  const title = file === "index.html" ? meta.title : `${meta.title} | Hindustan Kalari Sangham`;
  const html = layout
    .replaceAll("{{title}}", title)
    .replaceAll("{{description}}", meta.description)
    .replace("{{header}}", header)
    .replace("{{content}}", body)
    .replace("{{footer}}", footer);
  await writeFile(join(ROOT, file), expand(html, file).replace(/\r\n/g, "\n"));
  console.log("built", file);
}
