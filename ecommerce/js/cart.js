/* ═══════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Cart Helper Functions
   Shared cart logic across all e-commerce pages
   Uses localStorage for persistence
   ═══════════════════════════════════════════════════════════════ */

const CART_STORAGE_KEY = 'velour_cart';

/* ─── Core Cart Operations ─────────────────────────────────── */

/**
 * Retrieve the full cart array from localStorage
 * @returns {Array} Array of cart item objects
 */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Cart: Error reading cart from localStorage', e);
    return [];
  }
}

/**
 * Save the cart array to localStorage
 * @param {Array} cart
 */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    dispatchCartUpdate(cart);
  } catch (e) {
    console.error('Cart: Error saving cart to localStorage', e);
  }
}

/**
 * Add a product to the cart
 * If the same product+variant combo exists, increment quantity
 * @param {Object} product - Full product object from products-data.js
 * @param {number} quantity - Number to add (default 1)
 * @param {Object|null} variant - Selected variant object { label, price } or null
 * @returns {Array} Updated cart
 */
function addToCart(product, quantity = 1, variant = null) {
  const cart = getCart();

  // Build a unique key from product id + variant label
  const variantLabel = variant ? variant.label : null;
  const cartItemId = variantLabel ? `${product.id}__${variantLabel}` : product.id;
  const unitPrice = variant ? variant.price : product.price;

  const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);

  if (existingIndex > -1) {
    // Item exists — increment quantity
    cart[existingIndex].quantity += quantity;
  } else {
    // New item
    cart.push({
      cartItemId,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: unitPrice,
      image: product.image,
      variant: variantLabel,
      quantity,
    });
  }

  saveCart(cart);
  return cart;
}

/**
 * Update the quantity of a specific cart item
 * @param {string} cartItemId - Unique cart item identifier
 * @param {number} newQuantity - New quantity (must be >= 1)
 * @returns {Array} Updated cart
 */
function updateCartQuantity(cartItemId, newQuantity) {
  const cart = getCart();
  const index = cart.findIndex(item => item.cartItemId === cartItemId);

  if (index === -1) return cart;

  if (newQuantity < 1) {
    // Remove item if quantity drops below 1
    cart.splice(index, 1);
  } else {
    cart[index].quantity = newQuantity;
  }

  saveCart(cart);
  return cart;
}

/**
 * Remove an item from the cart entirely
 * @param {string} cartItemId
 * @returns {Array} Updated cart
 */
function removeFromCart(cartItemId) {
  let cart = getCart();
  cart = cart.filter(item => item.cartItemId !== cartItemId);
  saveCart(cart);
  return cart;
}

/**
 * Clear the entire cart
 * @returns {Array} Empty array
 */
function clearCart() {
  saveCart([]);
  return [];
}

/* ─── Cart Calculations ────────────────────────────────────── */

/**
 * Get the subtotal of all items in the cart
 * @returns {number} Total price in Naira
 */
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Get the total number of items in the cart (sum of all quantities)
 * @returns {number}
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Get the number of unique line items in the cart
 * @returns {number}
 */
function getCartLineCount() {
  return getCart().length;
}

/**
 * Check if a specific product (optionally with variant) is already in the cart
 * @param {string} productId
 * @param {string|null} variantLabel
 * @returns {boolean}
 */
function isInCart(productId, variantLabel = null) {
  const cartItemId = variantLabel ? `${productId}__${variantLabel}` : productId;
  return getCart().some(item => item.cartItemId === cartItemId);
}

/**
 * Get a specific cart item
 * @param {string} cartItemId
 * @returns {Object|null}
 */
function getCartItem(cartItemId) {
  return getCart().find(item => item.cartItemId === cartItemId) || null;
}

/* ─── Cart Events ──────────────────────────────────────────── */

/**
 * Dispatch a custom event whenever the cart changes
 * This allows the navbar badge and any listeners to react
 * @param {Array} cart
 */
function dispatchCartUpdate(cart) {
  const event = new CustomEvent('velour:cart-updated', {
    detail: {
      cart,
      count: cart.reduce((c, item) => c + item.quantity, 0),
      total: cart.reduce((t, item) => t + (item.price * item.quantity), 0),
    },
  });
  window.dispatchEvent(event);
}

/* ─── Cart Badge Updater ───────────────────────────────────── */

/**
 * Update the cart count badge in the navbar
 * Call this on page load and whenever the cart changes
 */
function updateCartBadge() {
  const count = getCartCount();
  const badges = document.querySelectorAll('.cart-count-badge');

  badges.forEach(badge => {
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = 'flex';
      // Subtle pop animation
      badge.classList.remove('cart-badge-pop');
      void badge.offsetWidth; // Force reflow
      badge.classList.add('cart-badge-pop');
    } else {
      badge.style.display = 'none';
    }
  });
}

// Listen for cart updates to auto-refresh the badge
window.addEventListener('velour:cart-updated', updateCartBadge);

// Update badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);

/* ─── Toast Notification ───────────────────────────────────── */

/**
 * Show a brief toast notification (e.g., "Added to cart!")
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 * @param {number} duration - ms to display (default 2500)
 */
function showCartToast(message, type = 'success', duration = 2500) {
  // Remove any existing toast
  const existing = document.getElementById('velour-cart-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'velour-cart-toast';
  toast.className = `velour-toast velour-toast--${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  const iconMap = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  };

  toast.innerHTML = `
    <span class="velour-toast__icon">${iconMap[type] || iconMap.info}</span>
    <span class="velour-toast__text">${message}</span>
  `;

  document.body.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add('velour-toast--visible');
  });

  // Auto-dismiss
  setTimeout(() => {
    toast.classList.remove('velour-toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    // Fallback removal if transition doesn't fire
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ─── Order Reference Generator ────────────────────────────── */

/**
 * Generate a unique order reference
 * Format: VEL-YYYYMMDD-XXXX (e.g., VEL-20260410-A7K3)
 * @returns {string}
 */
function generateOrderRef() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VEL-${datePart}-${randomPart}`;
}
