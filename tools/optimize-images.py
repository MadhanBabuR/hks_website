"""Turn the cleared source photos in images/ into web-ready WebP files.

    python tools/optimize-images.py

Writes assets/img/<name>-sm.webp (800px wide) and <name>-lg.webp (up to
1600px, never upscaled; only when the source is wider than 800px). Folders that must never reach the site
(_children-consent, _not-for-web) are skipped on purpose.
"""
import glob
import json
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "img")
SOURCES = ["hero", "masters", "training", "healing", "performances", "events", "about", "_needs-permission", "video/stills"]
SIZES = (("sm", 800), ("lg", 1600))

os.makedirs(OUT, exist_ok=True)
count = 0
for folder in SOURCES:
    for path in sorted(glob.glob(os.path.join(ROOT, "images", folder, "*.*"))):
        if not path.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        name = os.path.splitext(os.path.basename(path))[0]
        im = Image.open(path).convert("RGB")
        for label, w in SIZES:
            if label == "lg" and im.width <= SIZES[0][1]:
                continue
            target = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.Resampling.LANCZOS)
            target.save(os.path.join(OUT, f"{name}-{label}.webp"), "WEBP", quality=78, method=6)
        count += 1
# dimensions for build.mjs, so every <img> gets width/height and no layout shift
manifest = {}
for path in sorted(glob.glob(os.path.join(OUT, "*-sm.webp"))):
    name = os.path.basename(path)[:-8]
    with Image.open(path) as im:
        manifest[name] = {"w": im.width, "h": im.height, "lg": os.path.exists(os.path.join(OUT, f"{name}-lg.webp"))}
with open(os.path.join(OUT, "manifest.json"), "w") as f:
    json.dump(manifest, f, indent=1)
print(f"{count} images written to {OUT}")
