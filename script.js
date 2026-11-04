// Tobby Diesels — small progressive enhancements. The site works without JS;
// this only adds the mobile menu, reveal-on-scroll, the before/after slider
// and the quote form → WhatsApp hand-off.

const WHATSAPP_NUMBER = "263784747570"; // international format, no "+" (wa.me requirement)

// Mobile nav toggle
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Reveal on scroll: IntersectionObserver fires once per element, then stops watching it.
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Before/after slider: the range input drives a CSS custom property.
document.querySelectorAll(".ba").forEach((ba) => {
  const range = ba.querySelector("input[type=range]");
  const update = () => ba.style.setProperty("--pos", range.value + "%");
  range.addEventListener("input", update);
  update();
});

// Quote form: build a WhatsApp message instead of posting to a server.
const form = document.getElementById("quoteForm");
const errorEl = form.querySelector(".form-error");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const name = data.name.trim();
  const issue = data.issue.trim();
  if (!name || !issue) {
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;

  const lines = [
    `Hi Tobby Diesels, my name is ${name}.`,
    `Machine: ${data.machine}`,
    `Service: ${data.service}`,
    data.model.trim() && `Make/model/part: ${data.model.trim()}`,
    `Problem: ${issue}`,
  ].filter(Boolean);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  // A real <a target="_blank"> click is less likely to be popup-blocked than window.open().
  const a = Object.assign(document.createElement("a"), { href: url, target: "_blank", rel: "noopener" });
  document.body.appendChild(a);
  a.click();
  a.remove();
});

document.getElementById("year").textContent = new Date().getFullYear();
