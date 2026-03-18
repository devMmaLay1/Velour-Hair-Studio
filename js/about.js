/* ═══════════════════════════════════════════════════════════════
   VELOUR — About Page: Scroll Reveal
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((el, i) => {
    // stagger siblings inside the same parent
    const siblings = [...el.parentElement.querySelectorAll('[data-reveal]')];
    const idx = siblings.indexOf(el);
    el.style.transitionDelay = (idx * 0.1) + 's';
    observer.observe(el);
  });
});
