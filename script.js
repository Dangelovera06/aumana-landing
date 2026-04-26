/* Aumana — minimal page interactions */

(function () {
  "use strict";


  const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if (prefersReduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  // FAQ — close other items when one opens (single-open accordion)
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item && other.open) other.open = false;
      });
    });
  });

  // Plausible custom events on CTA clicks (no-op if Plausible not loaded)
  document.querySelectorAll('a[href^="#audit"], .nav-cta, .btn-primary').forEach((cta) => {
    cta.addEventListener("click", () => {
      if (typeof window.plausible === "function") {
        window.plausible("CTA click", { props: { label: cta.textContent.trim().slice(0, 40) } });
      }
    });
  });
})();
