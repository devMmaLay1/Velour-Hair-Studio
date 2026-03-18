/* ═══════════════════════════════════════════════════════════════
   VELOUR — Global Cart
   Loaded on every page via main.js after navbar is injected.
   Depends on /js/products-data.js for product lookups.
   ═══════════════════════════════════════════════════════════════ */

/* ── State ── */
let cart = [];

/* ── Persistence ── */
function saveCart() {
  try { localStorage.setItem('velour-cart', JSON.stringify(cart)); } catch(e) {}
}

function loadCart() {
  try {
    const raw = localStorage.getItem('velour-cart');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    // Re-hydrate product refs from PRODUCTS catalogue so data is always fresh
    cart = parsed.map(item => {
      const product = (typeof PRODUCTS !== 'undefined')
        ? PRODUCTS.find(p => p.id === item.product?.id)
        : item.product;
      return product ? { product, qty: item.qty || 1 } : null;
    }).filter(Boolean);
  } catch(e) { cart = []; }
}

/* ── Public API (used by shop.js and product.js) ── */
function addToCart(id, qty = 1) {
  const product = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === id) : null;
  if (!product) return;
  const existing = cart.find(c => c.product.id === id);
  if (existing) { existing.qty += qty; } else { cart.push({ product, qty }); }
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showCartToast(`${product.name} added to cart`);
  // Re-render grid if on shop page
  if (typeof renderGrid === 'function') renderGrid();
}

function removeFromCart(id) {
  const idx = cart.findIndex(c => c.product.id === id);
  if (idx > -1) cart.splice(idx, 1);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  if (typeof renderGrid === 'function') renderGrid();
}

function updateQty(id, delta) {
  const item = cart.find(c => c.product.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  if (document.querySelector('.cs-overlay')) return; // locked page
  const badge = document.getElementById('sp-cart-badge');
  const total = cart.reduce((s, c) => s + c.qty, 0);
  if (badge) { badge.textContent = total; badge.hidden = total === 0; }
}

/* ── Open / Close ── */
function openCart() {
  // Don't open cart drawer on locked/coming-soon pages
  if (document.querySelector('.cs-overlay')) return;
  const drawer  = document.getElementById('sp-cart');
  const overlay = document.getElementById('sp-cart-overlay');
  const closeBtn = document.getElementById('sp-cart-close');
  if (!drawer) return;
  drawer.hidden = false;
  overlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
  if (closeBtn) closeBtn.focus();
}

function closeCart() {
  const drawer  = document.getElementById('sp-cart');
  const overlay = document.getElementById('sp-cart-overlay');
  const fab     = document.getElementById('sp-cart-fab');
  if (!drawer) return;
  drawer.hidden = true;
  overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
  if (fab) fab.focus();
}

/* ── Render drawer ── */
function renderCartDrawer() {
  const body   = document.getElementById('sp-cart-body');
  const footer = document.getElementById('sp-cart-footer');
  if (!body) return;

  if (!cart.length) {
    body.innerHTML = `
      <div class="sp-cart-empty">
        <svg viewBox="0 0 48 48" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6h4l3 18h20l3-12H10"/><circle cx="18" cy="38" r="2"/><circle cx="32" cy="38" r="2"/></svg>
        <p>Your cart is empty.</p>
        <span>Add some products to get started.</span>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = cart.map(({ product: p, qty }) => `
    <div class="sp-cart-item" data-id="${p.id}">
      <a href="/pages/product.html?id=${p.id}" class="sp-cart-item-img" aria-label="View ${p.name}">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </a>
      <div class="sp-cart-item-info">
        <p class="sp-cart-item-cat">${p.category}</p>
        <a href="/pages/product.html?id=${p.id}" class="sp-cart-item-name-link">
          <p class="sp-cart-item-name">${p.name}</p>
        </a>
        <p class="sp-cart-item-price">₦${p.price.toLocaleString()}</p>
        <div class="sp-cart-item-qty">
          <button class="sp-qty-btn" data-id="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span>${qty}</span>
          <button class="sp-qty-btn" data-id="${p.id}" data-delta="1" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="sp-cart-item-remove" data-id="${p.id}" aria-label="Remove ${p.name}">
        <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l10 10M13 3L3 13"/></svg>
      </button>
    </div>`).join('');

  const subtotal  = cart.reduce((s, c) => s + c.product.price * c.qty, 0);
  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  footer.innerHTML = `
    <div class="sp-cart-summary">
      <div class="sp-cart-summary-row">
        <span>Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''})</span>
        <em>₦${subtotal.toLocaleString()}</em>
      </div>
      <div class="sp-cart-summary-row">
        <span>Estimated delivery</span>
        <em>Calculated at checkout</em>
      </div>
      <div class="sp-cart-summary-sep"></div>
      <div class="sp-cart-summary-row is-total">
        <span>Total</span>
        <strong>₦${subtotal.toLocaleString()}</strong>
      </div>
    </div>
    <button class="sp-cart-checkout">
      Proceed to Checkout
      <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
    </button>
    <div class="sp-cart-secure">
      <svg viewBox="0 0 16 16" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L3 4.5v4C3 11.5 5.5 14 8 15c2.5-1 5-3.5 5-6.5v-4L8 2z"/></svg>
      <span>Secure checkout · SSL encrypted</span>
    </div>`;

  body.querySelectorAll('.sp-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => updateQty(Number(btn.dataset.id), Number(btn.dataset.delta)));
  });
  body.querySelectorAll('.sp-cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(Number(btn.dataset.id)));
  });
}

/* ── Toast ── */
function showCartToast(msg) {
  const toast = document.getElementById('sp-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  toast.classList.add('is-visible');
  clearTimeout(toast._cartTimer);
  toast._cartTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => { toast.hidden = true; }, 300);
  }, 2400);
}

/* ── Bootstrap — can be called manually or auto-initializes ── */
let cartInitialized = false;

function initGlobalCart() {
  // Prevent double initialization
  if (cartInitialized) return;
  
  // Early exit on locked/coming-soon pages — prevent all cart initialization
  if (document.body.dataset.lockedPage === 'true' || document.querySelector('.cs-overlay')) {
    return;
  }

  loadCart();
  updateCartBadge();

  // Use event delegation on document to handle clicks even if elements load later
  document.addEventListener('click', (e) => {
    // Cart FAB click
    if (e.target.closest('#sp-cart-fab')) {
      e.preventDefault();
      openCart();
    }
    // Close button click
    if (e.target.closest('#sp-cart-close')) {
      e.preventDefault();
      closeCart();
    }
    // Overlay click
    if (e.target.id === 'sp-cart-overlay') {
      closeCart();
    }
  });
  
  // Escape key to close
  document.addEventListener('keydown', e => { 
    if (e.key === 'Escape') closeCart(); 
  });
  
  cartInitialized = true;
}

// Auto-initialize on DOMContentLoaded as fallback
// (main.js will also call this after navbar loads, but cartInitialized flag prevents double init)
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for navbar to load, then initialize if not already done
  setTimeout(() => {
    if (!cartInitialized) {
      initGlobalCart();
    }
  }, 100);
});
