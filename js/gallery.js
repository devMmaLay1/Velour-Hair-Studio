/* ═══════════════════════════════════════════════════════════════
   VELOUR — Gallery Page: Filter + Lightbox
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initLightbox();
});

/* ─────────────────────────────────────────
   Filter Tabs
───────────────────────────────────────── */
function initFilters() {
  const filters  = document.querySelectorAll('.gal-filter');
  const masonry  = document.getElementById('gal-masonry');
  const countEl  = document.getElementById('gal-count');
  const emptyEl  = document.getElementById('gal-empty');
  if (!filters.length || !masonry) return;

  function applyFilter(active) {
    const items = masonry.querySelectorAll('.gal-item');
    let visible = 0;

    items.forEach((item) => {
      const match = active === 'all' || item.dataset.category === active;
      if (match) {
        item.classList.remove('is-hidden');
        visible++;
      } else {
        item.classList.add('is-hidden');
      }
    });

    if (countEl) {
      countEl.textContent = visible === 1 ? '1 photo' : `${visible} photos`;
    }
    if (emptyEl) {
      emptyEl.style.display = visible === 0 ? 'flex' : 'none';
    }
  }

  // Set initial count
  applyFilter('all');

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyFilter(btn.dataset.filter);
    });
  });
}

/* ─────────────────────────────────────────
   Lightbox
───────────────────────────────────────── */
function initLightbox() {
  const lightbox  = document.getElementById('gal-lightbox');
  const backdrop  = document.getElementById('gal-lb-backdrop');
  const img       = document.getElementById('gal-lb-img');
  const tagEl     = document.getElementById('gal-lb-tag');
  const labelEl   = document.getElementById('gal-lb-label');
  const counterEl = document.getElementById('gal-lb-counter');
  const prevBtn   = document.getElementById('gal-lb-prev');
  const nextBtn   = document.getElementById('gal-lb-next');
  const closeBtn  = document.getElementById('gal-lb-close');
  const masonry   = document.getElementById('gal-masonry');

  if (!lightbox || !masonry) return;

  let currentIndex = 0;

  function getVisibleItems() {
    return [...masonry.querySelectorAll('.gal-item:not(.is-hidden)')];
  }

  function openLightbox(index) {
    const items = getVisibleItems();
    if (!items.length) return;
    currentIndex = Math.max(0, Math.min(index, items.length - 1));
    populateLightbox(items, currentIndex);
    lightbox.style.display = 'flex';
    lightbox.classList.remove('is-closing');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.add('is-closing');
    lightbox.addEventListener('animationend', () => {
      lightbox.style.display = 'none';
      lightbox.classList.remove('is-closing');
      document.body.style.overflow = '';
    }, { once: true });
  }

  function populateLightbox(items, index) {
    const item    = items[index];
    const imgEl   = item.querySelector('img');
    const tagText = item.querySelector('.gal-tag')?.textContent || '';
    const label   = item.querySelector('.gal-label')?.textContent || '';

    // fade swap
    img.classList.add('is-loading');
    img.onload = () => img.classList.remove('is-loading');
    img.src = imgEl.src;
    img.alt = imgEl.alt;

    if (tagEl)     tagEl.textContent     = tagText;
    if (labelEl)   labelEl.textContent   = label;
    if (counterEl) counterEl.textContent = `${index + 1} / ${items.length}`;

    // nav state
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === items.length - 1;
  }

  function navigate(dir) {
    const items = getVisibleItems();
    const next  = currentIndex + dir;
    if (next < 0 || next >= items.length) return;
    currentIndex = next;
    populateLightbox(items, currentIndex);
  }

  // Open on zoom button click
  masonry.addEventListener('click', (e) => {
    const zoomBtn = e.target.closest('.gal-zoom');
    const item    = e.target.closest('.gal-item');
    if (!zoomBtn || !item) return;
    const items = getVisibleItems();
    const index = items.indexOf(item);
    if (index !== -1) openLightbox(index);
  });

  // Also open on item click (anywhere on the card)
  masonry.addEventListener('click', (e) => {
    if (e.target.closest('.gal-zoom')) return; // already handled above
    const item = e.target.closest('.gal-item');
    if (!item) return;
    const items = getVisibleItems();
    const index = items.indexOf(item);
    if (index !== -1) openLightbox(index);
  });

  // Nav
  if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

  // Close
  if (closeBtn)  closeBtn.addEventListener('click', closeLightbox);
  if (backdrop)  backdrop.addEventListener('click', closeLightbox);

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'none') return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
}
