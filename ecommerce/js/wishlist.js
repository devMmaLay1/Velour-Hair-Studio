/* ═══════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Wishlist Helper Functions
   Shared wishlist logic across all e-commerce pages
   Uses localStorage for persistence (client-side only)
   ═══════════════════════════════════════════════════════════════ */

const WISHLIST_STORAGE_KEY = 'velour_wishlist';

/* ─── Core Wishlist Operations ─────────────────────────────── */

/**
 * Retrieve the full wishlist array from localStorage
 * @returns {Array} Array of product ID strings
 */
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Wishlist: Error reading from localStorage', e);
    return [];
  }
}

/**
 * Save the wishlist array to localStorage
 * @param {Array} wishlist
 */
function saveWishlist(wishlist) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    dispatchWishlistUpdate(wishlist);
  } catch (e) {
    console.error('Wishlist: Error saving to localStorage', e);
  }
}

/**
 * Toggle a product in/out of the wishlist
 * @param {string} productId
 * @returns {boolean} true if added, false if removed
 */
function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    // Remove
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    return false;
  } else {
    // Add
    wishlist.push(productId);
    saveWishlist(wishlist);
    return true;
  }
}

/**
 * Check if a product is in the wishlist
 * @param {string} productId
 * @returns {boolean}
 */
function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

/**
 * Get the total number of items in the wishlist
 * @returns {number}
 */
function getWishlistCount() {
  return getWishlist().length;
}

/**
 * Remove a specific product from the wishlist
 * @param {string} productId
 * @returns {Array} Updated wishlist
 */
function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  saveWishlist(wishlist);
  return wishlist;
}

/**
 * Clear the entire wishlist
 * @returns {Array} Empty array
 */
function clearWishlist() {
  saveWishlist([]);
  return [];
}

/* ─── Wishlist Events ──────────────────────────────────────── */

/**
 * Dispatch a custom event whenever the wishlist changes
 * This allows the navbar badge and any listeners to react
 * @param {Array} wishlist
 */
function dispatchWishlistUpdate(wishlist) {
  const event = new CustomEvent('velour:wishlist-updated', {
    detail: {
      wishlist,
      count: wishlist.length,
    },
  });
  window.dispatchEvent(event);
}

/* ─── Wishlist Badge Updater ───────────────────────────────── */

/**
 * Update the wishlist count badge in the navbar
 * Call this on page load and whenever the wishlist changes
 */
function updateWishlistBadge() {
  const count = getWishlistCount();
  const badges = document.querySelectorAll('.wishlist-count-badge');

  badges.forEach(badge => {
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = 'flex';
      // Subtle pop animation (reuse cart pattern)
      badge.classList.remove('wishlist-badge-pop');
      void badge.offsetWidth; // Force reflow
      badge.classList.add('wishlist-badge-pop');
    } else {
      badge.style.display = 'none';
    }
  });
}

// Listen for wishlist updates to auto-refresh the badge
window.addEventListener('velour:wishlist-updated', updateWishlistBadge);

// Update badge on page load
document.addEventListener('DOMContentLoaded', updateWishlistBadge);

/* ─── Move to Cart Helper ──────────────────────────────────── */

/**
 * Move a wishlist item into the cart and remove from wishlist
 * @param {string} productId
 * @returns {boolean} true if successfully moved
 */
function moveWishlistToCart(productId) {
  const product = getProductById(productId);
  if (!product) return false;

  // Add to cart with default variant (first one) and qty 1
  const variant = product.variants ? product.variants[0] : null;
  addToCart(product, 1, variant);

  // Remove from wishlist
  removeFromWishlist(productId);

  return true;
}
