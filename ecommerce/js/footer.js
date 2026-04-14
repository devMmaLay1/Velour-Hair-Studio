// ═══════════════════════════════════════════════════════════════
// VELOUR HAIR STUDIO — Ecommerce Footer JavaScript
// File: ecommerce/js/footer.js
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // 1. LOAD FOOTER HTML
  // ─────────────────────────────────────────────────────────────
  async function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    try {
      const response = await fetch('/ecommerce/components/footer.html?v=' + Date.now());
      if (!response.ok) throw new Error('Failed to load footer');
      const html = await response.text();
      placeholder.innerHTML = html;

      // Initialize newsletter form
      initNewsletterForm();
    } catch (error) {
      console.error('Footer load error:', error);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 2. INITIALIZE NEWSLETTER FORM
  // ─────────────────────────────────────────────────────────────
  function initNewsletterForm() {
    const form = document.querySelector('footer form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email) {
        showMessage('Please enter your email address', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
      }

      // Simulate newsletter subscription
      subscribeToNewsletter(email);
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 3. SUBSCRIBE TO NEWSLETTER
  // ─────────────────────────────────────────────────────────────
  function subscribeToNewsletter(email) {
    // Store in localStorage (in production, this would be an API call)
    const subscribers = JSON.parse(localStorage.getItem('velour_newsletter') || '[]');
    
    if (subscribers.includes(email)) {
      showMessage('You are already subscribed!', 'info');
      return;
    }

    subscribers.push(email);
    localStorage.setItem('velour_newsletter', JSON.stringify(subscribers));

    showMessage('Thank you for subscribing!', 'success');
    
    // Clear the form
    const form = document.querySelector('footer form');
    if (form) form.reset();
  }

  // ─────────────────────────────────────────────────────────────
  // 4. VALIDATE EMAIL
  // ─────────────────────────────────────────────────────────────
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ─────────────────────────────────────────────────────────────
  // 5. SHOW MESSAGE
  // ─────────────────────────────────────────────────────────────
  function showMessage(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-sm font-outfit transition-all duration-300 ${
      type === 'success' ? 'bg-gold text-ink' :
      type === 'error' ? 'bg-rose text-cream' :
      'bg-plum text-cream'
    }`;
    toast.textContent = message;
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ─────────────────────────────────────────────────────────────
  // 6. INITIALIZE ON DOM READY
  // ─────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }

})();
