// Hindustan Kalari Sangham — shared behaviour. No dependencies.
window.HKS_READY = true;

// The Sangham's year, by month only (0 = January). Mirrors the list on events.html.
// Navratri and Vijayadashami follow the festival calendar and usually fall in September or October.
const YEAR = [
  { months: [2], name: "International Women's Day workshop", when: "March" },
  { months: [3], name: "Summer Kalari camp for children", when: "April" },
  { months: [4], name: "Gurusmriti", note: "The annual remembrance of Veerasree Sami Gurukkal.", when: "May" },
  { months: [5], name: "International Yoga Day workshop", when: "June" },
  { months: [6], name: "Guru Purnima Guru Pooja", when: "July" },
  { months: [6, 7], name: "Ganapathi Homam and Ramayana month poojas", note: "Through Karkidakam, the Malayalam month of July to August.", when: "Karkidakam" },
  { months: [7], name: "Independence Day and Onam", when: "August" },
  { months: [8, 9], name: "Navratri", note: "Golu, chanting and cultural evenings at the Kalari." },
  { months: [8, 9], name: "Vidyarambham on Vijayadashami", note: "The day new students begin their training." },
];

const month = new Date().getMonth();

// Header menu on small screens.
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("site-nav");
if (menuBtn && nav) {
  const setOpen = (open) => {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "Close" : "Menu";
    nav.classList.toggle("is-open", open);
  };
  menuBtn.addEventListener("click", () => setOpen(menuBtn.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); menuBtn.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && e.target !== menuBtn) setOpen(false);
  });
}

// Events page: mark what falls in the current month.
document.querySelectorAll("[data-months]").forEach((li) => {
  const months = li.dataset.months.split(",").map(Number);
  if (months.includes(month)) li.classList.add("is-now");
});

// Home: this season at the Kalari, or the next thing on the calendar.
const season = document.querySelector("[data-season]");
if (season) {
  let items = YEAR.filter((e) => e.months.includes(month));
  let heading = "This season at the Kalari";
  if (!items.length) {
    for (let step = 1; step <= 12 && !items.length; step++) {
      const m = (month + step) % 12;
      items = YEAR.filter((e) => e.months[0] === m);
    }
    heading = "Next at the Kalari";
  }
  season.querySelector("[data-season-heading]").textContent = heading;
  const list = season.querySelector("[data-season-list]");
  list.replaceChildren(...items.map((e) => {
    const li = document.createElement("li");
    const h = document.createElement("p");
    h.className = "h3";
    h.textContent = e.name;
    const when = document.createElement("p");
    when.className = "soft";
    when.textContent = [e.when, e.note].filter(Boolean).join(". ").replace(/\.\.$/, ".");
    li.append(h, when);
    return li;
  }));
}

// Fit the footer wordmark exactly to the page width once the display face has loaded.
const fitWordmarks = () => document.querySelectorAll("svg[data-fit]").forEach((svg) => {
  const b = svg.querySelector("text").getBBox();
  if (b.width) svg.setAttribute("viewBox", `${b.x} ${b.y} ${b.width} ${b.height}`);
});
(document.fonts ? document.fonts.ready : Promise.resolve()).then(fitWordmarks);

// Footer year.
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

// Section entrances: the parts of each block arrive in reading order, once.
const reveal = document.querySelectorAll("[data-reveal]");
reveal.forEach((block) => [...block.children].forEach((child, i) => child.style.setProperty("--i", i)));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  reveal.forEach((block) => io.observe(block));
} else {
  reveal.forEach((block) => block.classList.add("is-in"));
}
