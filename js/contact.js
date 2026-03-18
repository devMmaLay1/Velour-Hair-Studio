/* ═══════════════════════════════════════════════════════════════
   VELOUR — Contact Page: Scroll Reveal + FAQ Accordion + Form
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initFAQ();
  initForm();
});

/* ─────────────────────────────────────────
   Scroll Reveal
───────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach((el) => observer.observe(el));
}

/* ─────────────────────────────────────────
   FAQ Accordion
───────────────────────────────────────── */
function initFAQ() {
  const items = document.querySelectorAll('.ct-faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('.ct-faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all others
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.ct-faq-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* ─────────────────────────────────────────
   Contact Form — client-side validation + Formspree submit
───────────────────────────────────────── */
function initForm() {
  const form    = document.getElementById('ct-form');
  const submit  = document.getElementById('ct-submit');
  const success = document.getElementById('ct-success');
  const fail    = document.getElementById('ct-fail');
  if (!form) return;

  // Live clear errors on input
  form.querySelectorAll('.ct-input, .ct-textarea, .ct-select').forEach((field) => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    submit.classList.add('is-loading');
    submit.disabled = true;
    success.style.display = 'none';
    fail.style.display    = 'none';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        success.style.display = 'flex';
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        fail.style.display = 'flex';
      }
    } catch {
      fail.style.display = 'flex';
    } finally {
      submit.classList.remove('is-loading');
      submit.disabled = false;
    }
  });

  function validate() {
    let valid = true;

    const name    = document.getElementById('ct-name');
    const email   = document.getElementById('ct-email');
    const subject = document.getElementById('ct-subject');
    const message = document.getElementById('ct-message');

    if (!name.value.trim()) {
      showError(name, 'ct-name-err', 'Please enter your name.');
      valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'ct-email-err', 'Please enter a valid email address.');
      valid = false;
    }
    if (!subject.value) {
      showError(subject, 'ct-subject-err', 'Please select a topic.');
      valid = false;
    }
    if (!message.value.trim()) {
      showError(message, 'ct-message-err', 'Please write a message.');
      valid = false;
    }

    return valid;
  }

  function showError(field, errId, msg) {
    field.classList.add('is-error');
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = msg;
  }

  function clearError(field) {
    field.classList.remove('is-error');
    // find sibling error span
    const errEl = field.closest('.ct-field')?.querySelector('.ct-field-error');
    if (errEl) errEl.textContent = '';
  }
}
