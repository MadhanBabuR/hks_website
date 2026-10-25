// Builds the site's pages from src/. Zero dependencies.
//   node build.mjs
// Each src/pages/<name>.html starts with a front-matter block:
//   ---
//   title: Page title
//   description: One sentence for search results
//   nav: classes          (the nav item marked as the current page; omit on Home)
//   ---
// The rest of the file is the page's <main> content. src/layout.html wraps it
// with the shared <head>, header, footer and WhatsApp dock, and the result is
// written to <name>.html in the project root.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();
const layout = await readFile(join(ROOT, "src/layout.html"), "utf8");
const pages = (await readdir(join(ROOT, "src/pages"))).filter((f) => f.endsWith(".html"));

for (const file of pages) {
  const raw = await readFile(join(ROOT, "src/pages", file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${file}: missing front matter`);
  const meta = Object.fromEntries(
    match[1].split("\n").map((line) => {
      const i = line.indexOf(":");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    })
  );
  const content = raw.slice(match[0].length);

  let html = layout
    .replaceAll("{{title}}", meta.title)
    .replaceAll("{{description}}", meta.description)
    .replace("{{content}}", content.trim());

  // Mark the current page in the header and footer navigation.
  if (meta.nav) {
    html = html.replaceAll(`data-nav="${meta.nav}"`, `data-nav="${meta.nav}" aria-current="page"`);
  }

  await writeFile(join(ROOT, file), html);
  console.log(`built ${file}`);
}
