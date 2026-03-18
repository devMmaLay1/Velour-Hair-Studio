/* ═══════════════════════════════════════════════════════════════
   VELOUR — Services Page: Filter Tabs + Cards Grid + Pagination
   ═══════════════════════════════════════════════════════════════ */

const IMG = {
  silkPress:      '/assets/images/servicesCards/service card 1 - Silk Press.webp',
  braids:         '/assets/images/servicesCards/service card 2 - Knotless Braids.webp',
  colour:         '/assets/images/servicesCards/service card 3 - Hair Colour.webp',
  washGo:         '/assets/images/servicesCards/service card 4 - Wash & Go.webp',
  locs:           '/assets/images/servicesCards/service card 5 - Locs & Retwist.webp',
  deepCondition:  '/assets/images/servicesCards/service card 6 -Deep Condition.webp',
};

const SERVICES = [
  // ── Hair Care ──
  { id:1,  category:'hair-care',  tag:'Hair Care',   img: IMG.silkPress,     name:'Silk Press',            price:'From ₦15,000', duration:'2 – 2.5 hrs', desc:'A heat-styled finish that delivers glossy, flowing movement without compromising your natural texture.' },
  { id:2,  category:'hair-care',  tag:'Hair Care',   img: IMG.washGo,        name:'Blow Dry & Style',      price:'From ₦8,000',  duration:'1 – 1.5 hrs', desc:'Precision blow-dry with a tailored finish — volume, sleek, or natural depending on your preference.' },
  { id:3,  category:'hair-care',  tag:'Hair Care',   img: IMG.washGo,        name:'Wash & Condition',      price:'From ₦5,000',  duration:'45 – 60 min', desc:'Deep cleanse and conditioning ritual using premium products matched to your hair type and scalp needs.' },
  { id:4,  category:'hair-care',  tag:'Hair Care',   img: IMG.deepCondition, name:'Scalp Treatment',       price:'From ₦7,500',  duration:'45 min',      desc:'Targeted scalp therapy to address dryness, buildup, or sensitivity — the foundation of healthy hair.' },
  // ── Braids ──
  { id:5,  category:'braids',     tag:'Braids',      img: IMG.braids,        name:'Knotless Box Braids',   price:'From ₦25,000', duration:'4 – 6 hrs',   desc:'Feed-in technique for a natural root, reduced tension, and a cleaner part. Available in all lengths.' },
  { id:6,  category:'braids',     tag:'Braids',      img: IMG.locs,          name:'Cornrows',              price:'From ₦10,000', duration:'1.5 – 3 hrs', desc:'Classic flat braids styled close to the scalp — straight back, curved, or custom geometric patterns.' },
  { id:7,  category:'braids',     tag:'Braids',      img: IMG.braids,        name:'Fulani Braids',         price:'From ₦20,000', duration:'3 – 5 hrs',   desc:'Signature centre-part cornrows with loose braids and beaded accents for a statement protective style.' },
  { id:8,  category:'braids',     tag:'Braids',      img: IMG.locs,          name:'Goddess Braids',        price:'From ₦22,000', duration:'3 – 4 hrs',   desc:'Oversized, flowing braids with soft wavy ends for a bold, feminine finish that lasts for weeks.' },
  { id:9,  category:'braids',     tag:'Braids',      img: IMG.braids,        name:'Micro Braids',          price:'From ₦35,000', duration:'6 – 8 hrs',   desc:'Ultra-fine individual braids for maximum versatility and a lightweight, long-lasting protective style.' },
  // ── Colour ──
  { id:10, category:'colour',     tag:'Colour',      img: IMG.colour,        name:'Full Colour',           price:'From ₦18,000', duration:'2 – 3 hrs',   desc:'All-over colour application with professional-grade tints, tailored to your skin tone and lifestyle.' },
  { id:11, category:'colour',     tag:'Colour',      img: IMG.colour,        name:'Balayage',              price:'From ₦25,000', duration:'2.5 – 4 hrs', desc:'Hand-painted highlights for a sun-kissed, natural gradient that grows out beautifully with minimal upkeep.' },
  { id:12, category:'colour',     tag:'Colour',      img: IMG.colour,        name:'Highlights & Lowlights',price:'From ₦20,000', duration:'2 – 3 hrs',   desc:'Dimensional colour using foils to add depth, contrast, and movement throughout your hair.' },
  // ── Relaxer ──
  { id:13, category:'relaxer',    tag:'Relaxer',     img: IMG.silkPress,     name:'Relaxer Application',   price:'From ₦12,000', duration:'2 – 2.5 hrs', desc:'Professional chemical relaxer applied with precision to straighten and smooth, with scalp protection throughout.' },
  { id:14, category:'relaxer',    tag:'Relaxer',     img: IMG.silkPress,     name:'Relaxer Touch-Up',      price:'From ₦9,000',  duration:'1.5 – 2 hrs', desc:'New growth only application to maintain your relaxed style, keeping the hair smooth and manageable.' },
  // ── Treatments ──
  { id:15, category:'treatments', tag:'Treatments',  img: IMG.deepCondition, name:'Keratin Treatment',     price:'From ₦30,000', duration:'2.5 – 3.5 hrs',desc:'Smoothing protein treatment that eliminates frizz, adds shine, and cuts styling time for up to 4 months.' },
  { id:16, category:'treatments', tag:'Treatments',  img: IMG.deepCondition, name:'Deep Conditioning',     price:'From ₦6,000',  duration:'45 – 60 min', desc:'Intensive moisture and protein masque treatment to restore elasticity, softness, and shine.' },
  { id:17, category:'treatments', tag:'Treatments',  img: IMG.deepCondition, name:'Olaplex Treatment',     price:'From ₦8,500',  duration:'30 – 45 min', desc:'Bond-building treatment that repairs and strengthens damaged hair from the inside out.' },
  { id:18, category:'treatments', tag:'Treatments',  img: IMG.deepCondition, name:'Hot Oil Treatment',     price:'From ₦5,000',  duration:'30 min',      desc:'Warm oil infusion to nourish the scalp, seal the cuticle, and restore natural lustre to dry or brittle hair.' },
];

const ICONS = {
  'hair-care': `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c0 0-4 3-4 7a4 4 0 008 0c0-4-4-7-4-7z"/><path d="M9 17v1a3 3 0 006 0v-1"/></svg>`,
  braids:      `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3c0 9 4 12 6 12s6-3 6-12"/><path d="M9 9c0 5 1.5 8 3 8s3-3 3-8"/><path d="M12 17v4"/></svg>`,
  colour:      `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M6 20V10l6-7 6 7v10"/><path d="M10 20v-5h4v5"/></svg>`,
  relaxer:     `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>`,
  treatments:  `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/></svg>`,
};

const PER_PAGE = 9;
let currentPage = 1;
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initFilterTabs();
  renderAll();
  initPricingReveal();
});

/* ─────────────────────────────────────────
   Filter Tabs
───────────────────────────────────────── */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const tabsContainer = document.querySelector('.filter-tabs');
  if (!tabs.length || !tabsContainer) return;

  // Sliding pill
  const pill = document.createElement('div');
  pill.className = 'filter-tab-pill';
  tabsContainer.appendChild(pill);

  // Inject line + count into each tab
  tabs.forEach((tab) => {
    const line = document.createElement('span');
    line.className = 'filter-tab-line';
    tab.appendChild(line);

    const count = document.createElement('span');
    count.className = 'filter-tab-count';
    count.textContent = getFilterCount(tab.dataset.filter);
    tab.appendChild(count);
  });

  function movePill(activeTab) {
    // Use offsetLeft/offsetWidth — relative to the scroll container, not the viewport
    pill.style.left  = activeTab.offsetLeft + 'px';
    pill.style.width = activeTab.offsetWidth + 'px';
  }

  // Initial position — no animation on first paint
  const initial = document.querySelector('.filter-tab.active');
  if (initial) {
    pill.style.transition = 'none';
    movePill(initial);
    requestAnimationFrame(() => { pill.style.transition = ''; });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      movePill(tab);
      // Scroll the active tab into view within the container
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      activeFilter = tab.dataset.filter;
      currentPage = 1;
      renderAll();
    });
  });

  window.addEventListener('resize', () => {
    const active = document.querySelector('.filter-tab.active');
    if (active) {
      pill.style.transition = 'none';
      movePill(active);
      requestAnimationFrame(() => { pill.style.transition = ''; });
    }
  });
}

/* ─────────────────────────────────────────
   Render Grid + Pagination
───────────────────────────────────────── */
function renderAll() {
  const filtered = activeFilter === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeFilter);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  currentPage = Math.min(currentPage, totalPages || 1);

  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  renderCards(pageItems, filtered.length);
  renderPagination(totalPages);
}

function renderCards(items, total) {
  const grid  = document.getElementById('svc-grid');
  const empty = document.getElementById('svc-empty');
  const count = document.getElementById('svc-count');

  if (!grid) return;

  count.textContent = total;

  if (!items.length) {
    grid.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  grid.innerHTML = items.map((s, i) => `
    <article class="svc-card" role="listitem" style="animation-delay:${i * 0.06}s" data-category="${s.category}">
      <div class="svc-card-strip">
        <img src="${s.img}" alt="${s.name}" class="svc-strip-img" loading="lazy" />
        <div class="svc-strip-overlay"></div>
        <div class="svc-strip-icon">
          ${ICONS[s.category] || ICONS['hair-care']}
        </div>
        <span class="svc-strip-line"></span>
      </div>
      <div class="svc-card-body">
        <span class="svc-card-tag">${s.tag}</span>
        <h3 class="svc-card-name">${s.name}</h3>
        <p class="svc-card-desc">${s.desc}</p>
        <div class="svc-card-footer">
          <div>
            <p class="svc-card-price">${s.price}</p>
            <p class="svc-card-duration">${s.duration}</p>
          </div>
          <a href="/pages/booking.html" class="svc-card-book" aria-label="Book ${s.name}">
            Book
            <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

function renderPagination(totalPages) {
  const nav = document.getElementById('svc-pagination');
  if (!nav) return;

  if (totalPages <= 1) { nav.innerHTML = ''; return; }

  const pages = getPaginationRange(currentPage, totalPages);

  nav.innerHTML = `
    <button class="svc-page-btn svc-page-prev" aria-label="Previous page" ${currentPage === 1 ? 'disabled' : ''}>
      <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 4L6 8l4 4"/></svg>
    </button>
    <div class="svc-page-numbers">
      ${pages.map(p => p === '…'
        ? `<span class="svc-page-ellipsis">…</span>`
        : `<button class="svc-page-btn svc-page-num ${p === currentPage ? 'active' : ''}" data-page="${p}" aria-label="Page ${p}" aria-current="${p === currentPage ? 'page' : 'false'}">${p}</button>`
      ).join('')}
    </div>
    <button class="svc-page-btn svc-page-next" aria-label="Next page" ${currentPage === totalPages ? 'disabled' : ''}>
      <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg>
    </button>
  `;

  nav.querySelector('.svc-page-prev').addEventListener('click', () => goToPage(currentPage - 1));
  nav.querySelector('.svc-page-next').addEventListener('click', () => goToPage(currentPage + 1));
  nav.querySelectorAll('.svc-page-num').forEach(btn => {
    btn.addEventListener('click', () => goToPage(Number(btn.dataset.page)));
  });
}

function goToPage(page) {
  const filtered = activeFilter === 'all' ? SERVICES : SERVICES.filter(s => s.category === activeFilter);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderAll();
  // Scroll to grid top
  const grid = document.getElementById('svc-grid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Smart pagination range: always show first, last, current ±1, with ellipsis
function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const range = new Set([1, total, current, current - 1, current + 1].filter(p => p >= 1 && p <= total));
  const sorted = [...range].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…');
    result.push(sorted[i]);
  }
  return result;
}

function getFilterCount(filter) {
  if (filter === 'all') return SERVICES.length;
  return SERVICES.filter(s => s.category === filter).length;
}

/* ─────────────────────────────────────────
   Pricing Block Scroll Reveal
───────────────────────────────────────── */
function initPricingReveal() {
  const blocks = document.querySelectorAll('.pricing-block[data-reveal]');
  if (!blocks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger each block slightly
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  blocks.forEach(block => observer.observe(block));
}
