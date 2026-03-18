/* ═══════════════════════════════════════════════════════════════
   VELOUR — Coming Soon Overlay
   Drop one <script> tag before </body> on any locked page:
   <script src="/js/coming-soon.js" data-page="shop"></script>
   ═══════════════════════════════════════════════════════════════ */

(function () {
  /* ── Page config ── */
  const PAGES = {
    shop: {
      badge: 'Shop',
      badgeColor: 'plum',
      heading: 'The shop is\nalmost ready.',
      sub: 'We\'re stocking the shelves with professional-grade products from the studio. Be the first to know when we launch.',
      eta: 'Launching soon',
      showNotify: true,
    },
    product: {
      badge: 'Product',
      badgeColor: 'gold',
      heading: 'This product\nis coming soon.',
      sub: 'We\'re putting the finishing touches on our product pages. Head back to the shop to browse what\'s available.',
      eta: 'Coming soon',
      showNotify: true,
    },
    cart: {
      badge: 'Cart',
      badgeColor: 'plum',
      heading: 'Cart is\nnot ready yet.',
      sub: 'Our shop and cart are still being built. Check back soon — the full Velour product experience is on its way.',
      eta: 'Coming soon',
      showNotify: false,
    },
    checkout: {
      badge: 'Checkout',
      badgeColor: 'gold',
      heading: 'Checkout is\nbeing built.',
      sub: 'Secure payments and a seamless checkout experience are on the way. We\'ll notify you the moment it\'s live.',
      eta: 'Coming soon',
      showNotify: true,
    },
    order: {
      badge: 'Orders',
      badgeColor: 'green',
      heading: 'Order tracking\nis coming soon.',
      sub: 'Your order history and tracking will live here. We\'re building it now — it won\'t be long.',
      eta: 'Coming soon',
      showNotify: false,
    },
  };

  /* ── Resolve which page we're on ── */
  const script = document.currentScript ||
    document.querySelector('script[data-page]');
  const pageKey = script ? script.getAttribute('data-page') : null;
  const config = PAGES[pageKey];
  if (!config) return; // no config = don't show overlay

  /* ── Inject styles ── */
  const style = document.createElement('style');
  style.textContent = `
    /* ── Base (mobile-first) ── */
    .cs-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #0D0A0E;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px;
      overflow-y: auto;
      overflow-x: hidden;
      font-family: 'Outfit', sans-serif;
      box-sizing: border-box;
    }

    /* grain */
    .cs-overlay::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
      z-index: 0;
    }

    /* orbs — small on mobile */
    .cs-orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(60px);
      pointer-events: none;
      z-index: 0;
    }
    .cs-orb--a {
      width: 260px; height: 260px;
      background: rgba(107,63,94,0.2);
      top: -80px; left: -80px;
    }
    .cs-orb--b {
      width: 220px; height: 220px;
      background: rgba(201,169,110,0.13);
      bottom: -60px; right: -60px;
    }

    /* accent lines — decorative only, must not block clicks */
    .cs-line {
      position: fixed;
      left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,169,110,0.25) 50%, transparent);
      z-index: 1;
      pointer-events: none;
    }
    .cs-line--top { top: 0; }
    .cs-line--bottom { bottom: 0; }

    /* logo */
    .cs-logo {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      margin-bottom: 20px;
      flex-shrink: 0;
    }
    .cs-logo-word {
      font-family: 'Fraunces', serif;
      font-size: 1rem;
      font-weight: 300;
      color: rgba(245,239,230,0.9);
      letter-spacing: 0.02em;
      line-height: 1;
    }
    .cs-logo-sub {
      font-size: 7px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(245,239,230,0.3);
    }

    /* card */
    .cs-card {
      position: relative;
      z-index: 2;
      pointer-events: auto;
      width: 100%;
      max-width: 420px;
      background: rgba(26,18,32,0.88);
      border: 1px solid rgba(201,169,110,0.15);
      border-radius: 20px;
      padding: 28px 20px 24px;
      text-align: center;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset;
      box-sizing: border-box;
    }

    /* gold top accent on card */
    .cs-card::before {
      content: '';
      position: absolute;
      top: 0; left: 20%; right: 20%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,169,110,0.6) 50%, transparent);
      border-radius: 1px;
    }

    /* badge */
    .cs-badge {
      display: inline-flex;
      align-items: center;
      padding: 3px 12px;
      border-radius: 100px;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }
    .cs-badge--plum {
      background: rgba(107,63,94,0.25);
      border: 0.5px solid rgba(107,63,94,0.5);
      color: #c49ab8;
    }
    .cs-badge--gold {
      background: rgba(201,169,110,0.15);
      border: 0.5px solid rgba(201,169,110,0.4);
      color: #C9A96E;
    }
    .cs-badge--green {
      background: rgba(52,168,83,0.12);
      border: 0.5px solid rgba(52,168,83,0.35);
      color: #6fcf97;
    }

    /* lock icon */
    .cs-lock {
      width: 44px; height: 44px;
      border-radius: 14px;
      background: rgba(201,169,110,0.08);
      border: 1px solid rgba(201,169,110,0.2);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 16px;
      animation: csPulse 2.8s ease-in-out infinite;
      flex-shrink: 0;
    }
    .cs-lock svg {
      width: 18px; height: 18px;
      stroke: #C9A96E;
      stroke-width: 1.6;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    @keyframes csPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(201,169,110,0); }
      50%       { box-shadow: 0 0 0 8px rgba(201,169,110,0.08); }
    }

    /* eyebrow */
    .cs-eyebrow {
      font-size: 9px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 600;
      color: #C9A96E;
      margin-bottom: 10px;
    }

    /* heading */
    .cs-heading {
      font-family: 'Fraunces', serif;
      font-size: clamp(22px, 6vw, 34px);
      font-weight: 300;
      color: #F5EFE6;
      line-height: 1.15;
      white-space: pre-line;
      margin-bottom: 12px;
    }

    /* sub */
    .cs-sub {
      font-size: 13px;
      color: rgba(245,239,230,0.5);
      line-height: 1.65;
      margin: 0 auto 16px;
    }

    /* eta pill */
    .cs-eta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 100px;
      background: rgba(201,169,110,0.08);
      border: 0.5px solid rgba(201,169,110,0.2);
      font-size: 10px;
      font-weight: 500;
      color: rgba(245,239,230,0.55);
      letter-spacing: 0.05em;
      margin-bottom: 18px;
    }
    .cs-eta-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #C9A96E;
      flex-shrink: 0;
      animation: csDotPulse 1.8s ease-in-out infinite;
    }
    @keyframes csDotPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }

    /* divider */
    .cs-divider {
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin: 0 0 18px;
    }

    /* notify form — stacked on mobile */
    .cs-notify {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }
    .cs-notify-input {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 11px 14px;
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      color: #F5EFE6;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s ease;
      -webkit-appearance: none;
    }
    .cs-notify-input::placeholder { color: rgba(245,239,230,0.3); }
    .cs-notify-input:focus { border-color: rgba(201,169,110,0.45); }
    .cs-notify-btn {
      width: 100%;
      padding: 12px 18px;
      border-radius: 10px;
      background: linear-gradient(135deg, #C9A96E, #b8924f);
      border: none;
      font-family: 'Outfit', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #1a0f17;
      cursor: pointer;
      transition: opacity 0.2s ease, transform 0.15s ease;
      -webkit-appearance: none;
    }
    .cs-notify-btn:hover { opacity: 0.88; }
    .cs-notify-btn:active { transform: scale(0.98); }
    .cs-notify-success {
      font-size: 12px;
      color: #6fcf97;
      margin-bottom: 16px;
      display: none;
    }
    .cs-notify-success.is-visible { display: block; }

    /* back link */
    .cs-back {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
      font-weight: 500;
      color: rgba(245,239,230,0.4);
      text-decoration: none;
      letter-spacing: 0.04em;
      transition: color 0.2s ease;
      padding: 4px 0;
    }
    .cs-back:hover { color: rgba(245,239,230,0.75); }
    .cs-back svg {
      width: 13px; height: 13px;
      stroke: currentColor;
      stroke-width: 1.8;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      flex-shrink: 0;
    }

    /* ── Tablet (480px+) ── */
    @media (min-width: 480px) {
      .cs-overlay { padding: 24px; }
      .cs-card { padding: 36px 32px 30px; border-radius: 22px; }
      .cs-logo { margin-bottom: 24px; }
      .cs-logo-word { font-size: 1.1rem; }
      .cs-lock { width: 50px; height: 50px; }
      .cs-lock svg { width: 20px; height: 20px; }
      .cs-sub { font-size: 14px; }
      .cs-notify { flex-direction: row; }
      .cs-notify-input { font-size: 13px; }
      .cs-notify-btn { width: auto; white-space: nowrap; }
    }

    /* ── Desktop (768px+) ── */
    @media (min-width: 768px) {
      .cs-overlay { padding: 40px 24px; }
      .cs-logo { position: absolute; top: 32px; left: 50%; transform: translateX(-50%); margin-bottom: 0; }
      .cs-card { padding: 40px 36px 36px; border-radius: 24px; max-width: 460px; }
      .cs-orb--a { width: 500px; height: 500px; filter: blur(90px); }
      .cs-orb--b { width: 400px; height: 400px; filter: blur(90px); }
      .cs-lock { width: 52px; height: 52px; }
      .cs-lock svg { width: 22px; height: 22px; }
      .cs-heading { font-size: clamp(26px, 3vw, 36px); }
    }

    /* ── Safeguard: hide cart FAB on locked pages ── */
    body[data-locked-page="true"] #sp-cart-fab {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  /* ── Build overlay HTML ── */
  const notifyHTML = config.showNotify ? `
    <div class="cs-notify">
      <input class="cs-notify-input" id="cs-email" type="email" placeholder="your@email.com" aria-label="Email address" />
      <button class="cs-notify-btn" id="cs-notify-btn">Notify me</button>
    </div>
    <p class="cs-notify-success" id="cs-notify-success">You're on the list. We'll let you know when it's live.</p>
  ` : '';

  const overlay = document.createElement('div');
  overlay.className = 'cs-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Page coming soon');
  overlay.innerHTML = `
    <div class="cs-orb cs-orb--a" aria-hidden="true"></div>
    <div class="cs-orb cs-orb--b" aria-hidden="true"></div>
    <div class="cs-line cs-line--top" aria-hidden="true"></div>
    <div class="cs-line cs-line--bottom" aria-hidden="true"></div>

    <a href="/index.html" class="cs-logo" aria-label="Velour Hair Studio — home">
      <span class="cs-logo-word">Velour</span>
      <span class="cs-logo-sub">Hair Studio</span>
    </a>

    <div class="cs-card">
      <div class="cs-badge cs-badge--${config.badgeColor}">${config.badge}</div>

      <div class="cs-lock" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>

      <p class="cs-eyebrow">Coming Soon</p>
      <h1 class="cs-heading">${config.heading}</h1>
      <p class="cs-sub">${config.sub}</p>

      <div class="cs-eta">
        <span class="cs-eta-dot" aria-hidden="true"></span>
        ${config.eta}
      </div>

      <div class="cs-divider" aria-hidden="true"></div>

      ${notifyHTML}

      <a href="/index.html" class="cs-back">
        <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Back to Velour
      </a>
    </div>
  `;

  /* ── Mount ── */
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // Set locked-page flag for cart.js to detect
  document.body.dataset.lockedPage = 'true';

  /* ── Notify form logic ── */
  if (config.showNotify) {
    const btn = overlay.querySelector('#cs-notify-btn');
    const input = overlay.querySelector('#cs-email');
    const success = overlay.querySelector('#cs-notify-success');

    btn.addEventListener('click', () => {
      const email = input.value.trim();
      if (!email || !email.includes('@')) {
        input.focus();
        input.style.borderColor = 'rgba(255,100,100,0.5)';
        setTimeout(() => { input.style.borderColor = ''; }, 1500);
        return;
      }
      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('velour-notify-emails') || '[]');
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem('velour-notify-emails', JSON.stringify(existing));
        }
      } catch(e) {}
      input.value = '';
      success.classList.add('is-visible');
      btn.disabled = true;
      btn.style.opacity = '0.5';
    });
  }
})();
