/* ═══════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Checkout Page Logic (Phase 5)
   Handles: form validation, order summary, shipping calculation,
   Paystack payment integration, and order data persistence
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── DOM Refs ──────────────────────────────────────────────── */
  const skeletonEl     = document.getElementById('checkout-skeleton');
  const emptyEl        = document.getElementById('checkout-empty');
  const contentEl      = document.getElementById('checkout-content');

  // Header
  const itemCountEl    = document.getElementById('checkout-item-count');

  // Steps
  const stepsEl        = document.getElementById('checkout-steps');

  // Customer fields
  const firstnameEl    = document.getElementById('checkout-firstname');
  const lastnameEl     = document.getElementById('checkout-lastname');
  const emailEl        = document.getElementById('checkout-email');
  const phoneEl        = document.getElementById('checkout-phone');

  // Delivery fields
  const addressEl      = document.getElementById('checkout-address');
  const cityEl         = document.getElementById('checkout-city');
  const stateEl        = document.getElementById('checkout-state');
  const notesEl        = document.getElementById('checkout-notes');

  // Delivery estimate
  const estimateEl     = document.getElementById('checkout-delivery-estimate');
  const estimateTextEl = document.getElementById('delivery-estimate-text');

  // Summary
  const summaryItemsEl = document.getElementById('checkout-summary-items');
  const subtotalEl     = document.getElementById('checkout-subtotal');
  const shippingEl     = document.getElementById('checkout-shipping');
  const totalEl        = document.getElementById('checkout-total');
  const payAmountEl    = document.getElementById('checkout-pay-amount');
  const payAmountMobEl = document.getElementById('checkout-pay-amount-mobile');

  // Pay buttons
  const payBtn         = document.getElementById('checkout-pay-btn');
  const payBtnMobile   = document.getElementById('checkout-pay-btn-mobile');

  /* ── Config ────────────────────────────────────────────────── */
  const FREE_SHIPPING_THRESHOLD = 20000; // ₦20,000
  const SHIPPING_RATES = {
    'Lagos':   1500,
    'Ogun':    2500,
    'Oyo':     3000,
    'Rivers':  3500,
    'FCT':     3500,
    _default:  4000,
  };

  const DELIVERY_ESTIMATES = {
    'Lagos':   '1–2 business days',
    'Ogun':    '2–3 business days',
    'Oyo':     '2–3 business days',
    'Rivers':  '3–5 business days',
    'FCT':     '3–5 business days',
    _default:  '5–7 business days',
  };

  const STORAGE_KEY = 'velour_checkout_form';

  /* ── State ─────────────────────────────────────────────────── */
  let cart = [];
  let shippingCost = 0;

  /* ═══════════════════════════════════════════════════════════════
     1. INITIALISATION
     ═══════════════════════════════════════════════════════════════ */
  function init() {
    cart = getCart();

    // Simulate brief loading
    setTimeout(() => {
      hideSkeleton();

      if (!cart.length) {
        showEmpty();
        return;
      }

      showContent();
      renderSummary();
      restoreFormData();
      setupValidation();
      setupPayButtons();
      updateSteps();

      // Entrance animation
      requestAnimationFrame(() => {
        contentEl.classList.add('checkout-content-enter');
      });
    }, 400);
  }

  /* ═══════════════════════════════════════════════════════════════
     2. ORDER SUMMARY
     ═══════════════════════════════════════════════════════════════ */
  function renderSummary() {
    // Update item count
    const count = getCartCount();
    if (itemCountEl) {
      itemCountEl.textContent = `${count} item${count !== 1 ? 's' : ''} in your order`;
    }

    // Render items
    if (summaryItemsEl) {
      summaryItemsEl.innerHTML = cart.map(item => {
        const variantText = item.variant ? ` — ${item.variant}` : '';
        return `
          <div class="checkout-summary__item">
            <div class="checkout-summary__item-img">
              <img src="${item.image}" alt="${item.name}" loading="lazy"
                onerror="this.style.display='none'" />
            </div>
            <div class="checkout-summary__item-info">
              <p class="checkout-summary__item-name">${item.name}</p>
              <p class="checkout-summary__item-meta">Qty: ${item.quantity}${variantText}</p>
            </div>
            <span class="checkout-summary__item-price">${formatPrice(item.price * item.quantity)}</span>
          </div>
        `;
      }).join('');
    }

    updateTotals();
  }

  function updateTotals() {
    const subtotal = getCartTotal();

    // Determine shipping
    const selectedState = stateEl ? stateEl.value : '';
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingCost = 0;
    } else if (selectedState && SHIPPING_RATES[selectedState]) {
      shippingCost = SHIPPING_RATES[selectedState];
    } else if (selectedState) {
      shippingCost = SHIPPING_RATES._default;
    } else {
      shippingCost = 0; // Not yet selected
    }

    const total = subtotal + shippingCost;

    // Update UI
    if (subtotalEl)     subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl)     shippingEl.textContent = subtotal >= FREE_SHIPPING_THRESHOLD
                                                   ? 'Free'
                                                   : selectedState
                                                     ? formatPrice(shippingCost)
                                                     : 'Select state';
    if (totalEl)        totalEl.textContent = formatPrice(total);
    if (payAmountEl)    payAmountEl.textContent = formatPrice(total);
    if (payAmountMobEl) payAmountMobEl.textContent = formatPrice(total);

    // Show delivery estimate
    if (selectedState && estimateEl && estimateTextEl) {
      const estimate = DELIVERY_ESTIMATES[selectedState] || DELIVERY_ESTIMATES._default;
      const shippingNote = subtotal >= FREE_SHIPPING_THRESHOLD
        ? 'Free shipping applied!'
        : `Shipping: ${formatPrice(shippingCost)}`;
      estimateTextEl.textContent = `${estimate} • ${shippingNote}`;
      estimateEl.style.display = '';
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     3. FORM VALIDATION
     ═══════════════════════════════════════════════════════════════ */
  const validators = {
    firstname: {
      el: () => firstnameEl,
      errorId: 'error-firstname',
      validate: (v) => v.trim().length >= 2,
      message: 'Please enter your first name (at least 2 characters)',
    },
    lastname: {
      el: () => lastnameEl,
      errorId: 'error-lastname',
      validate: (v) => v.trim().length >= 2,
      message: 'Please enter your last name (at least 2 characters)',
    },
    email: {
      el: () => emailEl,
      errorId: 'error-email',
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Please enter a valid email address',
    },
    phone: {
      el: () => phoneEl,
      errorId: 'error-phone',
      validate: (v) => {
        const cleaned = v.replace(/[\s\-()]/g, '');
        return /^[0-9]{10,11}$/.test(cleaned);
      },
      message: 'Please enter a valid phone number (10-11 digits)',
    },
    address: {
      el: () => addressEl,
      errorId: 'error-address',
      validate: (v) => v.trim().length >= 5,
      message: 'Please enter your delivery address',
    },
    city: {
      el: () => cityEl,
      errorId: 'error-city',
      validate: (v) => v.trim().length >= 2,
      message: 'Please enter your city',
    },
    state: {
      el: () => stateEl,
      errorId: 'error-state',
      validate: (v) => v && v.trim().length > 0,
      message: 'Please select your state',
    },
  };

  function setupValidation() {
    // Validate on blur
    Object.entries(validators).forEach(([key, config]) => {
      const el = config.el();
      if (!el) return;

      el.addEventListener('blur', () => {
        validateField(key);
        saveFormData();
      });

      el.addEventListener('input', () => {
        // Clear error on input
        clearFieldError(key);
        saveFormData();
      });
    });

    // State change recalculates shipping
    if (stateEl) {
      stateEl.addEventListener('change', () => {
        validateField('state');
        updateTotals();
        updateSteps();
        saveFormData();
      });
    }
  }

  function validateField(key) {
    const config = validators[key];
    if (!config) return true;

    const el = config.el();
    if (!el) return true;

    const value = el.value;
    const isValid = config.validate(value);

    if (!isValid) {
      showFieldError(key, config.message);
      return false;
    }

    clearFieldError(key);
    el.classList.add('is-valid');
    return true;
  }

  function showFieldError(key, message) {
    const config = validators[key];
    const el = config.el();
    const errorEl = document.getElementById(config.errorId);

    if (el) {
      el.classList.remove('is-valid');
      el.classList.add('is-error');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('is-visible');
    }
  }

  function clearFieldError(key) {
    const config = validators[key];
    const el = config.el();
    const errorEl = document.getElementById(config.errorId);

    if (el)      el.classList.remove('is-error');
    if (errorEl) errorEl.classList.remove('is-visible');
  }

  function validateAllFields() {
    let allValid = true;
    let firstInvalid = null;

    Object.keys(validators).forEach(key => {
      const isValid = validateField(key);
      if (!isValid && !firstInvalid) {
        firstInvalid = validators[key].el();
      }
      if (!isValid) allValid = false;
    });

    // Scroll to first invalid field
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus();
    }

    return allValid;
  }

  /* ═══════════════════════════════════════════════════════════════
     4. PROGRESS STEPS
     ═══════════════════════════════════════════════════════════════ */
  function updateSteps() {
    if (!stepsEl) return;

    const steps = stepsEl.querySelectorAll('.checkout-step');
    const lines = stepsEl.querySelectorAll('.checkout-step__line');

    // Check which sections are filled
    const customerDone = isCustomerInfoComplete();
    const deliveryDone = isDeliveryInfoComplete();

    steps.forEach(step => {
      step.classList.remove('is-active', 'is-complete');
    });
    lines.forEach(line => {
      line.classList.remove('is-complete');
    });

    if (customerDone && deliveryDone) {
      // Step 3 active, 1 & 2 complete
      steps[0].classList.add('is-complete');
      steps[1].classList.add('is-complete');
      steps[2].classList.add('is-active');
      lines[0].classList.add('is-complete');
      lines[1].classList.add('is-complete');
    } else if (customerDone) {
      // Step 2 active, 1 complete
      steps[0].classList.add('is-complete');
      steps[1].classList.add('is-active');
      lines[0].classList.add('is-complete');
    } else {
      // Step 1 active
      steps[0].classList.add('is-active');
    }
  }

  function isCustomerInfoComplete() {
    return firstnameEl && firstnameEl.value.trim().length >= 2
        && lastnameEl  && lastnameEl.value.trim().length >= 2
        && emailEl     && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())
        && phoneEl     && phoneEl.value.replace(/[\s\-()]/g, '').length >= 10;
  }

  function isDeliveryInfoComplete() {
    return addressEl && addressEl.value.trim().length >= 5
        && cityEl    && cityEl.value.trim().length >= 2
        && stateEl   && stateEl.value.trim().length > 0;
  }

  // Debounced step update on input
  let stepTimeout;
  document.addEventListener('input', () => {
    clearTimeout(stepTimeout);
    stepTimeout = setTimeout(updateSteps, 300);
  });

  /* ═══════════════════════════════════════════════════════════════
     5. FORM DATA PERSISTENCE
     ═══════════════════════════════════════════════════════════════ */
  function saveFormData() {
    try {
      const data = {
        firstname: firstnameEl ? firstnameEl.value : '',
        lastname:  lastnameEl  ? lastnameEl.value  : '',
        email:     emailEl     ? emailEl.value      : '',
        phone:     phoneEl     ? phoneEl.value      : '',
        address:   addressEl   ? addressEl.value    : '',
        city:      cityEl      ? cityEl.value       : '',
        state:     stateEl     ? stateEl.value      : '',
        notes:     notesEl     ? notesEl.value      : '',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // Silent fail — not critical
    }
  }

  function restoreFormData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const data = JSON.parse(raw);
      if (firstnameEl && data.firstname) firstnameEl.value = data.firstname;
      if (lastnameEl  && data.lastname)  lastnameEl.value  = data.lastname;
      if (emailEl     && data.email)     emailEl.value     = data.email;
      if (phoneEl     && data.phone)     phoneEl.value     = data.phone;
      if (addressEl   && data.address)   addressEl.value   = data.address;
      if (cityEl      && data.city)      cityEl.value      = data.city;
      if (stateEl     && data.state)     stateEl.value     = data.state;
      if (notesEl     && data.notes)     notesEl.value     = data.notes;

      // Recalculate shipping if state was restored
      if (data.state) {
        updateTotals();
      }

      updateSteps();
    } catch (e) {
      // Silent fail
    }
  }

  function clearFormData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Silent fail
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     6. ORDER DATA MANAGEMENT
     ═══════════════════════════════════════════════════════════════ */
  function buildOrderData() {
    const subtotal = getCartTotal();
    const total = subtotal + shippingCost;

    return {
      orderRef:  generateOrderRef(),
      timestamp: new Date().toISOString(),
      customer: {
        firstName: firstnameEl.value.trim(),
        lastName:  lastnameEl.value.trim(),
        email:     emailEl.value.trim(),
        phone:     '+234' + phoneEl.value.replace(/[\s\-()]/g, ''),
      },
      delivery: {
        address: addressEl.value.trim(),
        city:    cityEl.value.trim(),
        state:   stateEl.value.trim(),
        notes:   notesEl ? notesEl.value.trim() : '',
      },
      items:    cart.map(item => ({
        name:     item.name,
        variant:  item.variant || null,
        quantity: item.quantity,
        price:    item.price,
        total:    item.price * item.quantity,
      })),
      subtotal,
      shipping: shippingCost,
      total,
      status: 'pending',
    };
  }

  function saveOrderData(orderData) {
    try {
      localStorage.setItem('velour_last_order', JSON.stringify(orderData));

      // Also maintain an order history array
      const historyRaw = localStorage.getItem('velour_order_history');
      const history = historyRaw ? JSON.parse(historyRaw) : [];
      history.unshift(orderData);
      // Keep last 10 orders max
      if (history.length > 10) history.pop();
      localStorage.setItem('velour_order_history', JSON.stringify(history));
    } catch (e) {
      console.error('Checkout: Error saving order data', e);
    }
  }

  /* ═══════════════════════════════════════════════════════════════
     7. MOCK PAYMENT SYSTEM (TEMPLATE)
     ═══════════════════════════════════════════════════════════════ */
  function setupPayButtons() {
    if (payBtn) {
      payBtn.addEventListener('click', handlePay);
    }
    if (payBtnMobile) {
      payBtnMobile.addEventListener('click', handlePay);
    }
  }

  function handlePay() {
    // Step 1: Validate all fields
    if (!validateAllFields()) {
      showCartToast('Please fill in all required fields', 'error');
      return;
    }

    // Step 2: Build and save order data
    const orderData = buildOrderData();
    saveOrderData(orderData);

    // Step 3: Set loading state
    setPayLoading(true);

    // Step 4: Simulate mock payment processing
    setTimeout(() => {
      // Create a mock successful reference
      const fakeReference = 'TPL_' + orderData.orderRef;
      handlePaymentSuccess(orderData, fakeReference);
    }, 2000); // 2 second delay to simulate API call
  }

  function handlePaymentSuccess(orderData, reference) {
    // Update order status
    orderData.status = 'paid';
    orderData.paymentRef = reference;
    orderData.paidAt = new Date().toISOString();
    saveOrderData(orderData);

    // Clear cart and form data
    clearCart();
    clearFormData();

    // Show success toast
    showCartToast('Payment successful! Redirecting...', 'success');

    // Redirect to order success page
    setTimeout(() => {
      window.location.href = `/ecommerce/pages/order-success.html?ref=${orderData.orderRef}`;
    }, 800);
  }


  function setPayLoading(loading) {
    const btns = [payBtn, payBtnMobile].filter(Boolean);

    btns.forEach(btn => {
      if (loading) {
        btn.disabled = true;
        btn.classList.add('is-loading');
        btn.dataset.originalHtml = btn.innerHTML;
        btn.innerHTML = `
          <span class="checkout-spinner"></span>
          Processing…
        `;
      } else {
        btn.disabled = false;
        btn.classList.remove('is-loading');
        if (btn.dataset.originalHtml) {
          btn.innerHTML = btn.dataset.originalHtml;
        }
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     8. UI STATE HELPERS
     ═══════════════════════════════════════════════════════════════ */
  function hideSkeleton() {
    if (skeletonEl) {
      skeletonEl.style.transition = 'opacity 0.3s ease';
      skeletonEl.style.opacity = '0';
      setTimeout(() => skeletonEl.remove(), 300);
    }
  }

  function showEmpty() {
    if (emptyEl)    emptyEl.style.display = '';
    if (contentEl)  contentEl.style.display = 'none';
  }

  function showContent() {
    if (contentEl)  contentEl.style.display = '';
    if (emptyEl)    emptyEl.style.display = 'none';
  }

  /* ═══════════════════════════════════════════════════════════════
     BOOT
     ═══════════════════════════════════════════════════════════════ */
  init();
});
