/* ═══════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Shop Page Logic
   Renders products, handles filters, search, sort, pagination,
   and add-to-cart
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const grid        = document.getElementById('shop-product-grid');
  const filterWrap  = document.getElementById('shop-filter-tabs');
  const searchInput = document.getElementById('shop-search');
  const sortSelect  = document.getElementById('shop-sort');
  const countEl     = document.getElementById('shop-results-count');
  const emptyEl     = document.getElementById('shop-empty');
  const clearBtn    = document.getElementById('shop-clear-filters');

  if (!grid) return;

  let activeCategory = 'all';
  let searchQuery    = '';
  let sortKey        = 'featured';
  let currentPage    = 1;

  /* ─── Pagination Config ──────────────────────────────────── */
  const ITEMS_PER_PAGE_DESKTOP = 8;    // "All" tab on desktop
  const ITEMS_PER_PAGE_MOBILE  = 6;    // "All" tab on mobile + category tabs on mobile
  const MOBILE_BREAKPOINT      = 768;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  /**
   * Determine whether pagination should be shown for the current view
   * - "All Products" tab: always paginate
   * - Category tabs: paginate only on mobile
   */
  function shouldPaginate() {
    if (activeCategory === 'all') return true;
    return isMobile();
  }

  /**
   * Get the per-page count for the current context
   */
  function getPerPage() {
    if (activeCategory === 'all') {
      return isMobile() ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
    }
    // Category tabs only paginate on mobile
    return ITEMS_PER_PAGE_MOBILE;
  }

  /* ─── Build Category Filter Tabs ─────────────────────────── */
  function buildFilters() {
    if (!filterWrap) return;
    const categories = getActiveCategories();

    let html = `<button class="shop-filter-tab is-active" data-cat="all" role="tab" aria-selected="true">All Products</button>`;
    categories.forEach(cat => {
      html += `<button class="shop-filter-tab" data-cat="${cat.slug}" role="tab" aria-selected="false">${cat.label}</button>`;
    });
    filterWrap.innerHTML = html;

    filterWrap.querySelectorAll('.shop-filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        filterWrap.querySelectorAll('.shop-filter-tab').forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        activeCategory = tab.dataset.cat;
        currentPage = 1;
        renderProducts();
      });
    });
  }

  /* ─── Get Filtered + Sorted Products ─────────────────────── */
  function getVisibleProducts() {
    let products = getAllProducts();

    // Category filter
    if (activeCategory !== 'all') {
      products = products.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      products = searchProducts(searchQuery).filter(p =>
        activeCategory === 'all' || p.category === activeCategory
      );
    }

    // Sort
    products = sortProducts(products, sortKey);

    return products;
  }

  /* ─── Render Product Cards ───────────────────────────────── */
  function renderProducts() {
    const allProducts = getVisibleProducts();
    const paginate    = shouldPaginate();
    const perPage     = getPerPage();
    const totalPages  = paginate ? Math.ceil(allProducts.length / perPage) : 1;

    // Clamp current page
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // Slice for current page
    const startIdx = paginate ? (currentPage - 1) * perPage : 0;
    const endIdx   = paginate ? startIdx + perPage : allProducts.length;
    const products = allProducts.slice(startIdx, endIdx);

    // Update count
    if (countEl) {
      if (paginate && totalPages > 1) {
        countEl.textContent = `Showing ${startIdx + 1}–${Math.min(endIdx, allProducts.length)} of ${allProducts.length} products`;
      } else {
        countEl.textContent = `Showing ${allProducts.length} product${allProducts.length !== 1 ? 's' : ''}`;
      }
    }

    // Empty state
    if (allProducts.length === 0) {
      grid.style.display = 'none';
      if (emptyEl) emptyEl.style.display = '';
      removePagination();
      return;
    }

    grid.style.display = '';
    if (emptyEl) emptyEl.style.display = 'none';

    // Render cards
    grid.innerHTML = products.map((p, i) => {
      const cat = PRODUCT_CATEGORIES.find(c => c.slug === p.category);
      const badgeClass = getBadgeClass(p.badge);
      const delay = Math.min(i * 0.04, 0.4);
      const wishlisted = typeof isInWishlist === 'function' && isInWishlist(p.id);

      return `
        <article class="vl-product-card"
                 role="listitem"
                 style="opacity:0;transform:translateY(20px);animation:shopCardIn 0.5s ${delay}s var(--ec-ease) forwards;"
                 data-product-id="${p.id}">
          <div class="vl-product-card__image-wrap">
            <a href="/ecommerce/pages/product.html?id=${p.slug}" aria-label="View ${p.name}">
              <img
                class="vl-product-card__image"
                src="${p.image}"
                alt="${p.name}"
                onerror="this.style.display='none';this.insertAdjacentHTML('afterend', '<div class=\\'ec-img-fallback\\'>V</div>');"
              />
            </a>
            ${p.badge ? `<span class="vl-product-card__badge ${badgeClass}">${p.badge}</span>` : ''}
            <button
              class="vl-product-card__wishlist-btn ${wishlisted ? 'is-wishlisted' : ''}"
              data-wishlist-id="${p.id}"
              aria-label="${wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}"
            >
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </button>
            <button
              class="vl-product-card__quick-add"
              data-add-id="${p.id}"
              aria-label="Add ${p.name} to cart"
            >
              <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <a href="/ecommerce/pages/product.html?id=${p.slug}" class="vl-product-card__body" style="text-decoration:none;">
            <span class="vl-product-card__category">${cat ? cat.label : p.category}</span>
            <h3 class="vl-product-card__name">${p.name}</h3>
            <div class="vl-product-card__price-row">
              <span class="vl-product-card__price">${formatPrice(p.price)}</span>
              ${p.oldPrice ? `<span class="vl-product-card__old-price">${formatPrice(p.oldPrice)}</span>` : ''}
            </div>
          </a>
        </article>
      `;
    }).join('');

    // Attach wishlist heart button handlers
    grid.querySelectorAll('.vl-product-card__wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (typeof toggleWishlist !== 'function') return;

        const productId = btn.dataset.wishlistId;
        const added = toggleWishlist(productId);
        const product = getProductById(productId);

        btn.classList.toggle('is-wishlisted', added);
        btn.setAttribute('aria-label', added ? 'Remove from wishlist' : 'Save to wishlist');

        // Heart pop animation
        btn.classList.remove('heart-pop');
        void btn.offsetWidth;
        btn.classList.add('heart-pop');

        showCartToast(
          added ? `${product ? product.name : 'Item'} saved to favorites ♥` : `Removed from favorites`,
          added ? 'success' : 'info'
        );
      });
    });

    // Attach quick-add handlers
    grid.querySelectorAll('.vl-product-card__quick-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        handleQuickAdd(btn.dataset.addId);
      });
    });

    // Render pagination
    if (paginate && totalPages > 1) {
      renderPagination(totalPages);
    } else {
      removePagination();
    }
  }

  /* ─── Pagination Renderer ────────────────────────────────── */
  function renderPagination(totalPages) {
    removePagination();

    const paginationWrap = document.createElement('nav');
    paginationWrap.className = 'shop-pagination';
    paginationWrap.id = 'shop-pagination';
    paginationWrap.setAttribute('aria-label', 'Product pagination');

    let html = '';

    // Prev button
    html += `
      <button class="shop-pagination__btn shop-pagination__btn--arrow" data-page="prev" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    `;

    // Page numbers with ellipsis logic
    const maxVisible = isMobile() ? 5 : 7;

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        html += pageBtn(i);
      }
    } else {
      // Always show first page
      html += pageBtn(1);

      if (currentPage > 3) {
        html += `<span class="shop-pagination__dots">…</span>`;
      }

      // Window around current page
      const start = Math.max(2, currentPage - 1);
      const end   = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        html += pageBtn(i);
      }

      if (currentPage < totalPages - 2) {
        html += `<span class="shop-pagination__dots">…</span>`;
      }

      // Always show last page
      html += pageBtn(totalPages);
    }

    // Next button
    html += `
      <button class="shop-pagination__btn shop-pagination__btn--arrow" data-page="next" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next page">
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    `;

    paginationWrap.innerHTML = html;

    // Page info text
    const infoEl = document.createElement('p');
    infoEl.className = 'shop-pagination__info';
    infoEl.id = 'shop-pagination-info';
    const total = getVisibleProducts().length;
    const perPage = getPerPage();
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, total);
    infoEl.textContent = `Page ${currentPage} of ${totalPages}`;

    // Insert after grid
    grid.parentNode.insertBefore(paginationWrap, grid.nextSibling);
    grid.parentNode.insertBefore(infoEl, paginationWrap.nextSibling);

    // Click handlers
    paginationWrap.querySelectorAll('.shop-pagination__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page === 'prev') {
          currentPage = Math.max(1, currentPage - 1);
        } else if (page === 'next') {
          currentPage = Math.min(totalPages, currentPage + 1);
        } else {
          currentPage = parseInt(page);
        }
        renderProducts();
        scrollToGrid();
      });
    });
  }

  function pageBtn(pageNum) {
    return `<button class="shop-pagination__btn ${pageNum === currentPage ? 'is-active' : ''}" data-page="${pageNum}">${pageNum}</button>`;
  }

  function removePagination() {
    const existing = document.getElementById('shop-pagination');
    if (existing) existing.remove();
    const info = document.getElementById('shop-pagination-info');
    if (info) info.remove();
  }

  function scrollToGrid() {
    const section = document.getElementById('shop-grid-section');
    if (section) {
      const offset = section.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }

  /* ─── Quick Add to Cart ──────────────────────────────────── */
  function handleQuickAdd(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const variant = product.variants ? product.variants[0] : null;
    addToCart(product, 1, variant);
    showCartToast(`${product.name} added to cart!`);

    // Animate the button
    const btn = grid.querySelector(`[data-add-id="${productId}"]`);
    if (btn) {
      btn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
      btn.style.background = 'var(--vl-gold)';
      btn.querySelector('svg').style.stroke = 'var(--vl-ink)';
      setTimeout(() => {
        btn.innerHTML = `<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
        btn.style.background = '';
      }, 1200);
    }
  }

  /* ─── Badge Class Helper ─────────────────────────────────── */
  function getBadgeClass(badge) {
    if (!badge) return '';
    const b = badge.toLowerCase();
    if (b === 'sale') return 'vl-product-card__badge--sale';
    if (b === 'new') return 'vl-product-card__badge--new';
    if (b.includes('best')) return 'vl-product-card__badge--best-seller';
    if (b.includes('value')) return 'vl-product-card__badge--value';
    return 'vl-product-card__badge--best-seller';
  }

  /* ─── Search Handler ─────────────────────────────────────── */
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = searchInput.value.trim().toLowerCase();
        currentPage = 1;
        renderProducts();
      }, 250);
    });
  }

  /* ─── Sort Handler ───────────────────────────────────────── */
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortKey = sortSelect.value;
      currentPage = 1;
      renderProducts();
    });
  }

  /* ─── Clear Filters ──────────────────────────────────────── */
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      sortKey = 'featured';
      currentPage = 1;
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';
      if (filterWrap) {
        filterWrap.querySelectorAll('.shop-filter-tab').forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        const allTab = filterWrap.querySelector('[data-cat="all"]');
        if (allTab) {
          allTab.classList.add('is-active');
          allTab.setAttribute('aria-selected', 'true');
        }
      }
      renderProducts();
    });
  }

  /* ─── Handle Resize (pagination rules change) ────────────── */
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      currentPage = 1;
      renderProducts();
    }, 200);
  });

  /* ─── Card Entrance Animation ────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shopCardIn {
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  /* ─── Initialize ─────────────────────────────────────────── */
  buildFilters();
  renderProducts();
});
