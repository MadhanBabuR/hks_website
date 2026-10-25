// Writes the labelled placeholder images used until real photographs arrive.
//   node tools/placeholders.mjs
// Each placeholder names the photograph it stands for. Replace a placeholder by
// saving the real photo in images/ and pointing the page's <img> at it.
import { mkdir, writeFile } from "node:fs/promises";

const SHOTS = [
  // [file, width, height, label]
  ["hero-performance", 1200, 1500, "Hero photo|Kalaripayattu performance"],
  ["kalari-pit", 900, 900, "Photo|The Kalari pit and oil lamps"],
  ["founder-archival", 1000, 1250, "Archival photo|Veerasree Sami Gurukkal"],
  ["master-sami-gurukkal", 1000, 1250, "Portrait|Veerasree Sami Gurukkal"],
  ["master-lakshmanan", 800, 1000, "Portrait|Lakshmanan Gurukkal"],
  ["master-shatrughnan", 800, 1000, "Portrait|Shatrughnan Gurukkal"],
  ["master-radhika", 800, 1000, "Portrait|Radhika Gurukkal"],
  ["master-amrutha", 800, 1000, "Portrait|Amrutha Revathi"],
  ["train-kalari", 1400, 1000, "Photo|Training in the Kalari pit"],
  ["train-online", 1400, 1000, "Photo|An online class"],
  ["train-workshop", 1400, 1000, "Photo|Vadiveesal, stick rotation"],
  ["heal-centre", 1400, 1000, "Photo|The treatment centre"],
  ["heal-marma", 1400, 1000, "Photo|Marma Chikitsa"],
  ["perf-veera-vaibhavam", 1400, 1000, "Photo|Veera Vaibhavam"],
  ["perf-brics", 1400, 1000, "Photo|BRICS Demonstration Games"],
  ["perf-gurusmriti", 1400, 1000, "Photo|Gurusmriti showcase"],
  ["event-navratri", 1400, 1000, "Photo|Navratri at the Kalari"],
  ["gallery-training-1", 900, 900, "Training|Weapon work"],
  ["gallery-training-2", 900, 900, "Training|Kicks and stances"],
  ["gallery-training-3", 900, 900, "Training|Partner forms"],
  ["gallery-performance-1", 900, 900, "Performance|Sword and shield"],
  ["gallery-performance-2", 900, 900, "Performance|Urumi"],
  ["gallery-performance-3", 900, 900, "Performance|On stage"],
  ["gallery-festivals-1", 900, 900, "Festivals|Navratri Golu"],
  ["gallery-festivals-2", 900, 900, "Festivals|Guru Pooja"],
  ["gallery-festivals-3", 900, 900, "Festivals|Gurusmriti"],
  ["gallery-healing-1", 900, 900, "Healing|The treatment centre"],
  ["gallery-healing-2", 900, 900, "Healing|The pharmacy"],
  ["contact-kalari", 800, 800, "Photo|The Kalari at Puthiyara"],
];

// The seven-tiered Poothara, the same glyph as the site's mark.
const poothara = (cx, base, unit) =>
  Array.from({ length: 7 }, (_, i) => {
    const w = (7 - i) * unit * 2;
    return `<rect x="${cx - w / 2}" y="${base - (i + 1) * unit * 1.6}" width="${w}" height="${unit * 1.6}"/>`;
  }).join("");

await mkdir("images/placeholders", { recursive: true });
for (const [file, w, h, label] of SHOTS) {
  const [kind, subject] = label.split("|");
  // Keep everything inside the central square so any crop of the image still shows the label.
  const side = Math.min(w, h);
  const unit = Math.round(side / 56);
  const subjectSize = Math.round(Math.min(unit * 2, (side * 1.5) / subject.length));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="${w}" height="${h}" fill="#3b211b"/>
<g fill="#e0a23b" opacity="0.5">${poothara(w / 2, h / 2 - unit * 1.5, unit)}</g>
<text x="${w / 2}" y="${h / 2 + unit * 3}" text-anchor="middle" fill="#efe6da" opacity="0.7" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(unit * 1.15)}">${kind}</text>
<text x="${w / 2}" y="${h / 2 + unit * 5.6}" text-anchor="middle" fill="#efe6da" font-family="Georgia, serif" font-size="${subjectSize}">${subject}</text>
</svg>
`;
  await writeFile(`images/placeholders/${file}.svg`, svg);
}
console.log(`wrote ${SHOTS.length} placeholders to images/placeholders/`);
