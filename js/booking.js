/* ═══════════════════════════════════════════════════════════════
   VELOUR — Booking: 6-step form controller
   ═══════════════════════════════════════════════════════════════ */

const BK_SERVICES = [
  { id:1,  category:'hair-care',  tag:'Hair Care',  name:'Silk Press',             price:'From ₦15,000', duration:'2 – 2.5 hrs' },
  { id:2,  category:'hair-care',  tag:'Hair Care',  name:'Blow Dry & Style',       price:'From ₦8,000',  duration:'1 – 1.5 hrs' },
  { id:3,  category:'hair-care',  tag:'Hair Care',  name:'Wash & Condition',       price:'From ₦5,000',  duration:'45 – 60 min' },
  { id:4,  category:'hair-care',  tag:'Hair Care',  name:'Scalp Treatment',        price:'From ₦7,500',  duration:'45 min'      },
  { id:5,  category:'braids',     tag:'Braids',     name:'Knotless Box Braids',    price:'From ₦25,000', duration:'4 – 6 hrs'   },
  { id:6,  category:'braids',     tag:'Braids',     name:'Cornrows',               price:'From ₦10,000', duration:'1.5 – 3 hrs' },
  { id:7,  category:'braids',     tag:'Braids',     name:'Fulani Braids',          price:'From ₦20,000', duration:'3 – 5 hrs'   },
  { id:8,  category:'braids',     tag:'Braids',     name:'Goddess Braids',         price:'From ₦22,000', duration:'3 – 4 hrs'   },
  { id:9,  category:'braids',     tag:'Braids',     name:'Micro Braids',           price:'From ₦35,000', duration:'6 – 8 hrs'   },
  { id:10, category:'colour',     tag:'Colour',     name:'Full Colour',            price:'From ₦18,000', duration:'2 – 3 hrs'   },
  { id:11, category:'colour',     tag:'Colour',     name:'Balayage',               price:'From ₦25,000', duration:'2.5 – 4 hrs' },
  { id:12, category:'colour',     tag:'Colour',     name:'Highlights & Lowlights', price:'From ₦20,000', duration:'2 – 3 hrs'   },
  { id:13, category:'relaxer',    tag:'Relaxer',    name:'Relaxer Application',    price:'From ₦12,000', duration:'2 – 2.5 hrs' },
  { id:14, category:'relaxer',    tag:'Relaxer',    name:'Relaxer Touch-Up',       price:'From ₦9,000',  duration:'1.5 – 2 hrs' },
  { id:15, category:'treatments', tag:'Treatments', name:'Keratin Treatment',      price:'From ₦30,000', duration:'2.5 – 3.5 hrs'},
  { id:16, category:'treatments', tag:'Treatments', name:'Deep Conditioning',      price:'From ₦6,000',  duration:'45 – 60 min' },
  { id:17, category:'treatments', tag:'Treatments', name:'Olaplex Treatment',      price:'From ₦8,500',  duration:'30 – 45 min' },
  { id:18, category:'treatments', tag:'Treatments', name:'Hot Oil Treatment',      price:'From ₦5,000',  duration:'30 min'      },
];

const BK_STYLISTS = [
  { id:'ada',    name:'Adaeze Okonkwo',   role:'Creative Director',     specialty:'Colour & Balayage',    img:'/assets/images/workers/Person 1 — Adaeze (Founder).webp',                          badge:'Founder' },
  { id:'temi',   name:'Temitope Adeyemi', role:'Senior Stylist',        specialty:'Braids & Protective',  img:'/assets/images/workers/Person 2 — Temitope (Senior Stylist — Braids).webp',       badge:null },
  { id:'ngozi',  name:'Ngozi Eze',        role:'Senior Stylist',        specialty:'Silk Press & Relaxer', img:'/assets/images/workers/Person 3 — Ngozi (Senior Stylist — Silk Press).webp',      badge:null },
  { id:'amaka',  name:'Amaka Obi',        role:'Stylist',               specialty:'Treatments & Care',    img:'/assets/images/workers/Person 4 — Amaka (Stylist — Treatments).webp',            badge:'New' },
  { id:'chisom', name:'Chisom Nwosu',     role:'Stylist',               specialty:'Braids & Colour',      img:'/assets/images/workers/Person 5 — Chisom (Stylist — Braids and Colour).webp',    badge:null },
  { id:'any',    name:'No Preference',    role:'Any available stylist', specialty:"We'll match you",      img:'',                                                                                badge:null },
];

const TOTAL_STEPS = 6;

const booking = { branch:null, service:null, stylist:null, date:null, time:null, name:'', phone:'', email:'', notes:'' };

const BRANCH_LABELS = { vi:'Victoria Island, Lagos', lekki:'Lekki Phase 1, Lagos', abuja:'Wuse 2, Abuja' };

let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
  initStep1();
  initStep2();
  initStep3();
  initStep4();
  initStep5();
  initStep6();
  updateProgress(1);
});

/* ── Progress bar ── */
function updateProgress(step) {
  const fill = document.getElementById('bk-progress-fill');
  if (fill) fill.style.width = `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%`;
  document.querySelectorAll('.bk-step').forEach((el) => {
    const s = Number(el.dataset.step);
    el.classList.remove('is-active', 'is-done');
    if (s === step) el.classList.add('is-active');
    if (s < step)   el.classList.add('is-done');
  });
}

/* ── Panel navigation ── */
function goToStep(step) {
  const prev = document.getElementById(`bk-step-${currentStep}`);
  const next = document.getElementById(`bk-step-${step}`);
  if (!prev || !next) return;
  prev.hidden = true;
  next.hidden = false;
  currentStep = step;
  updateProgress(step);
  next.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ══ STEP 1 — Branch ══ */
function initStep1() {
  const cards   = document.querySelectorAll('.bk-branch-card');
  const nextBtn = document.getElementById('bk-step1-next');
  const hint    = document.getElementById('bk-branch-hint');

  cards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'radio');
    card.setAttribute('aria-checked', 'false');
    card.addEventListener('click', () => {
      cards.forEach(c => { c.classList.remove('is-selected'); c.querySelector('input').checked = false; c.setAttribute('aria-checked','false'); });
      card.classList.add('is-selected');
      const radio = card.querySelector('input[type="radio"]');
      radio.checked = true;
      card.setAttribute('aria-checked', 'true');
      booking.branch = radio.value;
      if (hint) { hint.textContent = `Selected: ${BRANCH_LABELS[booking.branch]}`; hint.classList.add('is-selected'); }
      if (nextBtn) nextBtn.disabled = false;
    });
    card.addEventListener('keydown', e => { if (e.key===' '||e.key==='Enter') { e.preventDefault(); card.click(); } });
  });

  if (nextBtn) nextBtn.addEventListener('click', () => { if (booking.branch) goToStep(2); });
  const s2b = document.getElementById('bk-step2-back');
  const s3b = document.getElementById('bk-step3-back');
  const s4b = document.getElementById('bk-step4-back');
  const s5b = document.getElementById('bk-step5-back');
  const s6b = document.getElementById('bk-step6-back');
  if (s2b) s2b.addEventListener('click', () => goToStep(1));
  if (s3b) s3b.addEventListener('click', () => goToStep(2));
  if (s4b) s4b.addEventListener('click', () => goToStep(3));
  if (s5b) s5b.addEventListener('click', () => goToStep(4));
  if (s6b) s6b.addEventListener('click', () => goToStep(5));
}

/* ══ STEP 2 — Service ══ */
function initStep2() {
  const list    = document.getElementById('bk-svc-list');
  const paginEl = document.getElementById('bk-svc-pagination');
  const tabs    = document.querySelectorAll('#bk-svc-tabs .bk-svc-tab');
  const nextBtn = document.getElementById('bk-step2-next');
  const hint    = document.getElementById('bk-svc-hint');
  if (!list) return;

  const PER_PAGE = 6;
  let activeCat  = 'all';
  let currentPage = 1;

  function getFiltered() {
    return activeCat === 'all' ? BK_SERVICES : BK_SERVICES.filter(s => s.category === activeCat);
  }

  function renderServices() {
    const filtered   = getFiltered();
    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    currentPage      = Math.min(currentPage, totalPages || 1);
    const pageItems  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    list.innerHTML = pageItems.map(s => `
      <label class="bk-svc-row" data-id="${s.id}" data-category="${s.category}">
        <input type="radio" name="bk-service" value="${s.id}" class="sr-only" />
        <div class="bk-svc-row-check" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-7"/></svg>
        </div>
        <div class="bk-svc-row-info">
          <span class="bk-svc-row-tag">${s.tag}</span>
          <p class="bk-svc-row-name">${s.name}</p>
        </div>
        <div class="bk-svc-row-meta">
          <p class="bk-svc-row-price">${s.price}</p>
          <p class="bk-svc-row-dur">${s.duration}</p>
        </div>
      </label>`).join('');

    list.querySelectorAll('.bk-svc-row').forEach(row => {
      row.setAttribute('tabindex', '0');
      row.addEventListener('click', () => selectService(row));
      row.addEventListener('keydown', e => { if (e.key===' '||e.key==='Enter') { e.preventDefault(); selectService(row); } });
    });

    // Re-highlight if already selected
    if (booking.service) {
      const m = list.querySelector(`.bk-svc-row[data-id="${booking.service}"]`);
      if (m) m.classList.add('is-selected');
    }

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!paginEl) return;
    if (totalPages <= 1) { paginEl.innerHTML = ''; return; }

    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    paginEl.innerHTML = `
      <button class="bk-page-btn bk-page-prev" aria-label="Previous page" ${currentPage === 1 ? 'disabled' : ''}>
        <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 4L6 8l4 4"/></svg>
      </button>
      ${pages.map(p => `
        <button class="bk-page-btn bk-page-num ${p === currentPage ? 'is-active' : ''}" data-page="${p}" aria-label="Page ${p}" aria-current="${p === currentPage ? 'page' : 'false'}">${p}</button>
      `).join('')}
      <button class="bk-page-btn bk-page-next" aria-label="Next page" ${currentPage === totalPages ? 'disabled' : ''}>
        <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg>
      </button>`;

    paginEl.querySelector('.bk-page-prev').addEventListener('click', () => goPage(currentPage - 1));
    paginEl.querySelector('.bk-page-next').addEventListener('click', () => goPage(currentPage + 1));
    paginEl.querySelectorAll('.bk-page-num').forEach(btn => {
      btn.addEventListener('click', () => goPage(Number(btn.dataset.page)));
    });
  }

  function goPage(p) {
    const total = Math.ceil(getFiltered().length / PER_PAGE);
    if (p < 1 || p > total) return;
    currentPage = p;
    renderServices();
    list.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function selectService(row) {
    list.querySelectorAll('.bk-svc-row').forEach(r => { r.classList.remove('is-selected'); r.querySelector('input').checked = false; });
    row.classList.add('is-selected');
    row.querySelector('input').checked = true;
    booking.service = Number(row.dataset.id);
    const svc = BK_SERVICES.find(s => s.id === booking.service);
    if (hint && svc) { hint.textContent = `Selected: ${svc.name}`; hint.classList.add('is-selected'); }
    if (nextBtn) nextBtn.disabled = false;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('is-active'); tab.setAttribute('aria-selected','true');
      activeCat = tab.dataset.cat;
      currentPage = 1;
      renderServices();
    });
  });

  renderServices();
  if (nextBtn) nextBtn.addEventListener('click', () => { if (booking.service) goToStep(3); });
}

/* ══ STEP 3 — Stylist ══ */
function initStep3() {
  const grid    = document.getElementById('bk-stylist-grid');
  const nextBtn = document.getElementById('bk-step3-next');
  const hint    = document.getElementById('bk-stylist-hint');
  if (!grid) return;

  grid.innerHTML = BK_STYLISTS.map(st => `
    <label class="bk-stylist-card" data-id="${st.id}">
      <input type="radio" name="bk-stylist" value="${st.id}" class="sr-only" />
      <div class="bk-stylist-img-wrap">
        ${st.img
          ? `<img src="${st.img}" alt="${st.name}" loading="lazy" />`
          : `<div class="bk-stylist-any-icon" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="15" r="7"/><path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14"/></svg></div>`}
        ${st.badge ? `<span class="bk-stylist-badge">${st.badge}</span>` : ''}
        <span class="bk-stylist-check" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-7"/></svg>
        </span>
      </div>
      <div class="bk-stylist-body">
        <p class="bk-stylist-name">${st.name}</p>
        <p class="bk-stylist-role">${st.role}</p>
        <p class="bk-stylist-spec">${st.specialty}</p>
      </div>
    </label>`).join('');

  const cards = grid.querySelectorAll('.bk-stylist-card');
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => selectStylist(card));
    card.addEventListener('keydown', e => { if (e.key===' '||e.key==='Enter') { e.preventDefault(); selectStylist(card); } });
  });

  function selectStylist(card) {
    cards.forEach(c => { c.classList.remove('is-selected'); c.querySelector('input').checked = false; });
    card.classList.add('is-selected'); card.querySelector('input').checked = true;
    booking.stylist = card.dataset.id;
    const st = BK_STYLISTS.find(s => s.id === booking.stylist);
    if (hint && st) { hint.textContent = st.id==='any' ? "No preference — we'll match you" : `Selected: ${st.name}`; hint.classList.add('is-selected'); }
    if (nextBtn) nextBtn.disabled = false;
  }
  if (nextBtn) nextBtn.addEventListener('click', () => { if (booking.stylist) goToStep(4); });
}

/* ══ STEP 4 — Date & Time ══ */
function initStep4() {
  const nextBtn = document.getElementById('bk-step4-next');
  const hint    = document.getElementById('bk-datetime-hint');

  // Defer calendar build until step 4 is actually shown
  const step4Panel = document.getElementById('bk-step-4');
  let calendarBuilt = false;

  function ensureCalendar() {
    if (calendarBuilt) return;
    calendarBuilt = true;
    buildCalendar();
  }

  // Observe when step 4 becomes visible
  const observer = new MutationObserver(() => {
    if (step4Panel && !step4Panel.hidden) ensureCalendar();
  });
  if (step4Panel) observer.observe(step4Panel, { attributes: true, attributeFilter: ['hidden'] });
  // Also try immediately in case it's already visible
  if (step4Panel && !step4Panel.hidden) ensureCalendar();

  function pad(n) { return String(n).padStart(2,'0'); }
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function buildCalendar() {
    const calEl = document.getElementById('bk-calendar');
    if (!calEl) return;
    const today = new Date();
    let viewYear = today.getFullYear(), viewMonth = today.getMonth();
    // today at midnight for clean string comparison
    const todayStr = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;

    function render() {
      const firstDay = new Date(viewYear, viewMonth, 1).getDay();
      const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
      const isCurrent = viewYear===today.getFullYear() && viewMonth===today.getMonth();
      calEl.innerHTML = `
        <div class="bk-cal-header">
          <button class="bk-cal-nav" id="bk-cal-prev" aria-label="Previous month" ${isCurrent?'disabled':''}>
            <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4L6 8l4 4"/></svg>
          </button>
          <p class="bk-cal-month">${MONTHS[viewMonth]} ${viewYear}</p>
          <button class="bk-cal-nav" id="bk-cal-next" aria-label="Next month">
            <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>
          </button>
        </div>
        <div class="bk-cal-grid" role="grid">
          <div class="bk-cal-dow">Su</div><div class="bk-cal-dow">Mo</div><div class="bk-cal-dow">Tu</div>
          <div class="bk-cal-dow">We</div><div class="bk-cal-dow">Th</div><div class="bk-cal-dow">Fr</div><div class="bk-cal-dow">Sa</div>
          ${Array.from({length:firstDay},()=>'<div class="bk-cal-empty"></div>').join('')}
          ${Array.from({length:daysInMonth},(_,i)=>{
            const d = i+1;
            const dateStr = `${viewYear}-${pad(viewMonth+1)}-${pad(d)}`;
            // Use actual day-of-week: 0 = Sunday
            const dow = new Date(viewYear, viewMonth, d).getDay();
            const isPast = dateStr < todayStr;
            const isSunday = dow === 0;
            const disabled = isPast || isSunday;
            const sel = booking.date === dateStr;
            return `<button class="bk-cal-day${disabled?' is-disabled':''}${sel?' is-selected':''}" data-date="${dateStr}" ${disabled?'disabled':''} role="gridcell" aria-label="${MONTHS[viewMonth]} ${d}">${d}</button>`;
          }).join('')}
        </div>`;
      calEl.querySelector('#bk-cal-prev').addEventListener('click', ()=>{ viewMonth--; if(viewMonth<0){viewMonth=11;viewYear--;} render(); });
      calEl.querySelector('#bk-cal-next').addEventListener('click', ()=>{ viewMonth++; if(viewMonth>11){viewMonth=0;viewYear++;} render(); });
      calEl.querySelectorAll('.bk-cal-day:not(.is-disabled)').forEach(btn=>{
        btn.addEventListener('click', ()=>{ booking.date=btn.dataset.date; render(); buildTimeSlots(); updateHint(); });
      });
    }
    render();
  }

  function buildTimeSlots() {
    const wrap = document.getElementById('bk-time-slots');
    if (!wrap) return;
    const slots = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM'];
    const unavail = new Set([2,5,8]);
    wrap.innerHTML = `<p class="bk-time-label">Available times</p>
      <div class="bk-time-grid" role="radiogroup">
        ${slots.map((t,i)=>{
          const off=unavail.has(i), sel=booking.time===t;
          return `<button class="bk-time-slot${off?' is-unavail':''}${sel?' is-selected':''}" data-time="${t}" ${off?'disabled':''} role="radio" aria-checked="${sel}">${t}</button>`;
        }).join('')}
      </div>`;
    wrap.querySelectorAll('.bk-time-slot:not(.is-unavail)').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        booking.time=btn.dataset.time;
        wrap.querySelectorAll('.bk-time-slot').forEach(b=>{ b.classList.remove('is-selected'); b.setAttribute('aria-checked','false'); });
        btn.classList.add('is-selected'); btn.setAttribute('aria-checked','true');
        updateHint();
      });
    });
  }

  function updateHint() {
    if (!booking.date||!booking.time) return;
    const [y,m,d]=booking.date.split('-');
    const mo=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    if (hint) { hint.textContent=`Selected: ${mo[Number(m)-1]} ${Number(d)}, ${y} at ${booking.time}`; hint.classList.add('is-selected'); }
    if (nextBtn) nextBtn.disabled=false;
  }
  if (nextBtn) nextBtn.addEventListener('click', ()=>{ if(booking.date&&booking.time) goToStep(5); });
}

/* ══ STEP 5 — Details ══ */
function initStep5() {
  const nextBtn = document.getElementById('bk-step5-next');
  const hint    = document.getElementById('bk-details-hint');

  function validate() {
    const name  = document.getElementById('bk-name');
    const phone = document.getElementById('bk-phone');
    const email = document.getElementById('bk-email');
    let valid = true;

    // Name
    const nameErr = document.getElementById('bk-name-err');
    if (!name.value.trim() || name.value.trim().length < 2) {
      name.classList.add('is-error'); nameErr.hidden = false; valid = false;
    } else { name.classList.remove('is-error'); nameErr.hidden = true; }

    // Phone — at least 7 digits
    const phoneErr = document.getElementById('bk-phone-err');
    if (!/^\d{7,}$/.test(phone.value.replace(/\s/g,''))) {
      phone.classList.add('is-error'); phoneErr.hidden = false; valid = false;
    } else { phone.classList.remove('is-error'); phoneErr.hidden = true; }

    // Email
    const emailErr = document.getElementById('bk-email-err');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add('is-error'); emailErr.hidden = false; valid = false;
    } else { email.classList.remove('is-error'); emailErr.hidden = true; }

    return valid;
  }

  // Live clear errors on input
  ['bk-name','bk-phone','bk-email'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => { el.classList.remove('is-error'); document.getElementById(`${id}-err`).hidden = true; });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!validate()) return;
      booking.name  = document.getElementById('bk-name').value.trim();
      booking.phone = document.getElementById('bk-phone').value.trim();
      booking.email = document.getElementById('bk-email').value.trim();
      booking.notes = document.getElementById('bk-notes').value.trim();
      if (hint) { hint.textContent = `Ready to review`; hint.classList.add('is-selected'); }
      populateReview();
      goToStep(6);
    });
  }
}

/* ══ STEP 6 — Review & Confirm ══ */
function initStep6() {
  const confirmBtn = document.getElementById('bk-step6-confirm');
  if (confirmBtn) confirmBtn.addEventListener('click', showConfirmation);
}

function populateReview() {
  const card = document.getElementById('bk-review-card');
  if (!card) return;
  const svc = BK_SERVICES.find(s => s.id === booking.service);
  const st  = BK_STYLISTS.find(s => s.id === booking.stylist);
  const [y,m,d] = booking.date.split('-');
  const mo = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateLabel = `${mo[Number(m)-1]} ${Number(d)}, ${y}`;

  card.innerHTML = `
    <div class="bk-review-section">
      <p class="bk-review-section-title">Appointment</p>
      <div class="bk-review-row"><span>Branch</span><strong>${BRANCH_LABELS[booking.branch]}</strong></div>
      <div class="bk-review-row"><span>Service</span><strong>${svc ? svc.name : '—'}</strong></div>
      <div class="bk-review-row"><span>Price</span><strong>${svc ? svc.price : '—'}</strong></div>
      <div class="bk-review-row"><span>Duration</span><strong>${svc ? svc.duration : '—'}</strong></div>
      <div class="bk-review-row"><span>Stylist</span><strong>${st ? st.name : '—'}</strong></div>
      <div class="bk-review-row"><span>Date</span><strong>${dateLabel}</strong></div>
      <div class="bk-review-row"><span>Time</span><strong>${booking.time}</strong></div>
    </div>
    <div class="bk-review-divider"></div>
    <div class="bk-review-section">
      <p class="bk-review-section-title">Your Details</p>
      <div class="bk-review-row"><span>Name</span><strong>${booking.name}</strong></div>
      <div class="bk-review-row"><span>Phone</span><strong>+234 ${booking.phone}</strong></div>
      <div class="bk-review-row"><span>Email</span><strong>${booking.email}</strong></div>
      ${booking.notes ? `<div class="bk-review-row bk-review-row--notes"><span>Notes</span><strong>${booking.notes}</strong></div>` : ''}
    </div>`;
}

function showConfirmation() {
  const panels = document.querySelector('.bk-panels');
  if (!panels) return;
  const svc = BK_SERVICES.find(s => s.id === booking.service);
  const [y,m,d] = booking.date.split('-');
  const mo = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  panels.innerHTML = `
    <div class="bk-confirm" role="region" aria-label="Booking confirmed">
      <div class="bk-confirm-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="24" cy="24" r="20"/><path d="M15 24.5l6 6 12-13"/>
        </svg>
      </div>
      <p class="bk-confirm-eyebrow">You're all set</p>
      <h2 class="bk-confirm-heading">Booking <em>confirmed.</em></h2>
      <p class="bk-confirm-sub">A confirmation has been sent to <strong>${booking.email}</strong>. We'll see you on ${mo[Number(m)-1]} ${Number(d)}, ${y} at ${booking.time}.</p>
      <div class="bk-confirm-actions">
        <a href="/index.html" class="bk-btn-next">Back to Home
          <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
        <a href="/pages/services.html" class="bk-btn-back">View Services</a>
      </div>
    </div>`;

  document.querySelectorAll('.bk-step').forEach(el => { el.classList.remove('is-active'); el.classList.add('is-done'); });
  const fill = document.getElementById('bk-progress-fill');
  if (fill) fill.style.width = '100%';
}
