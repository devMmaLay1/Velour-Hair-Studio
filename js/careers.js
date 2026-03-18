/* ═══════════════════════════════════════════════════════════════
   VELOUR — Careers Page JS
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Accordion positions ──────────────────────────────────────
  document.querySelectorAll('.cr-position-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const position = trigger.closest('.cr-position');
      const isOpen = position.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.cr-position').forEach(p => {
        p.classList.remove('is-open');
        p.querySelector('.cr-position-trigger').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        position.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        // Smooth scroll into view
        setTimeout(() => {
          position.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  // ── "Apply for This Role" pre-fills the form ─────────────────
  document.querySelectorAll('.cr-apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      const location = btn.dataset.location;

      const roleSelect = document.getElementById('cr-role');
      const locationSelect = document.getElementById('cr-location');

      if (roleSelect) {
        for (const opt of roleSelect.options) {
          if (opt.value === role) { opt.selected = true; break; }
        }
      }
      if (locationSelect && location !== 'All Locations') {
        for (const opt of locationSelect.options) {
          if (opt.value === location) { opt.selected = true; break; }
        }
      }

      // Scroll to form
      document.getElementById('cr-apply').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── File upload label ─────────────────────────────────────────
  const fileInput = document.getElementById('cr-cv');
  const fileLabel = document.getElementById('cr-file-label');
  const fileText = document.getElementById('cr-file-text');

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        fileText.textContent = file.name;
        fileLabel.classList.add('has-file');
      } else {
        fileText.textContent = 'Click to upload or drag & drop';
        fileLabel.classList.remove('has-file');
      }
    });

    // Drag & drop
    fileLabel.addEventListener('dragover', e => { e.preventDefault(); fileLabel.style.borderColor = '#C9A96E'; });
    fileLabel.addEventListener('dragleave', () => { fileLabel.style.borderColor = ''; });
    fileLabel.addEventListener('drop', e => {
      e.preventDefault();
      fileLabel.style.borderColor = '';
      const file = e.dataTransfer.files[0];
      if (file) {
        const dt = new DataTransfer();
        dt.items.add(file);
        fileInput.files = dt.files;
        fileText.textContent = file.name;
        fileLabel.classList.add('has-file');
      }
    });
  }

  // ── Form submission ───────────────────────────────────────────
  const form = document.getElementById('cr-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm()) return;

    const btn = document.getElementById('cr-submit');
    btn.classList.add('is-loading');
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('cr-success').style.display = 'flex';
      } else {
        throw new Error('Server error');
      }
    } catch {
      document.getElementById('cr-fail').style.display = 'flex';
      btn.classList.remove('is-loading');
      btn.disabled = false;
    }
  });

  function validateForm() {
    let valid = true;
    const rules = [
      { id: 'cr-name',       errId: 'cr-name-err',       msg: 'Please enter your full name.' },
      { id: 'cr-email',      errId: 'cr-email-err',       msg: 'Please enter a valid email address.' },
      { id: 'cr-phone',      errId: 'cr-phone-err',       msg: 'Please enter your phone number.' },
      { id: 'cr-location',   errId: 'cr-location-err',    msg: 'Please select a preferred location.' },
      { id: 'cr-role',       errId: 'cr-role-err',        msg: 'Please select the role you\'re applying for.' },
      { id: 'cr-experience', errId: 'cr-experience-err',  msg: 'Please select your experience level.' },
      { id: 'cr-message',    errId: 'cr-message-err',     msg: 'Please tell us a bit about yourself.' },
      { id: 'cr-cv',         errId: 'cr-cv-err',          msg: 'Please upload your CV.' },
    ];

    rules.forEach(({ id, errId, msg }) => {
      const el = document.getElementById(id);
      const err = document.getElementById(errId);
      const empty = el.tagName === 'INPUT' && el.type === 'file'
        ? el.files.length === 0
        : !el.value.trim();

      if (empty) {
        err.textContent = msg;
        el.classList.add('is-error');
        valid = false;
      } else {
        err.textContent = '';
        el.classList.remove('is-error');
      }
    });

    // Email format check
    const emailEl = document.getElementById('cr-email');
    if (emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
      document.getElementById('cr-email-err').textContent = 'Please enter a valid email address.';
      emailEl.classList.add('is-error');
      valid = false;
    }

    return valid;
  }

  // Clear errors on input
  document.querySelectorAll('.cr-input, .cr-select, .cr-textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('is-error');
      const errEl = document.getElementById(el.id + '-err');
      if (errEl) errEl.textContent = '';
    });
  });

  // ── Scroll reveal ─────────────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-revealed'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

});
