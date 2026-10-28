// Hindustan Kalari Sangham — scroll choreography and small enhancements.
// Every page reads fine without this file. With it:
//   [data-p="pin"]   sticky stage: --p runs 0..1 while its child is pinned
//   [data-p="view"]  --p runs 0..1 from entering to leaving the viewport
//   [data-p="exit"]  --p runs 0..1 as the element scrolls off the top
//   .reveal / .rise / [data-r]  --r runs 0..1 as the element comes into view
// CSS turns those numbers into transform, opacity and clip-path.
(function () {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector(".site-header");
  const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

  // ---- tag the things that reveal, so pages stay free of motion markup
  document.querySelectorAll(
    ".feature-media .frame-img, .story .frame-img, .portrait-frame .frame-img, .pillar .frame-img, .centre-grid figure"
  ).forEach((el) => el.classList.add("reveal"));
  document.querySelectorAll(
    ".timeline li, .calendar li, .year li, .master, .masonry button, .feature-body, .contact-list li, .section-head, .story .lede, .story .prose, .callout, .pillar-body"
  ).forEach((el) => el.classList.add("rise"));

  // split the statement into words for the word-by-word light
  document.querySelectorAll("[data-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.style.setProperty("--n", words.length);
    el.innerHTML = words.map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(" ");
    el.setAttribute("aria-label", words.join(" "));
  });

  const progressEls = Array.from(document.querySelectorAll("[data-p]"));
  const revealEls = Array.from(document.querySelectorAll(".reveal, .rise, [data-r]"));

  if (reduce.matches) {
    progressEls.forEach((el) => el.style.setProperty("--p", el.closest(".hero-stage, .page-hero") ? 0 : 1));
    revealEls.forEach((el) => el.style.setProperty("--r", 1));
  }

  // ---- horizontal pan distance
  const pans = Array.from(document.querySelectorAll(".pan-track"));
  const measurePans = () => pans.forEach((track) => {
    const dist = Math.max(0, track.scrollWidth - window.innerWidth);
    track.style.setProperty("--pan", `${dist}px`);
  });

  // ---- one loop for everything scroll-linked
  let vh = window.innerHeight;
  let ticking = false;
  const update = () => {
    ticking = false;
    if (reduce.matches) return;
    // sticky children pin below the sticky nav, so pinning starts at its height
    const navH = header.offsetHeight;

    for (const el of progressEls) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      let p;
      const mode = el.dataset.p;
      if (mode === "pin") p = clamp((navH - r.top) / Math.max(1, r.height - (vh - navH)));
      else if (mode === "exit") p = clamp(-r.top / Math.max(1, r.height));
      else p = clamp((vh - r.top) / (vh + r.height));
      el.style.setProperty("--p", p.toFixed(4));
    }
    for (const el of revealEls) {
      const r = el.getBoundingClientRect();
      if (r.top > vh * 1.2) { el.style.setProperty("--r", 0); continue; }
      if (r.bottom < -vh * 0.2) { el.style.setProperty("--r", 1); continue; }
      el.style.setProperty("--r", clamp((vh * 0.96 - r.top) / (vh * 0.36)).toFixed(4));
    }
  };
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", () => { vh = window.innerHeight; measurePans(); request(); });
  window.addEventListener("load", () => { measurePans(); request(); });
  measurePans();
  update();

  // ---- mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    const label = toggle.querySelector(".menu-toggle-label");
    const setOpen = (open) => {
      root.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Close" : "Menu";
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 1181px)").addEventListener("change", (m) => { if (m.matches) setOpen(false); });
  }

  // ---- hero carousel: crossfade with a slow zoom, arrows, dots, swipe,
  // a pause control (WCAG 2.2.2) and no auto-advance for reduced motion
  document.querySelectorAll("[data-carousel]").forEach((hero) => {
    const slides = Array.from(hero.querySelectorAll(".hero-slide"));
    const dots = Array.from(hero.querySelectorAll(".hero-dot"));
    const toggleBtn = hero.querySelector(".hero-toggle");
    const toggleText = toggleBtn?.querySelector("span");
    let index = 0;
    let timer = null;
    let paused = reduce.matches;
    const show = (i) => {
      slides[index].classList.remove("is-active");
      dots[index]?.classList.remove("is-active");
      dots[index]?.removeAttribute("aria-current");
      index = (i + slides.length) % slides.length;
      const slide = slides[index];
      if (slide.loading === "lazy") slide.loading = "eager";
      // restart the zoom on the incoming slide
      slide.style.animation = "none";
      void slide.offsetWidth;
      slide.style.animation = "";
      slide.classList.add("is-active");
      dots[index]?.classList.add("is-active");
      dots[index]?.setAttribute("aria-current", "true");
    };
    const schedule = () => {
      clearInterval(timer);
      if (!paused) timer = setInterval(() => show(index + 1), 6500);
    };
    const setPaused = (p) => {
      paused = p;
      if (toggleBtn) {
        toggleBtn.setAttribute("aria-pressed", String(p));
        toggleText.textContent = p ? "Play slideshow" : "Pause slideshow";
      }
      schedule();
    };
    hero.querySelector(".hero-arrow.prev")?.addEventListener("click", () => { show(index - 1); schedule(); });
    hero.querySelector(".hero-arrow.next")?.addEventListener("click", () => { show(index + 1); schedule(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); schedule(); }));
    toggleBtn?.addEventListener("click", () => setPaused(!paused));
    let startX = null;
    hero.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") startX = e.clientX; });
    hero.addEventListener("pointerup", (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) { show(index + (dx < 0 ? 1 : -1)); schedule(); }
    });
    document.addEventListener("visibilitychange", () => { if (document.hidden) clearInterval(timer); else schedule(); });
    setPaused(paused);
  });

  // ---- "what we do": the sticky photo follows whichever item is being read
  // (the one crossing the middle of the screen), or the one hovered or focused
  document.querySelectorAll(".ways").forEach((section) => {
    const items = Array.from(section.querySelectorAll(".way-item"));
    const photos = Array.from(section.querySelectorAll(".way-photo"));
    const setActive = (i) => {
      items.forEach((el, k) => el.classList.toggle("is-active", k === i));
      photos.forEach((el, k) => el.classList.toggle("is-active", k === i));
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(items.indexOf(e.target)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    items.forEach((el, i) => {
      io.observe(el);
      el.addEventListener("pointerenter", () => setActive(i));
      el.addEventListener("focusin", () => setActive(i));
    });
  });

  // ---- background video. The file is chosen here, not in the markup:
  //   phones get the light portrait cut (data-src-mobile), larger screens the HD one;
  //   data saver or a 2G connection keeps the poster until the visitor presses Play;
  //   reduced motion never autoplays. A pause control is always offered
  //   (WCAG 2.2.2) and the video pauses whenever it is off screen.
  const connection = navigator.connection || {};
  const slowNetwork = connection.saveData === true || /(^|-)2g$/.test(connection.effectiveType || "");
  const phone = window.matchMedia("(max-width: 700px)");
  document.querySelectorAll("[data-hero-video]").forEach((video) => {
    const button = video.closest(".hero, .page-hero")?.querySelector(".hero-toggle");
    const text = button?.querySelector("span");
    let userPaused = reduce.matches || slowNetwork;
    const attach = () => {
      if (video.getAttribute("src")) return;
      video.src = (phone.matches && video.dataset.srcMobile) || video.dataset.src;
    };
    const sync = () => {
      if (!button) return;
      button.setAttribute("aria-pressed", String(video.paused));
      text.textContent = video.paused ? "Play video" : "Pause video";
    };
    if (!userPaused) attach();
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    button?.addEventListener("click", () => {
      userPaused = !video.paused;
      if (video.paused) { attach(); video.play().catch(() => {}); } else video.pause();
    });
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused) video.play().catch(() => {});
      else if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.05 }).observe(video);
    sync();
  });

  // ---- gallery lightbox
  const dialog = document.querySelector(".lightbox");
  if (dialog) {
    const items = Array.from(document.querySelectorAll("[data-lightbox]"));
    const img = dialog.querySelector("img");
    const caption = dialog.querySelector(".lightbox-caption");
    let index = 0;
    let opener = null;
    const show = (i) => {
      index = (i + items.length) % items.length;
      const item = items[index];
      img.src = item.dataset.full;
      img.alt = item.querySelector("img").alt;
      caption.textContent = item.dataset.caption || img.alt;
    };
    items.forEach((item, i) => item.addEventListener("click", () => { opener = item; show(i); dialog.showModal(); }));
    dialog.querySelector("[data-lb-prev]").addEventListener("click", () => show(index - 1));
    dialog.querySelector("[data-lb-next]").addEventListener("click", () => show(index + 1));
    dialog.querySelector("[data-lb-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    dialog.addEventListener("click", (e) => { if (e.target === dialog || e.target.classList.contains("lightbox-figure")) dialog.close(); });
    dialog.addEventListener("close", () => opener?.focus());
  }
})();
