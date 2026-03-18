/* ═══════════════════════════════════════════════════════════════
   VELOUR — Cart Page
   Depends on: products-data.js, cart.js (loaded before this)
   ═══════════════════════════════════════════════════════════════ */

/* ── Coupon catalogue ── */
const COUPONS = {
  'VELOUR10':  { pct: 10, label: '10% off' },
  'NEWCLIENT': { pct: 15, label: '15% off for new clients' },
  'LAGOS20':   { pct: 20, label: '20% Lagos special' },
};

const DELIVERY_FEES = { standard: 2500, express: 4500 };
const FREE_DELIVERY_THRESHOLD = 25000;

/* ── State ── */
let appliedCoupon = null;   // { code, pct }
let deliveryMode  = 'standard';

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  // Restore coupon from localStorage
  try {
    const saved = JSON.parse(localStorage.getItem('velour-coupon'));
    if (saved && COUPONS[saved.code]) appliedCoupon = saved;
  } catch(e) {}

  renderPage();
  initCoupon();
  initDelivery();
  initClearAll();
});

/* ── Main render ── */
function renderPage() {
  const hasItems = cart.length > 0;

  document.getElementById('cp-empty').hidden  = hasItems;
  document.getElementById('cp-layout').hidden = !hasItems;
  document.getElementById('cp-upsell').hidden = !hasItems;
  document.getElementById('cp-clear-btn').hidden = !hasItems;

  // Item count in heading
  const countEl = document.getElementById('cp-item-count');
  if (countEl) {
    const total = cart.reduce((s, c) => s + c.qty, 0);
    countEl.textContent = hasItems ? `(${total} item${total !== 1 ? 's' : ''})` : '';
  }

  if (!hasItems) return;

  renderItems();
  renderSummary();
  renderUpsell();

  // Restore coupon UI if one was saved
  if (appliedCoupon) {
    const input = document.getElementById('cp-coupon-input');
    const btn   = document.getElementById('cp-coupon-btn');
    const msg   = document.getElementById('cp-coupon-msg');
    if (input) { input.value = appliedCoupon.code; input.classList.add('is-valid'); input.disabled = true; }
    if (btn)   { btn.textContent = 'Remove'; btn.classList.add('is-applied'); }
    if (msg)   { msg.textContent = `✓ ${COUPONS[appliedCoupon.code].label} applied`; msg.className = 'cp-coupon-msg is-success'; }
  }
}

/* ── Render items list ── */
function renderItems() {
  const list = document.getElementById('cp-items-list');
  if (!list) return;

  list.innerHTML = cart.map(({ product: p, qty }, i) => `
    <div class="cp-item" data-id="${p.id}" style="animation-delay:${i * 0.06}s">
      <a href="/pages/product.html?id=${p.id}" class="cp-item-img" aria-label="View ${p.name}">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </a>
      <div class="cp-item-info">
        <span class="cp-item-cat">${p.category}</span>
        <a href="/pages/product.html?id=${p.id}" class="cp-item-name">${p.name}</a>
        <span class="cp-item-variant">Standard · 100ml</span>
        <span class="cp-item-price-unit">₦${p.price.toLocaleString()} each</span>
      </div>
      <div class="cp-item-right">
        <span class="cp-item-line-total" id="cp-line-${p.id}">₦${(p.price * qty).toLocaleString()}</span>
        <div class="cp-qty" role="group" aria-label="Quantity for ${p.name}">
          <button class="cp-qty-btn" data-id="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span class="cp-qty-val" id="cp-qty-val-${p.id}" aria-live="polite">${qty}</span>
          <button class="cp-qty-btn" data-id="${p.id}" data-delta="1" aria-label="Increase quantity">+</button>
        </div>
        <button class="cp-item-remove" data-id="${p.id}" aria-label="Remove ${p.name}">
          <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg>
          Remove
        </button>
      </div>
    </div>`).join('');

  // Qty buttons — update in place without full re-render
  list.querySelectorAll('.cp-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id    = Number(btn.dataset.id);
      const delta = Number(btn.dataset.delta);
      updateQty(id, delta);          // cart.js API
      syncItemRow(id);               // update just this row
      renderSummary();               // update totals
      renderUpsell();                // refresh suggestions
      updateHeadingCount();
    });
  });

  list.querySelectorAll('.cp-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      removeFromCart(id);            // cart.js API
      // Animate out then re-render
      const row = list.querySelector(`[data-id="${id}"]`);
      if (row) {
        row.style.transition = 'opacity 0.25s, transform 0.25s';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-12px)';
        setTimeout(() => renderPage(), 260);
      } else {
        renderPage();
      }
    });
  });
}

/* Update a single item row qty + line total without full re-render */
function syncItemRow(id) {
  const item = cart.find(c => c.product.id === id);
  const qtyEl  = document.getElementById(`cp-qty-val-${id}`);
  const lineEl = document.getElementById(`cp-line-${id}`);
  if (item) {
    if (qtyEl)  qtyEl.textContent  = item.qty;
    if (lineEl) lineEl.textContent = `₦${(item.product.price * item.qty).toLocaleString()}`;
  } else {
    // Item was removed (qty hit 0)
    renderPage();
  }
}

function updateHeadingCount() {
  const countEl = document.getElementById('cp-item-count');
  if (!countEl) return;
  const total = cart.reduce((s, c) => s + c.qty, 0);
  countEl.textContent = total > 0 ? `(${total} item${total !== 1 ? 's' : ''})` : '';
}

/* ── Render summary ── */
function renderSummary() {
  const subtotal = cart.reduce((s, c) => s + c.product.price * c.qty, 0);
  const isFree   = subtotal >= FREE_DELIVERY_THRESHOLD;
  const fee      = isFree ? 0 : DELIVERY_FEES[deliveryMode];
  const discount = appliedCoupon ? Math.round(subtotal * appliedCoupon.pct / 100) : 0;
  const total    = subtotal - discount + fee;

  // Subtotal
  const subEl = document.getElementById('cp-subtotal');
  if (subEl) subEl.textContent = `₦${subtotal.toLocaleString()}`;

  // Discount row
  const discRow = document.getElementById('cp-discount-row');
  const discAmt = document.getElementById('cp-discount-amount');
  const discCode = document.getElementById('cp-discount-code-label');
  if (discRow) discRow.hidden = !appliedCoupon;
  if (discAmt && appliedCoupon) discAmt.textContent = `−₦${discount.toLocaleString()}`;
  if (discCode && appliedCoupon) discCode.textContent = `(${appliedCoupon.code})`;

  // Delivery
  const delivEl = document.getElementById('cp-delivery');
  if (delivEl) delivEl.textContent = isFree ? 'Free' : `₦${fee.toLocaleString()}`;

  // Free delivery badge / delivery options visibility
  const optsEl = document.getElementById('cp-delivery-opts');
  // Remove existing free badge if any
  const existingBadge = document.querySelector('.cp-free-delivery');
  if (existingBadge) existingBadge.remove();

  if (isFree) {
    if (optsEl) optsEl.hidden = true;
    const badge = document.createElement('div');
    badge.className = 'cp-free-delivery';
    badge.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-7"/></svg> Free delivery on this order`;
    if (optsEl) optsEl.after(badge);
  } else {
    if (optsEl) optsEl.hidden = false;
    // Update standard price label
    const stdPrice = document.getElementById('cp-std-price');
    if (stdPrice) stdPrice.textContent = `₦${DELIVERY_FEES.standard.toLocaleString()}`;
  }

  // Total
  const totalEl = document.getElementById('cp-total');
  if (totalEl) totalEl.textContent = `₦${total.toLocaleString()}`;
}

/* ── Coupon logic ── */
function initCoupon() {
  const input = document.getElementById('cp-coupon-input');
  const btn   = document.getElementById('cp-coupon-btn');
  const msg   = document.getElementById('cp-coupon-msg');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    // If already applied — act as remove
    if (appliedCoupon) {
      appliedCoupon = null;
      localStorage.removeItem('velour-coupon');
      input.value = '';
      input.disabled = false;
      input.className = 'cp-coupon-input';
      btn.textContent = 'Apply';
      btn.classList.remove('is-applied');
      msg.textContent = '';
      msg.className = 'cp-coupon-msg';
      renderSummary();
      return;
    }

    const code = input.value.trim().toUpperCase();
    if (!code) {
      msg.textContent = 'Please enter a coupon code.';
      msg.className = 'cp-coupon-msg is-error';
      input.classList.add('is-invalid');
      return;
    }

    const coupon = COUPONS[code];
    if (!coupon) {
      msg.textContent = 'Invalid coupon code. Try VELOUR10, NEWCLIENT, or LAGOS20.';
      msg.className = 'cp-coupon-msg is-error';
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      return;
    }

    // Valid
    appliedCoupon = { code, pct: coupon.pct };
    localStorage.setItem('velour-coupon', JSON.stringify(appliedCoupon));
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.disabled = true;
    btn.textContent = 'Remove';
    btn.classList.add('is-applied');
    msg.textContent = `✓ ${coupon.label} applied`;
    msg.className = 'cp-coupon-msg is-success';
    renderSummary();
  });

  // Clear error on type
  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
    msg.textContent = '';
    msg.className = 'cp-coupon-msg';
  });

  // Apply on Enter
  input.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
}

/* ── Delivery toggle ── */
function initDelivery() {
  document.querySelectorAll('input[name="cp-delivery"]').forEach(radio => {
    radio.addEventListener('change', () => {
      deliveryMode = radio.value;
      renderSummary();
    });
  });
}

/* ── Clear all ── */
function initClearAll() {
  const btn = document.getElementById('cp-clear-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!cart.length) return;
    if (!confirm('Remove all items from your cart?')) return;
    // Empty cart
    while (cart.length) cart.pop();
    saveCart();
    updateCartBadge();
    renderPage();
  });
}

/* ── Upsell strip ── */
function renderUpsell() {
  const track = document.getElementById('cp-upsell-track');
  if (!track) return;

  const inCartIds = new Set(cart.map(c => c.product.id));
  const suggestions = PRODUCTS
    .filter(p => !inCartIds.has(p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (!suggestions.length) {
    document.getElementById('cp-upsell').hidden = true;
    return;
  }
  document.getElementById('cp-upsell').hidden = false;

  track.innerHTML = suggestions.map(p => `
    <div class="cp-upsell-card">
      <a href="/pages/product.html?id=${p.id}" class="cp-upsell-card-img" aria-label="View ${p.name}">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </a>
      <div class="cp-upsell-card-body">
        <p class="cp-upsell-card-cat">${p.category}</p>
        <a href="/pages/product.html?id=${p.id}" class="cp-upsell-card-name">${p.name}</a>
        <div class="cp-upsell-card-footer">
          <span class="cp-upsell-card-price">₦${p.price.toLocaleString()}</span>
          <button class="cp-upsell-atc" data-id="${p.id}" aria-label="Add ${p.name} to cart">
            <svg viewBox="0 0 16 16" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>
          </button>
        </div>
      </div>
    </div>`).join('');

  track.querySelectorAll('.cp-upsell-atc').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(Number(btn.dataset.id));
      renderPage();
    });
  });
}
