/* ═══════════════════════════════════════════════════════════════
   VELOUR — Single Product Page (dynamic via ?id=)
   Depends on /js/products-data.js being loaded first
   ═══════════════════════════════════════════════════════════════ */

const REVIEW_SEEDS = {
  default: [
    { name: 'Adaeze O.', date: 'Feb 2026', rating: 5, text: 'Absolutely love this product. My hair has never felt this healthy and the results are visible after just one week.', verified: true },
    { name: 'Chisom N.', date: 'Jan 2026', rating: 5, text: 'My stylist at Velour recommended this and she was completely right. Worth every naira.', verified: true },
    { name: 'Temi A.',   date: 'Jan 2026', rating: 4, text: 'Really good quality. A little goes a long way and the scent is subtle and luxurious.', verified: true },
    { name: 'Funke B.',  date: 'Dec 2025', rating: 5, text: 'I have tried so many products and this is the one that actually delivers on its promises.', verified: true },
    { name: 'Ngozi E.',  date: 'Dec 2025', rating: 4, text: 'Great product. Absorbs quickly and does not leave any residue. Would definitely repurchase.', verified: false },
    { name: 'Sade M.',   date: 'Nov 2025', rating: 5, text: 'The packaging is beautiful and the product is even better. My hair is visibly healthier.', verified: true },
  ],
  7: [
    { name: 'Adaeze O.', date: 'Feb 2026', rating: 5, text: 'This oil is everything. My hair has never felt this soft and the shine is unreal. I use it every single day now.', verified: true },
    { name: 'Chisom N.', date: 'Jan 2026', rating: 5, text: 'I was skeptical at first but after two weeks my edges are thriving. The rosehip scent is so subtle and luxurious.', verified: true },
    { name: 'Temi A.',   date: 'Jan 2026', rating: 5, text: 'Bought the 200ml and it lasts forever. A little goes a long way. My stylist at Velour recommended it and she was right.', verified: true },
    { name: 'Funke B.',  date: 'Dec 2025', rating: 4, text: "Really good product. Absorbs quickly and doesn't leave my hair greasy. Would love a travel size option.", verified: true },
    { name: 'Ngozi E.',  date: 'Dec 2025', rating: 5, text: "I've tried so many hair oils and this is the only one that actually works on my 4C hair without weighing it down.", verified: false },
    { name: 'Sade M.',   date: 'Nov 2025', rating: 5, text: 'The packaging alone is beautiful. But the product is even better. My hair is visibly healthier after just one month.', verified: true },
  ],
};

let currentProduct = null;
let qty = 1;
let selectedRating = 0;

document.addEventListener('DOMContentLoaded', () => {
  const id = Number(new URLSearchParams(window.location.search).get('id')) || 7;
  currentProduct = PRODUCTS.find(p => p.id === id);

  if (!currentProduct) {
    window.location.href = '/pages/404.html';
    return;
  }

  populatePage(currentProduct);
  initGallery(currentProduct);
  initOptions();
  initQty();
  initATC(currentProduct);
  initWishlist(currentProduct);
  initAccordion();
  initReviews(currentProduct.id);
  initReviewForm();
  initLightbox();
});

/* ── Populate page from product data ── */
function populatePage(p) {
  document.title = `${p.name} — Velour Hair Studio`;

  const bcCat = document.getElementById('pdp-bc-category');
  if (bcCat) bcCat.textContent = capitalise(p.category);
  const bcName = document.getElementById('pdp-bc-name');
  if (bcName) bcName.textContent = p.name;

  const catEl = document.querySelector('.pdp-category');
  if (catEl) catEl.textContent = capitalise(p.category);

  const nameEl = document.getElementById('pdp-product-name');
  if (nameEl) nameEl.innerHTML = formatName(p.name);

  const tagEl = document.querySelector('.pdp-tagline');
  if (tagEl) tagEl.textContent = p.desc;

  const priceEl = document.querySelector('.pdp-price');
  if (priceEl) priceEl.textContent = `\u20A6${p.price.toLocaleString()}`;

  const badgeEl = document.querySelector('.pdp-img-badge');
  if (badgeEl) {
    if (p.badge) { badgeEl.textContent = p.badge; badgeEl.hidden = false; }
    else { badgeEl.hidden = true; }
  }

  const mainImg = document.getElementById('pdp-main-img');
  if (mainImg) { mainImg.src = p.imgs[0]; mainImg.alt = p.name; }

  const thumbs = document.querySelectorAll('.pdp-thumb');
  thumbs.forEach((thumb, i) => {
    const img = thumb.querySelector('img');
    if (p.imgs[i]) { img.src = p.imgs[i]; thumb.hidden = false; }
    else { thumb.hidden = true; }
  });
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatName(name) {
  const words = name.trim().split(' ');
  if (words.length <= 2) return `${words.slice(0,-1).join(' ')}<br><em>${words[words.length-1]}</em>`;
  const first  = words.slice(0, -2).join(' ');
  const second = words.slice(-2).join(' ');
  return `${first}<br><em>${second}</em>`;
}

/* ── Gallery ── */
function initGallery(p) {
  const mainImg = document.getElementById('pdp-main-img');
  const thumbs  = document.querySelectorAll('.pdp-thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = Number(thumb.dataset.idx);
      if (!p.imgs[idx]) return;
      mainImg.src = p.imgs[idx];
      mainImg.style.animation = 'none';
      mainImg.offsetHeight;
      mainImg.style.animation = 'pdpImgSwap 0.4s cubic-bezier(0.22,1,0.36,1) both';
      thumbs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-pressed', 'false'); });
      thumb.classList.add('is-active'); thumb.setAttribute('aria-pressed', 'true');
    });
  });
}

/* ── Size + Variant selectors ── */
function initOptions() {
  const sizeBtns  = document.querySelectorAll('.pdp-size-btn');
  const sizeLabel = document.getElementById('pdp-size-selected');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-pressed', 'true');
      if (sizeLabel) sizeLabel.textContent = btn.dataset.size;
    });
  });

  const varBtns  = document.querySelectorAll('.pdp-variant-btn');
  const varLabel = document.getElementById('pdp-variant-selected');
  varBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      varBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-pressed', 'true');
      if (varLabel) varLabel.textContent = btn.dataset.variant;
    });
  });
}

/* ── Quantity ── */
function initQty() {
  const dec = document.getElementById('pdp-qty-dec');
  const inc = document.getElementById('pdp-qty-inc');
  const val = document.getElementById('pdp-qty-val');
  if (dec) dec.addEventListener('click', () => { if (qty > 1) { qty--; val.textContent = qty; } });
  if (inc) inc.addEventListener('click', () => { qty++; val.textContent = qty; });
}

/* ── Add to Cart (delegates to global cart.js) ── */
function initATC(p) {
  const btn = document.getElementById('pdp-atc-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Add to global cart with selected qty
    addToCart(p.id, qty);

    const orig = btn.innerHTML;
    btn.classList.add('is-added');
    btn.innerHTML = `<svg viewBox="0 0 20 20" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10l4 4 8-8"/></svg> Added to Cart`;
    setTimeout(() => { btn.classList.remove('is-added'); btn.innerHTML = orig; }, 2200);
  });
}

/* ── Wishlist ── */
function initWishlist(p) {
  const btn = document.getElementById('pdp-wishlist-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const saved = btn.classList.toggle('is-saved');
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    showToast(saved ? `${p.name} saved to wishlist` : 'Removed from wishlist');
  });
}

/* ── Accordion ── */
function initAccordion() {
  const triggers = document.querySelectorAll('.pdp-acc-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id   = trigger.dataset.acc;
      const body = document.getElementById(`acc-${id}`);
      const open = trigger.classList.contains('is-open');
      triggers.forEach(t => {
        t.classList.remove('is-open'); t.setAttribute('aria-expanded', 'false');
        const b = document.getElementById(`acc-${t.dataset.acc}`);
        if (b) b.hidden = true;
      });
      if (!open) {
        trigger.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true');
        if (body) body.hidden = false;
      }
    });
  });
}

/* ── Reviews ── */
function initReviews(productId) {
  const grid = document.getElementById('pdp-reviews-grid');
  if (!grid) return;
  const reviews = REVIEW_SEEDS[productId] || REVIEW_SEEDS.default;
  grid.innerHTML = reviews.map((r, i) => `
    <article class="pdp-review-card" style="animation-delay:${i * 0.07}s">
      <div class="pdp-rv-stars" aria-label="${r.rating} out of 5 stars">
        ${Array.from({length:5}, (_,j) =>
          `<svg viewBox="0 0 12 12"><path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9L2 4l2.9-.4z" fill="${j < r.rating ? '#C9A96E' : 'rgba(107,63,94,0.15)'}"/></svg>`
        ).join('')}
      </div>
      <p class="pdp-rv-text">"${r.text}"</p>
      <div class="pdp-rv-author">
        <div class="pdp-rv-avatar" aria-hidden="true">${r.name.charAt(0)}</div>
        <div><p class="pdp-rv-name">${r.name}</p><p class="pdp-rv-date">${r.date}</p></div>
        ${r.verified ? `<span class="pdp-rv-verified">\u2713 Verified</span>` : ''}
      </div>
    </article>`).join('');
}

/* ── Review form ── */
function initReviewForm() {
  const form  = document.getElementById('pdp-review-form');
  const stars = document.querySelectorAll('.pdp-star-pick');
  const grid  = document.getElementById('pdp-reviews-grid');

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = Number(star.dataset.val);
      stars.forEach(s => s.classList.toggle('is-hover', Number(s.dataset.val) <= val));
    });
    star.addEventListener('mouseleave', () => stars.forEach(s => s.classList.remove('is-hover')));
    star.addEventListener('click', () => {
      selectedRating = Number(star.dataset.val);
      stars.forEach(s => s.classList.toggle('is-active', Number(s.dataset.val) <= selectedRating));
    });
  });

  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('rv-name').value.trim();
    const body = document.getElementById('rv-body').value.trim();
    if (!name || !body || !selectedRating) { showToast('Please fill in all fields and select a rating.'); return; }

    const card = document.createElement('article');
    card.className = 'pdp-review-card';
    card.innerHTML = `
      <div class="pdp-rv-stars">
        ${Array.from({length:5}, (_,j) =>
          `<svg viewBox="0 0 12 12"><path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.5 3.4 8.9l.5-2.9L2 4l2.9-.4z" fill="${j < selectedRating ? '#C9A96E' : 'rgba(107,63,94,0.15)'}"/></svg>`
        ).join('')}
      </div>
      <p class="pdp-rv-text">"${body}"</p>
      <div class="pdp-rv-author">
        <div class="pdp-rv-avatar">${name.charAt(0).toUpperCase()}</div>
        <div><p class="pdp-rv-name">${name}</p><p class="pdp-rv-date">Just now</p></div>
        <span class="pdp-rv-verified">\u2713 Verified</span>
      </div>`;
    if (grid) grid.prepend(card);
    form.reset(); selectedRating = 0;
    stars.forEach(s => s.classList.remove('is-active'));
    showToast('Thank you for your review!');
  });
}

/* ── Lightbox ── */
function initLightbox() {
  const lb      = document.getElementById('pdp-lightbox');
  const lbImg   = document.getElementById('pdp-lb-img');
  const lbClose = document.getElementById('pdp-lb-close');
  const zoomBtn = document.getElementById('pdp-zoom-btn');
  const mainImg = document.getElementById('pdp-main-img');

  function open()  { lbImg.src = mainImg.src; lb.hidden = false; document.body.style.overflow = 'hidden'; lbClose.focus(); }
  function close() { lb.hidden = true; document.body.style.overflow = ''; zoomBtn.focus(); }

  if (zoomBtn) zoomBtn.addEventListener('click', open);
  if (lbClose) lbClose.addEventListener('click', close);
  if (lb) lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb && !lb.hidden) close(); });
}

/* ── Toast ── */
function showToast(msg) {
  const toast = document.getElementById('pdp-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  toast.classList.add('is-visible');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => { toast.hidden = true; }, 350);
  }, 2600);
}
