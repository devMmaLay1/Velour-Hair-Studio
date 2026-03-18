/* ═══════════════════════════════════════════════════════════════
   VELOUR — Shop: product grid, filter, sort
   Cart logic lives in /js/cart.js (global)
   ═══════════════════════════════════════════════════════════════ */

// PRODUCTS array is loaded from /js/products-data.js (included before this script)

/* ── State ── */
let activeFilter = 'all';
let activeSort   = 'default';
let currentPage  = 1;

function getPerPage() {
  return window.innerWidth >= 768 ? 8 : 5;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initSort();
  renderGrid();
});

// Re-render on resize so per-page count updates when crossing the 768px breakpoint
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { currentPage = 1; renderGrid(); }, 200);
});

/* ── Filter tabs ── */
function initFilters() {
  const tabs = document.querySelectorAll('.sp-filter-tab');

  // Inject product counts into each chip
  tabs.forEach(tab => {
    const cat = tab.dataset.cat;
    const count = cat === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length;
    const badge = document.createElement('span');
    badge.className = 'sp-tab-count';
    badge.textContent = count;
    tab.appendChild(badge);

    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active'); tab.setAttribute('aria-selected', 'true');
      activeFilter = tab.dataset.cat;
      currentPage = 1;
      renderGrid();
    });
  });
}

/* ── Sort ── */
function initSort() {
  const sel = document.getElementById('sp-sort');
  if (sel) sel.addEventListener('change', () => { activeSort = sel.value; currentPage = 1; renderGrid(); });
}

/* ── Render grid ── */
function renderGrid() {
  const grid    = document.getElementById('sp-grid');
  const empty   = document.getElementById('sp-empty');
  const countEl = document.getElementById('sp-count-num');
  if (!grid) return;

  // Filter
  let items = activeFilter === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === activeFilter);

  // Sort
  if (activeSort === 'price-asc')  items.sort((a,b) => a.price - b.price);
  if (activeSort === 'price-desc') items.sort((a,b) => b.price - a.price);
  if (activeSort === 'name')       items.sort((a,b) => a.name.localeCompare(b.name));

  if (countEl) countEl.textContent = items.length;

  if (!items.length) {
    grid.innerHTML = '';
    empty.hidden = false;
    renderPagination(0, 0);
    return;
  }
  empty.hidden = true;

  // Paginate ALL tabs — always getPerPage() per page
  const totalPages = Math.ceil(items.length / getPerPage());
  currentPage = Math.min(currentPage, totalPages);
  const pageItems = items.slice((currentPage - 1) * getPerPage(), currentPage * getPerPage());

  grid.innerHTML = pageItems.map((p, i) => {
    const inCart = cart.find(c => c.product.id === p.id);
    return `
    <article class="sp-card" role="listitem" data-id="${p.id}" style="animation-delay:${i * 0.05}s">
      <a href="/pages/product.html?id=${p.id}" class="sp-card-link" aria-label="View ${p.name}">
        <div class="sp-card-img-wrap">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          <div class="sp-card-img-overlay" aria-hidden="true"></div>
          ${p.badge ? `<span class="sp-card-badge sp-card-badge--${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
        </div>
      </a>
      <button class="sp-card-wishlist" aria-label="Save ${p.name}" data-id="${p.id}">
        <svg viewBox="0 0 16 16" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13.5S2 9.5 2 5.5a3 3 0 016 0 3 3 0 016 0c0 4-6 8-6 8z"/></svg>
      </button>
      <div class="sp-card-body">
        <span class="sp-card-cat">${p.category}</span>
        <a href="/pages/product.html?id=${p.id}" class="sp-card-name-link">
          <h3 class="sp-card-name">${p.name}</h3>
        </a>
        <p class="sp-card-desc">${p.desc}</p>
        <div class="sp-card-footer">
          <p class="sp-card-price">₦${p.price.toLocaleString()}</p>
          <button class="sp-card-atc${inCart ? ' is-in-cart' : ''}" data-id="${p.id}" aria-label="${inCart ? 'In cart' : 'Add ' + p.name + ' to cart'}">
            ${inCart
              ? `<svg viewBox="0 0 16 16" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.5 3.5 6.5-7"/></svg><span class="sp-atc-label">In Cart</span>`
              : `<svg viewBox="0 0 16 16" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg><span class="sp-atc-label">Add</span>`
            }
          </button>
        </div>
      </div>
    </article>`;
  }).join('');

  grid.querySelectorAll('.sp-card-atc').forEach(btn => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.id)));
  });
  grid.querySelectorAll('.sp-card-wishlist').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('is-saved'));
  });

  renderPagination(totalPages, items.length);
}

/* ── Pagination ── */
function renderPagination(totalPages, total) {
  const nav = document.getElementById('sp-pagination');
  if (!nav) return;

  // Hide pagination for category views or single page
  if (totalPages <= 1) { nav.innerHTML = ''; return; }

  const range = getPaginationRange(currentPage, totalPages);
  const start = (currentPage - 1) * getPerPage() + 1;
  const end   = Math.min(currentPage * getPerPage(), total);

  nav.innerHTML = `
    <span class="sp-page-info">Showing ${start}–${end} of ${total}</span>
    <div class="sp-page-controls">
      <button class="sp-page-btn sp-page-prev" aria-label="Previous page" ${currentPage === 1 ? 'disabled' : ''}>
        <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 4L6 8l4 4"/></svg>
      </button>
      <div class="sp-page-numbers">
        ${range.map(p => p === '…'
          ? `<span class="sp-page-ellipsis">…</span>`
          : `<button class="sp-page-btn sp-page-num${p === currentPage ? ' is-active' : ''}" data-page="${p}" aria-label="Page ${p}" aria-current="${p === currentPage ? 'page' : 'false'}">${p}</button>`
        ).join('')}
      </div>
      <button class="sp-page-btn sp-page-next" aria-label="Next page" ${currentPage === totalPages ? 'disabled' : ''}>
        <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg>
      </button>
    </div>`;

  nav.querySelector('.sp-page-prev').addEventListener('click', () => goToPage(currentPage - 1));
  nav.querySelector('.sp-page-next').addEventListener('click', () => goToPage(currentPage + 1));
  nav.querySelectorAll('.sp-page-num').forEach(btn => {
    btn.addEventListener('click', () => goToPage(Number(btn.dataset.page)));
  });
}

function goToPage(page) {
  const items = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter);
  const totalPages = Math.ceil(items.length / getPerPage());
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderGrid();
  document.getElementById('sp-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, current, current - 1, current + 1].filter(p => p >= 1 && p <= total));
  const sorted = [...set].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…');
    result.push(sorted[i]);
  }
  return result;
}


