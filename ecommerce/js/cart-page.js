/* ═════════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Cart Page Logic (Phase 4 — Clean Rebuild)
   ═════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── DOM refs ────────────────────────────────────────────────── */
  const skeletonEl     = document.getElementById('cart-skeleton');
  const emptyEl        = document.getElementById('cart-empty');
  const contentEl      = document.getElementById('cart-content');
  const itemsListEl    = document.getElementById('cart-items-list');
  const itemCountEl    = document.getElementById('cart-item-count');
  const subtotalEl     = document.getElementById('cart-subtotal');
  const shippingCostEl = document.getElementById('cart-shipping-cost');
  const totalEl        = document.getElementById('cart-total');
  const shipFillEl     = document.getElementById('cart-shipping-fill');
  const shipTextEl     = document.getElementById('cart-shipping-text');
  const clearBtn       = document.getElementById('cart-clear-btn');
  const suggestionsEl  = document.getElementById('cart-suggestions');

  // Dialog
  const dialogOverlay  = document.getElementById('cart-dialog-overlay');
  const dialogText     = document.getElementById('cart-dialog-text');
  const dialogCancel   = document.getElementById('cart-dialog-cancel');
  const dialogConfirm  = document.getElementById('cart-dialog-confirm');

  /* ── Config ──────────────────────────────────────────────────── */
  const FREE_SHIP_MIN = 15000;  // ₦15,000 unlocks free shipping
  const STD_SHIPPING  = 2500;   // ₦2,500 standard

  /* ── State ───────────────────────────────────────────────────── */
  let pendingRemoveId = null;

  /* ═══════════════════════════════════════════════════════════════
     BOOT
     ═══════════════════════════════════════════════════════════════ */
  function init() {
    // Short delay to show skeleton — improves perceived performance
    setTimeout(() => {
      hideSkeleton();
      const cart = getCart();
      if (cart.length === 0) {
        showEmpty();
      } else {
        showContent(cart);
      }
    }, 320);
  }

  /* ══ UI state helpers ═══════════════════════════════════════════ */
  function hideSkeleton() {
    if (!skeletonEl) return;
    skeletonEl.style.transition = 'opacity 0.25s ease';
    skeletonEl.style.opacity = '0';
    setTimeout(() => skeletonEl.remove(), 260);
  }

  function showContent(cart) {
    if (contentEl) contentEl.style.display = '';
    if (emptyEl)   emptyEl.style.display   = 'none';
    renderItems(cart);
    renderSummary(cart);
    renderShipBar(cart);
    renderItemCount(cart);
  }

  function showEmpty() {
    if (emptyEl)   emptyEl.style.display   = '';
    if (contentEl) contentEl.style.display = 'none';
    renderSuggestions();
  }

  function rerender() {
    const cart = getCart();
    if (cart.length === 0) {
      if (contentEl) {
        contentEl.style.transition = 'opacity 0.25s ease';
        contentEl.style.opacity = '0';
        setTimeout(() => { contentEl.style.display = 'none'; contentEl.style.opacity = ''; showEmpty(); }, 260);
      } else {
        showEmpty();
      }
      return;
    }
    if (contentEl) { contentEl.style.opacity = '1'; contentEl.style.transition = ''; }
    renderItems(cart);
    renderSummary(cart);
    renderShipBar(cart);
    renderItemCount(cart);
  }

  /* ═══════════════════════════════════════════════════════════════
     RENDER ITEMS
     ═══════════════════════════════════════════════════════════════ */
  function renderItems(cart) {
    if (!itemsListEl) return;

    itemsListEl.innerHTML = cart.map((item, i) => {
      const linePrice = formatPrice(item.price * item.quantity);
      const unitPrice = formatPrice(item.price);
      const delay = (Math.min(i, 5) * 0.055).toFixed(3);

      return `
        <article class="cart-item cart-item--in"
                 role="listitem"
                 data-item-id="${item.cartItemId}"
                 style="animation-delay:${delay}s;">

          <div class="cart-item__img">
            <a href="/ecommerce/pages/product.html?id=${item.slug}" tabindex="-1" aria-hidden="true">
              <img src="${item.image}" alt="${item.name}" loading="lazy" />
            </a>
          </div>

          <div class="cart-item__info">
            <a class="cart-item__name" href="/ecommerce/pages/product.html?id=${item.slug}">${item.name}</a>
            ${item.variant ? `<span class="cart-item__variant">${item.variant}</span>` : ''}
            <div class="cart-item__qty-row">
              <div class="ec-qty-stepper" role="group" aria-label="Quantity for ${item.name}">
                <button class="ec-qty-stepper__btn"
                        data-action="dec"
                        data-id="${item.cartItemId}"
                        aria-label="Decrease"
                        ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
                <span class="ec-qty-stepper__value" aria-live="polite">${item.quantity}</span>
                <button class="ec-qty-stepper__btn"
                        data-action="inc"
                        data-id="${item.cartItemId}"
                        aria-label="Increase">+</button>
              </div>
              <span style="font-family:'Outfit',sans-serif;font-size:11px;color:var(--ec-text-muted);margin-left:10px;">${unitPrice} each</span>
            </div>
          </div>

          <div class="cart-item__right">
            <span class="cart-item__price">${linePrice}</span>
            <button class="cart-item__remove-btn"
                    data-remove-id="${item.cartItemId}"
                    data-remove-name="${escapeAttr(item.name)}"
                    aria-label="Remove ${item.name}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Wire qty buttons
    itemsListEl.querySelectorAll('.ec-qty-stepper__btn').forEach(btn => {
      btn.addEventListener('click', handleQtyClick);
    });

    // Wire remove buttons
    itemsListEl.querySelectorAll('.cart-item__remove-btn').forEach(btn => {
      btn.addEventListener('click', handleRemoveClick);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     QUANTITY CHANGE
     ═══════════════════════════════════════════════════════════════ */
  function handleQtyClick(e) {
    const btn    = e.currentTarget;
    const action = btn.dataset.action;
    const id     = btn.dataset.id;
    const cart   = getCart();
    const item   = cart.find(i => i.cartItemId === id);
    if (!item) return;

    const newQty = action === 'inc' ? item.quantity + 1 : item.quantity - 1;

    if (newQty < 1) {
      // Ask for removal confirmation
      pendingRemoveId = id;
      showDialog(item.name);
      return;
    }

    // Optimistic DOM patch
    const row      = btn.closest('.cart-item');
    const qtyEl    = row.querySelector('.ec-qty-stepper__value');
    const priceEl  = row.querySelector('.cart-item__price');
    const decBtn   = row.querySelector('[data-action="dec"]');

    updateCartQuantity(id, newQty);

    if (qtyEl)   qtyEl.textContent = newQty;
    if (decBtn)  decBtn.disabled = newQty <= 1;
    if (priceEl) priceEl.textContent = formatPrice(item.price * newQty);

    // Update totals only — avoid full rerender flicker
    const updatedCart = getCart();
    renderSummary(updatedCart);
    renderShipBar(updatedCart);
    renderItemCount(updatedCart);
  }

  /* ═══════════════════════════════════════════════════════════════
     REMOVAL
     ═══════════════════════════════════════════════════════════════ */
  function handleRemoveClick(e) {
    const btn  = e.currentTarget;
    pendingRemoveId = btn.dataset.removeId;
    showDialog(btn.dataset.removeName);
  }

  function showDialog(name) {
    if (!dialogOverlay) { commitRemove(); return; }
    if (dialogText)  dialogText.textContent = `"${name}" will be removed from your cart.`;
    dialogOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (dialogConfirm) dialogConfirm.focus();
  }

  function closeDialog() {
    if (!dialogOverlay) return;
    dialogOverlay.style.display = 'none';
    document.body.style.overflow = '';
    pendingRemoveId = null;
  }

  function commitRemove() {
    if (!pendingRemoveId) return;
    const id    = pendingRemoveId;
    const rowEl = document.querySelector(`[data-item-id="${id}"]`);
    if (rowEl) {
      rowEl.classList.add('cart-item--removing');
      setTimeout(() => { removeFromCart(id); pendingRemoveId = null; rerender(); }, 310);
    } else {
      removeFromCart(id);
      pendingRemoveId = null;
      rerender();
    }
  }

  if (dialogConfirm) dialogConfirm.addEventListener('click', () => { commitRemove(); closeDialog(); });
  if (dialogCancel)  dialogCancel.addEventListener('click', closeDialog);
  if (dialogOverlay) dialogOverlay.addEventListener('click', e => { if (e.target === dialogOverlay) closeDialog(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && dialogOverlay && dialogOverlay.style.display !== 'none') closeDialog();
  });

  /* ═══════════════════════════════════════════════════════════════
     CLEAR CART
     ═══════════════════════════════════════════════════════════════ */
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!window.confirm('Clear your entire cart?')) return;
      clearCart();
      showCartToast('Cart cleared.', 'info');
      rerender();
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     SUMMARY & SHIPPING BAR
     ═══════════════════════════════════════════════════════════════ */
  function renderSummary(cart) {
    const sub      = cart.reduce((t, i) => t + i.price * i.quantity, 0);
    const freeShip = sub >= FREE_SHIP_MIN;
    const ship     = sub === 0 ? 0 : (freeShip ? 0 : STD_SHIPPING);

    if (subtotalEl)    subtotalEl.textContent = formatPrice(sub);
    if (totalEl)       totalEl.textContent    = formatPrice(sub + ship);
    if (shippingCostEl) {
      if (sub === 0) {
        shippingCostEl.textContent = '—';
      } else if (freeShip) {
        shippingCostEl.innerHTML = '<span style="color:var(--ec-success);font-weight:700;">FREE 🎉</span>';
      } else {
        shippingCostEl.textContent = formatPrice(ship);
      }
    }
  }

  function renderShipBar(cart) {
    const sub  = cart.reduce((t, i) => t + i.price * i.quantity, 0);
    const pct  = Math.min((sub / FREE_SHIP_MIN) * 100, 100);
    const left = FREE_SHIP_MIN - sub;

    if (shipFillEl) shipFillEl.style.width = pct + '%';
    if (shipTextEl) {
      shipTextEl.innerHTML = sub >= FREE_SHIP_MIN
        ? '🎉 <strong>You\'ve unlocked free shipping!</strong>'
        : `Add <strong>${formatPrice(left)}</strong> more for free delivery`;
    }
  }

  function renderItemCount(cart) {
    if (!itemCountEl) return;
    const n = cart.reduce((t, i) => t + i.quantity, 0);
    itemCountEl.textContent = `${n} item${n !== 1 ? 's' : ''}`;
  }

  /* ═══════════════════════════════════════════════════════════════
     EMPTY STATE SUGGESTIONS
     ═══════════════════════════════════════════════════════════════ */
  function renderSuggestions() {
    if (!suggestionsEl || typeof getFeaturedProducts !== 'function') return;
    const picks = getFeaturedProducts().slice(0, 3);
    if (!picks.length) return;

    // Build HTML — avoid inline onerror with complex quotes
    const cardsHTML = picks.map(p => {
      const cat = PRODUCT_CATEGORIES.find(c => c.slug === p.category);
      return `
        <article class="vl-product-card">
          <div class="vl-product-card__image-wrap">
            <a href="/ecommerce/pages/product.html?id=${p.slug}">
              <img class="vl-product-card__image" src="${p.image}" alt="${p.name}" loading="lazy" />
            </a>
            <button class="vl-product-card__quick-add suggest-add-btn"
                    data-pid="${p.id}"
                    aria-label="Add ${p.name} to cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
          <a href="/ecommerce/pages/product.html?id=${p.slug}" class="vl-product-card__body" style="text-decoration:none;">
            <span class="vl-product-card__category">${cat ? cat.label : ''}</span>
            <h3 class="vl-product-card__name">${p.name}</h3>
            <div class="vl-product-card__price-row">
              <span class="vl-product-card__price">${formatPrice(p.price)}</span>
            </div>
          </a>
        </article>
      `;
    }).join('');

    suggestionsEl.innerHTML = `
      <span class="cart-suggest-label">You might love</span>
      <div class="cart-suggest-grid">${cardsHTML}</div>
    `;

    // Attach image fallback via JS (avoids broken onerror attr escaping)
    suggestionsEl.querySelectorAll('.vl-product-card__image').forEach(img => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });
    });

    // Quick-add buttons
    suggestionsEl.querySelectorAll('.suggest-add-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const p = getProductById(btn.dataset.pid);
        if (!p) return;
        addToCart(p, 1, p.variants ? p.variants[0] : null);
        showCartToast(`${p.name} added to cart!`);
        setTimeout(() => window.location.reload(), 700);
      });
    });
  }

  /* ─── Escape attribute values safely ────────────────────────── */
  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ─── Cross-tab cart sync ────────────────────────────────────── */
  window.addEventListener('storage', e => {
    if (e.key === 'velour_cart') rerender();
  });

  /* ── Go ── */
  init();
});
