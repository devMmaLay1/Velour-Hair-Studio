/* ═══════════════════════════════════════════════════════════════
   VELOUR — Checkout Controller
   Depends on: products-data.js, cart.js (loaded before this)
   ═══════════════════════════════════════════════════════════════ */

const DELIVERY_FEES = { standard: 2500, express: 4500 };
const PAYSTACK_KEY  = 'YOUR_PAYSTACK_PUBLIC_KEY_HERE';

let currentStep    = 1;
let deliveryMethod = 'standard';

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  // Redirect to shop if cart is empty
  if (!cart || cart.length === 0) {
    document.querySelector('.ck-steps-col').innerHTML = `
      <div class="ck-empty-state">
        <p>Your cart is empty. Add some products before checking out.</p>
        <a href="/pages/shop.html">
          Browse Shop
          <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
      </div>`;
    return;
  }

  restoreContact();
  restoreDelivery();
  renderSummary();
  initMobileAccordion();
  initStep1();
  initStep2();
  initStep3();
});

/* ════════════════════════════════════════════════════════════════
   STEP NAVIGATION
   ════════════════════════════════════════════════════════════════ */
function goToStep(n) {
  const prev = currentStep;
  currentStep = n;

  // Update progress pills
  [1, 2, 3].forEach(i => {
    const pill = document.getElementById(`ck-prog-${i}`);
    pill.classList.remove('is-active', 'is-done');
    if (i === n) { pill.classList.add('is-active'); pill.setAttribute('aria-current', 'step'); }
    else if (i < n) { pill.classList.add('is-done'); pill.removeAttribute('aria-current'); }
    else { pill.removeAttribute('aria-current'); }
  });

  // Progress lines
  [1, 2].forEach(i => {
    const line = document.getElementById(`ck-prog-line-${i}`);
    line.classList.toggle('is-done', i < n);
  });

  // Cards: open current, collapse others
  [1, 2, 3].forEach(i => {
    const card = document.getElementById(`ck-step-${i}`);
    const body = document.getElementById(`ck-step-${i}-body`);
    card.classList.remove('is-open', 'is-done');

    if (i === n) {
      card.classList.add('is-open');
      body.hidden = false;
    } else {
      body.hidden = true;
      if (i < n) card.classList.add('is-done');
    }
  });

  // Show/hide summaries for completed steps
  if (n > 1) showContactSummary();
  if (n > 2) showDeliverySummary();

  // Scroll to top of steps column
  document.getElementById(`ck-step-${n}`).scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Render order review when reaching payment step
  if (n === 3) renderOrderReview();
}

/* ════════════════════════════════════════════════════════════════
   STEP 1 — CONTACT
   ════════════════════════════════════════════════════════════════ */
function initStep1() {
  document.getElementById('ck-next-1').addEventListener('click', () => {
    if (validateContact()) {
      saveContact();
      goToStep(2);
    }
  });
}

function validateContact() {
  let ok = true;

  const name  = document.getElementById('ck-name');
  const email = document.getElementById('ck-email');
  const phone = document.getElementById('ck-phone');

  // Name
  if (!name.value.trim()) {
    setError('ck-name', 'ck-name-err', 'Please enter your full name.');
    ok = false;
  } else { clearError('ck-name', 'ck-name-err'); }

  // Email
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email.value.trim())) {
    setError('ck-email', 'ck-email-err', 'Please enter a valid email address.');
    ok = false;
  } else { clearError('ck-email', 'ck-email-err'); }

  // Phone — Nigerian formats: 07x, 08x, 09x, +234, 234
  const phoneRx = /^(\+?234|0)[789]\d{9}$/;
  const phoneClean = phone.value.replace(/[\s\-()]/g, '');
  if (!phoneRx.test(phoneClean)) {
    setError('ck-phone', 'ck-phone-err', 'Please enter a valid Nigerian phone number.');
    ok = false;
  } else { clearError('ck-phone', 'ck-phone-err'); }

  return ok;
}

function saveContact() {
  const data = {
    name:  document.getElementById('ck-name').value.trim(),
    email: document.getElementById('ck-email').value.trim(),
    phone: document.getElementById('ck-phone').value.trim(),
  };
  localStorage.setItem('velour-checkout-contact', JSON.stringify(data));
}

function restoreContact() {
  try {
    const saved = JSON.parse(localStorage.getItem('velour-checkout-contact'));
    if (!saved) return;
    if (saved.name)  document.getElementById('ck-name').value  = saved.name;
    if (saved.email) document.getElementById('ck-email').value = saved.email;
    if (saved.phone) document.getElementById('ck-phone').value = saved.phone;
  } catch(e) {}
}

function showContactSummary() {
  try {
    const d = JSON.parse(localStorage.getItem('velour-checkout-contact'));
    if (!d) return;
    const el = document.getElementById('ck-step-1-summary');
    el.innerHTML = `${d.name} · ${d.email} · ${d.phone}
      <button onclick="goToStep(1)" aria-label="Edit contact information">Edit</button>`;
    el.hidden = false;
  } catch(e) {}
}

/* ════════════════════════════════════════════════════════════════
   STEP 2 — DELIVERY
   ════════════════════════════════════════════════════════════════ */
function initStep2() {
  document.getElementById('ck-back-2').addEventListener('click', () => goToStep(1));
  document.getElementById('ck-next-2').addEventListener('click', () => {
    if (validateDelivery()) {
      saveDelivery();
      goToStep(3);
    }
  });

  // Delivery method change → update summary
  document.querySelectorAll('input[name="ck-delivery"]').forEach(radio => {
    radio.addEventListener('change', () => {
      deliveryMethod = radio.value;
      renderSummary();
    });
  });
}

function validateDelivery() {
  let ok = true;

  const addr1  = document.getElementById('ck-addr1');
  const city   = document.getElementById('ck-city');
  const state  = document.getElementById('ck-state');

  if (!addr1.value.trim()) {
    setError('ck-addr1', 'ck-addr1-err', 'Please enter your address.');
    ok = false;
  } else { clearError('ck-addr1', 'ck-addr1-err'); }

  if (!city.value.trim()) {
    setError('ck-city', 'ck-city-err', 'Please enter your city.');
    ok = false;
  } else { clearError('ck-city', 'ck-city-err'); }

  if (!state.value) {
    setError('ck-state', 'ck-state-err', 'Please select your state.');
    ok = false;
  } else { clearError('ck-state', 'ck-state-err'); }

  return ok;
}

function saveDelivery() {
  const method = document.querySelector('input[name="ck-delivery"]:checked')?.value || 'standard';
  deliveryMethod = method;
  const data = {
    address1: document.getElementById('ck-addr1').value.trim(),
    address2: document.getElementById('ck-addr2').value.trim(),
    city:     document.getElementById('ck-city').value.trim(),
    state:    document.getElementById('ck-state').value,
    method,
    fee:      DELIVERY_FEES[method],
  };
  localStorage.setItem('velour-checkout-delivery', JSON.stringify(data));
}

function restoreDelivery() {
  try {
    const saved = JSON.parse(localStorage.getItem('velour-checkout-delivery'));
    if (!saved) return;
    if (saved.address1) document.getElementById('ck-addr1').value = saved.address1;
    if (saved.address2) document.getElementById('ck-addr2').value = saved.address2;
    if (saved.city)     document.getElementById('ck-city').value  = saved.city;
    if (saved.state)    document.getElementById('ck-state').value = saved.state;
    if (saved.method) {
      deliveryMethod = saved.method;
      const radio = document.querySelector(`input[name="ck-delivery"][value="${saved.method}"]`);
      if (radio) radio.checked = true;
    }
  } catch(e) {}
}

function showDeliverySummary() {
  try {
    const d = JSON.parse(localStorage.getItem('velour-checkout-delivery'));
    if (!d) return;
    const el = document.getElementById('ck-step-2-summary');
    const methodLabel = d.method === 'express' ? 'Express Delivery' : 'Standard Delivery';
    el.innerHTML = `${d.address1}${d.address2 ? ', ' + d.address2 : ''}, ${d.city}, ${d.state} · ${methodLabel}
      <button onclick="goToStep(2)" aria-label="Edit delivery details">Edit</button>`;
    el.hidden = false;
  } catch(e) {}
}

/* ════════════════════════════════════════════════════════════════
   STEP 3 — PAYMENT
   ════════════════════════════════════════════════════════════════ */
function initStep3() {
  document.getElementById('ck-back-3').addEventListener('click', () => goToStep(2));
  document.getElementById('ck-pay-btn').addEventListener('click', initiatePayment);
}

function renderOrderReview() {
  const container = document.getElementById('ck-order-review');
  if (!container) return;

  const contact  = safeGet('velour-checkout-contact');
  const delivery = safeGet('velour-checkout-delivery');
  const total    = calculateTotal();

  let itemsHtml = cart.map(c => `
    <div class="ck-review-item-row">
      <span class="ck-review-item-name">
        ${c.product.name}
        <span class="ck-review-item-qty">× ${c.qty}</span>
      </span>
      <span class="ck-review-item-price">₦${(c.product.price * c.qty).toLocaleString()}</span>
    </div>`).join('');

  const methodLabel = delivery?.method === 'express' ? 'Express Delivery (Next day)' : 'Standard Delivery (2–4 days)';
  const fee = DELIVERY_FEES[delivery?.method || 'standard'];

  container.innerHTML = `
    <div class="ck-review-section">
      <p class="ck-review-label">Items</p>
      ${itemsHtml}
    </div>
    <div class="ck-review-section">
      <p class="ck-review-label">Delivery</p>
      <p class="ck-review-value">${methodLabel} — ₦${fee.toLocaleString()}</p>
    </div>
    <div class="ck-review-section">
      <p class="ck-review-label">Ship to</p>
      <p class="ck-review-value">
        ${delivery?.address1 || ''}${delivery?.address2 ? ', ' + delivery.address2 : ''}<br>
        ${delivery?.city || ''}, ${delivery?.state || ''}
      </p>
    </div>
    <div class="ck-review-section">
      <p class="ck-review-label">Total</p>
      <p class="ck-review-value" style="font-size:18px;font-weight:700;color:#C9A96E;">₦${total.toLocaleString()}</p>
    </div>`;

  // Update pay button label
  const label = document.getElementById('ck-pay-total-label');
  if (label) label.textContent = `— ₦${total.toLocaleString()}`;
}

// renderOrderReview is called from goToStep when n === 3

/* ════════════════════════════════════════════════════════════════
   PAYSTACK
   ════════════════════════════════════════════════════════════════ */
function initiatePayment() {
  const contact  = safeGet('velour-checkout-contact');
  const delivery = safeGet('velour-checkout-delivery');

  if (!contact?.email) { goToStep(1); return; }
  if (!delivery?.address1) { goToStep(2); return; }

  const total = calculateTotal();
  const cartSummaryString = cart.map(c => `${c.product.name} x${c.qty}`).join(', ');

  const handler = PaystackPop.setup({
    key:      PAYSTACK_KEY,
    email:    contact.email,
    amount:   total * 100, // kobo
    currency: 'NGN',
    ref:      'VLR-' + Date.now(),
    metadata: {
      custom_fields: [
        { display_name: 'Customer Name', variable_name: 'customer_name', value: contact.name },
        { display_name: 'Phone',         variable_name: 'phone',         value: contact.phone },
        { display_name: 'Items',         variable_name: 'items',         value: cartSummaryString },
      ],
    },
    callback: function(response) {
      if (response.status === 'success') {
        saveCompletedOrder(response.reference);
        clearCart();
        window.location.href = '/pages/order-success.html';
      }
    },
    onClose: function() {
      showPaymentCancelledMessage();
    },
  });

  handler.openIframe();
}

function showPaymentCancelledMessage() {
  const el = document.getElementById('ck-payment-cancelled');
  if (el) { el.hidden = false; el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}

/* ════════════════════════════════════════════════════════════════
   ORDER PERSISTENCE
   ════════════════════════════════════════════════════════════════ */
function saveCompletedOrder(reference) {
  const order = {
    ref:         reference,
    orderNumber: 'VLR-' + Math.floor(Math.random() * 9000 + 1000),
    items:       JSON.parse(localStorage.getItem('velour-cart') || '[]'),
    contact:     safeGet('velour-checkout-contact') || {},
    delivery:    safeGet('velour-checkout-delivery') || {},
    total:       calculateTotal(),
    date:        new Date().toISOString(),
    status:      'confirmed',
  };
  localStorage.setItem('velour-last-order', JSON.stringify(order));
}

function clearCart() {
  localStorage.removeItem('velour-cart');
  cart.length = 0;
  // Reset FAB badge
  const badge = document.getElementById('sp-cart-badge');
  if (badge) { badge.textContent = '0'; badge.hidden = true; }
}

/* ════════════════════════════════════════════════════════════════
   ORDER SUMMARY (sidebar + mobile)
   ════════════════════════════════════════════════════════════════ */
function renderSummary() {
  const subtotal = cart.reduce((s, c) => s + c.product.price * c.qty, 0);
  const fee      = DELIVERY_FEES[deliveryMethod] || DELIVERY_FEES.standard;
  const total    = subtotal + fee;

  // Desktop sidebar items
  const itemsEl = document.getElementById('ck-summary-items');
  if (itemsEl) {
    itemsEl.innerHTML = cart.map(c => `
      <div class="ck-summary-item">
        <img class="ck-summary-item-img" src="${c.product.img}" alt="${c.product.name}" loading="lazy" />
        <div class="ck-summary-item-info">
          <div class="ck-summary-item-name">${c.product.name}</div>
          <div class="ck-summary-item-qty">Qty: ${c.qty}</div>
        </div>
        <span class="ck-summary-item-price">₦${(c.product.price * c.qty).toLocaleString()}</span>
      </div>`).join('');
  }

  // Desktop sidebar lines
  const linesEl = document.getElementById('ck-summary-lines');
  if (linesEl) {
    const methodLabel = deliveryMethod === 'express' ? 'Express Delivery' : 'Standard Delivery';
    linesEl.innerHTML = `
      <div class="ck-summary-line">
        <span class="ck-summary-line-label">Subtotal</span>
        <span class="ck-summary-line-value">₦${subtotal.toLocaleString()}</span>
      </div>
      <div class="ck-summary-line">
        <span class="ck-summary-line-label">${methodLabel}</span>
        <span class="ck-summary-line-value">₦${fee.toLocaleString()}</span>
      </div>
      <div class="ck-summary-line is-total">
        <span class="ck-summary-line-label">Total</span>
        <span class="ck-summary-line-value">₦${total.toLocaleString()}</span>
      </div>`;
  }

  // Mobile accordion items
  const mobileItems = document.getElementById('ck-mobile-items');
  if (mobileItems) {
    mobileItems.innerHTML = cart.map(c => `
      <div class="ck-summary-item">
        <img class="ck-summary-item-img" src="${c.product.img}" alt="${c.product.name}" loading="lazy" />
        <div class="ck-summary-item-info">
          <div class="ck-summary-item-name">${c.product.name}</div>
          <div class="ck-summary-item-qty">Qty: ${c.qty}</div>
        </div>
        <span class="ck-summary-item-price">₦${(c.product.price * c.qty).toLocaleString()}</span>
      </div>`).join('') + `
      <div class="ck-summary-line is-total" style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(245,239,230,0.1);">
        <span class="ck-summary-line-label">Total</span>
        <span class="ck-summary-line-value">₦${total.toLocaleString()}</span>
      </div>`;
  }

  // Mobile total pill
  const mobileTotal = document.getElementById('ck-mobile-total');
  if (mobileTotal) mobileTotal.textContent = `₦${total.toLocaleString()}`;

  // Pay button label
  const payLabel = document.getElementById('ck-pay-total-label');
  if (payLabel) payLabel.textContent = `— ₦${total.toLocaleString()}`;
}

/* ════════════════════════════════════════════════════════════════
   MOBILE ACCORDION
   ════════════════════════════════════════════════════════════════ */
function initMobileAccordion() {
  const trigger = document.getElementById('ck-mobile-summary-trigger');
  const body    = document.getElementById('ck-mobile-summary-body');
  if (!trigger || !body) return;

  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    body.hidden = expanded;
  });
}

/* ════════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════════ */
function calculateTotal() {
  const subtotal = cart.reduce((s, c) => s + c.product.price * c.qty, 0);
  const delivery = safeGet('velour-checkout-delivery');
  const method   = delivery?.method || deliveryMethod || 'standard';
  return subtotal + (DELIVERY_FEES[method] || DELIVERY_FEES.standard);
}

function safeGet(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
}

function setError(inputId, errId, msg) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (input) input.classList.add('is-error');
  if (err)   err.textContent = msg;
}

function clearError(inputId, errId) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (input) input.classList.remove('is-error');
  if (err)   err.textContent = '';
}
