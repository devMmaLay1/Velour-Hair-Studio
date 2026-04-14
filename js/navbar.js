// ═══════════════════════════════════════════════════════════════
// VELOUR HAIR STUDIO — Navbar JavaScript
// File: js/navbar.js
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // 1. LOAD NAVBAR HTML
  // ─────────────────────────────────────────────────────────────
  async function loadNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    try {
      // Add cache-busting parameter to force fresh load
      const response = await fetch('/components/navbar.html?v=' + Date.now());
      if (!response.ok) throw new Error('Failed to load navbar');
      const html = await response.text();
      
      // Log to verify all content is loaded
      console.log('Navbar HTML length:', html.length);
      console.log('Mobile nav links found:', (html.match(/mobile-nav-link/g) || []).length);
      
      placeholder.innerHTML = html;

      // Initialize after DOM is ready
      initNavbar();
      updateCartCount();
      updateWishlistCount();
    } catch (error) {
      console.error('Navbar load error:', error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 2. INITIALIZE NAVBAR FUNCTIONALITY
  // ─────────────────────────────────────────────────────────────
  function initNavbar() {
    const header = document.getElementById('site-header');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!header || !mobileMenu || !mobileMenuBtn) {
      console.warn('Navbar elements not found');
      return;
    }

    // ─── Mobile Menu Toggle ───
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      toggleMobileMenu(isMenuOpen);
    });

    // ─── Close menu when clicking a link ───
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) {
          isMenuOpen = false;
          toggleMobileMenu(false);
        }
      });
    });

    // ─── Close menu on ESC key ───
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        isMenuOpen = false;
        toggleMobileMenu(false);
      }
    });

    // ─── Scroll Effect: Add backdrop on scroll ───
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('bg-cream/95', 'dark:bg-dark-bg/95', 'backdrop-blur-xl', 'shadow-sm');
      } else {
        header.classList.remove('bg-cream/95', 'dark:bg-dark-bg/95', 'backdrop-blur-xl', 'shadow-sm');
      }

      lastScroll = currentScroll;
    });

    // ─── Active Link Highlighting ───
    highlightActiveLink();
  }

  // ─────────────────────────────────────────────────────────────
  // 3. TOGGLE MOBILE MENU
  // ─────────────────────────────────────────────────────────────
  function toggleMobileMenu(open) {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const bar1 = document.getElementById('bar-1');
    const bar2 = document.getElementById('bar-2');
    const bar3 = document.getElementById('bar-3');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (open) {
      // Open menu
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';

      // Animate hamburger to X
      bar1.style.transform = 'rotate(45deg) translateY(6px)';
      bar2.style.opacity = '0';
      bar3.style.transform = 'rotate(-45deg) translateY(-6px)';

      // Stagger animate links
      mobileLinks.forEach((link, index) => {
        setTimeout(() => {
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
      });
    } else {
      // Close menu
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');
      mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = '';

      // Reset hamburger
      bar1.style.transform = '';
      bar2.style.opacity = '1';
      bar3.style.transform = '';

      // Reset links
      mobileLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(16px)';
      });
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 4. HIGHLIGHT ACTIVE LINK
  // ─────────────────────────────────────────────────────────────
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    [...navLinks, ...mobileNavLinks].forEach(link => {
      const linkPath = new URL(link.href).pathname;
      
      if (linkPath === currentPath || 
          (currentPath === '/' && linkPath === '/index.html') ||
          (currentPath === '/index.html' && linkPath === '/')) {
        link.classList.add('text-gold');
        link.classList.remove('text-ink/70', 'dark:text-cream/70');
      }
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 5. INITIALIZE ON DOM READY
  // ─────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }

})();

  // ─────────────────────────────────────────────────────────────
  // 6. UPDATE CART COUNT
  // ─────────────────────────────────────────────────────────────
  function updateCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem('velour_cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);
      
      const updateFn = () => {
        const badge = document.getElementById('nav-cart-count');
        if (badge) {
          if (totalItems > 0) {
            badge.textContent = totalItems > 99 ? '99+' : totalItems;
            badge.style.opacity = '1';
            badge.style.transform = 'translate(50%, -50%) scale(1)';
            badge.style.display = 'flex'; // Enforce display
          } else {
            badge.style.opacity = '0';
            badge.style.transform = 'translate(50%, -50%) scale(0)';
          }
        }
      };
      
      // Run immediately
      updateFn();
      // Run again slightly later as a failsafe against browser render race conditions during navigation
      setTimeout(updateFn, 100);
      setTimeout(updateFn, 500);

    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 7. UPDATE WISHLIST COUNT
  // ─────────────────────────────────────────────────────────────
  function updateWishlistCount() {
    try {
      const wishlist = JSON.parse(localStorage.getItem('velour_wishlist') || '[]');
      
      const updateFn = () => {
        const badge = document.getElementById('nav-wishlist-count');
        if (badge) {
          if (wishlist.length > 0) {
            badge.textContent = wishlist.length > 99 ? '99+' : wishlist.length;
            badge.style.opacity = '1';
            badge.style.transform = 'translate(50%, -50%) scale(1)';
            badge.style.display = 'flex'; // Enforce display
          } else {
            badge.style.opacity = '0';
            badge.style.transform = 'translate(50%, -50%) scale(0)';
          }
        }
      };

      // Run immediately
      updateFn();
      // Failsafe for navigation render race conditions
      setTimeout(updateFn, 100);
      setTimeout(updateFn, 500);

    } catch (error) {
      console.error('Error updating wishlist count:', error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 8. LISTEN FOR STORAGE CHANGES (from other tabs/windows)
  // ─────────────────────────────────────────────────────────────
  window.addEventListener('storage', (e) => {
    if (e.key === 'velour_cart') {
      updateCartCount();
    }
    if (e.key === 'velour_wishlist') {
      updateWishlistCount();
    }
  });

  // ─────────────────────────────────────────────────────────────
  // 9. LISTEN FOR CUSTOM EVENTS (from same page)
  // ─────────────────────────────────────────────────────────────
  window.addEventListener('cartUpdated', updateCartCount);
  window.addEventListener('wishlistUpdated', updateWishlistCount);
  
  // Also listen for ecommerce-specific events
  window.addEventListener('velour:cart-updated', updateCartCount);
  window.addEventListener('velour:wishlist-updated', updateWishlistCount);

