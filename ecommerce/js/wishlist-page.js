/* ═════════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Wishlist Page Logic
   Renders saved wishlist items, handles move-to-cart and removal
   ═════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── DOM refs ────────────────────────────────────────────────── */
  const skeletonEl  = document.getElementById('wishlist-skeleton');
  const emptyEl     = document.getElementById('wishlist-empty');
  const contentEl   = document.getElementById('wishlist-content');
  const gridEl      = document.getElementById('wishlist-grid');
  const countEl     = document.getElementById('wishlist-item-count');

  /* ═══════════════════════════════════════════════════════════════
     BOOT
     ═══════════════════════════════════════════════════════════════ */
  function init() {
    setTimeout(() => {
      hideSkeleton();
      const wishlist = getWishlist();
      if (wishlist.length === 0) {
        showEmpty();
      } else {
        showContent(wishlist);
      }
    }, 320);
  }

  /* ── UI state helpers ────────────────────────────────────────── */
  function hideSkeleton() {
    if (!skeletonEl) return;
    skeletonEl.style.transition = 'opacity 0.25s ease';
    skeletonEl.style.opacity = '0';
    setTimeout(() => skeletonEl.remove(), 260);
  }

  function showContent(wishlist) {
    if (contentEl) contentEl.style.display = '';
    if (emptyEl)   emptyEl.style.display   = 'none';
    renderGrid(wishlist);
    renderCount(wishlist);
  }

  function showEmpty() {
    if (emptyEl)   emptyEl.style.display   = '';
    if (contentEl) contentEl.style.display = 'none';
  }

  function rerender() {
    const wishlist = getWishlist();
    if (wishlist.length === 0) {
      if (contentEl) {
        contentEl.style.transition = 'opacity 0.25s ease';
        contentEl.style.opacity = '0';
        setTimeout(() => {
          contentEl.style.display = 'none';
          contentEl.style.opacity = '';
          showEmpty();
        }, 260);
      } else {
        showEmpty();
      }
      return;
    }
    if (contentEl) { contentEl.style.opacity = '1'; contentEl.style.transition = ''; }
    renderGrid(wishlist);
    renderCount(wishlist);
  }

  /* ═══════════════════════════════════════════════════════════════
     RENDER GRID
     ═══════════════════════════════════════════════════════════════ */
  function renderGrid(wishlist) {
    if (!gridEl) return;

    gridEl.innerHTML = wishlist.map((productId, i) => {
      const p = getProductById(productId);
      if (!p) return ''; // Product may have been removed from catalog

      const cat = PRODUCT_CATEGORIES.find(c => c.slug === p.category);
      const delay = Math.min(i * 0.06, 0.5);

      return `
        <article class="vl-product-card wishlist-card"
                 role="listitem"
                 data-wishlist-id="${p.id}"
                 style="animation-delay:${delay}s;">
          <div class="vl-product-card__image-wrap">
            <a href="/ecommerce/pages/product.html?id=${p.slug}" aria-label="View ${p.name}">
              <img
                class="vl-product-card__image"
                src="${p.image}"
                alt="${p.name}"
                loading="lazy"
              />
            </a>
            ${p.badge ? `<span class="vl-product-card__badge vl-product-card__badge--${getBadgeModifier(p.badge)}">${p.badge}</span>` : ''}
          </div>
          <a href="/ecommerce/pages/product.html?id=${p.slug}" class="vl-product-card__body" style="text-decoration:none;">
            <span class="vl-product-card__category">${cat ? cat.label : p.category}</span>
            <h3 class="vl-product-card__name">${p.name}</h3>
            <div class="vl-product-card__price-row">
              <span class="vl-product-card__price">${formatPrice(p.price)}</span>
              ${p.oldPrice ? `<span class="vl-product-card__old-price">${formatPrice(p.oldPrice)}</span>` : ''}
            </div>
          </a>
          <div class="wishlist-card__actions">
            <button class="wishlist-card__move-btn"
                    data-move-id="${p.id}"
                    aria-label="Move ${p.name} to cart">
              <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Move to Cart
            </button>
            <button class="wishlist-card__remove-btn"
                    data-remove-id="${p.id}"
                    aria-label="Remove ${p.name} from wishlist">
              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </article>
      `;
    }).filter(Boolean).join('');

    // Handle images that fail to load
    gridEl.querySelectorAll('.vl-product-card__image').forEach(img => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        img.insertAdjacentHTML('afterend', '<div class="ec-img-fallback">V</div>');
      });
    });

    // Wire Move to Cart buttons
    gridEl.querySelectorAll('.wishlist-card__move-btn').forEach(btn => {
      btn.addEventListener('click', handleMoveToCart);
    });

    // Wire Remove buttons
    gridEl.querySelectorAll('.wishlist-card__remove-btn').forEach(btn => {
      btn.addEventListener('click', handleRemove);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     MOVE TO CART
     ═══════════════════════════════════════════════════════════════ */
  function handleMoveToCart(e) {
    const btn = e.currentTarget;
    const productId = btn.dataset.moveId;
    const card = btn.closest('.wishlist-card');
    const product = getProductById(productId);

    if (!product) return;

    // Animate button to loading state
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="product-atc-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
          <animate attributeName="stroke-dashoffset" dur="0.8s" values="32;0" repeatCount="indefinite"/>
        </circle>
      </svg>
      Moving…
    `;

    setTimeout(() => {
      // Move to cart
      const success = moveWishlistToCart(productId);

      if (success) {
        showCartToast(`${product.name} moved to cart!`, 'success');

        // Animate card out
        if (card) {
          card.classList.add('wishlist-card--removing');
          setTimeout(() => rerender(), 360);
        } else {
          rerender();
        }
      } else {
        showCartToast('Could not move item to cart.', 'error');
        btn.disabled = false;
        btn.innerHTML = originalHTML;
      }
    }, 400);
  }

  /* ═══════════════════════════════════════════════════════════════
     REMOVE FROM WISHLIST
     ═══════════════════════════════════════════════════════════════ */
  function handleRemove(e) {
    const btn = e.currentTarget;
    const productId = btn.dataset.removeId;
    const card = btn.closest('.wishlist-card');
    const product = getProductById(productId);

    if (card) {
      card.classList.add('wishlist-card--removing');
      setTimeout(() => {
        removeFromWishlist(productId);
        showCartToast(
          product ? `${product.name} removed from favorites` : 'Item removed from favorites',
          'info'
        );
        rerender();
      }, 350);
    } else {
      removeFromWishlist(productId);
      rerender();
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     ITEM COUNT
     ═══════════════════════════════════════════════════════════════ */
  function renderCount(wishlist) {
    if (!countEl) return;
    const n = wishlist.length;
    countEl.textContent = `${n} saved item${n !== 1 ? 's' : ''}`;
  }

  /* ── Badge modifier helper (same as shop.js / product.js) ──── */
  function getBadgeModifier(badge) {
    if (!badge) return '';
    const b = badge.toLowerCase();
    if (b === 'sale')       return 'sale';
    if (b === 'new')        return 'new';
    if (b.includes('best')) return 'best-seller';
    if (b.includes('value'))return 'value';
    return 'best-seller';
  }

  /* ─── Cross-tab sync ────────────────────────────────────────── */
  window.addEventListener('storage', e => {
    if (e.key === WISHLIST_STORAGE_KEY) rerender();
  });

  /* ── Go ── */
  init();
});
