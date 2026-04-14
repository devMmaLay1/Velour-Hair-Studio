/* ═══════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Main JavaScript
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  const footerPlaceholder = document.getElementById("footer-placeholder");

  // Skip component loading on coming-soon locked pages — overlay covers everything
  // and pending fetches keep the browser tab in a loading state indefinitely
  const isLockedPage = !!document.querySelector('script[data-page]');

  // Load navbar
  if (navbarPlaceholder && !isLockedPage) {
    fetch("/components/navbar.html")
      .then((r) => r.text())
      .then((html) => {
        navbarPlaceholder.innerHTML = html;
        initMobileMenu();
        initNavbarScroll();
        setActiveNavLink();
      })
      .catch((err) => console.error("Error loading navbar:", err));
  }

  // Load footer
  if (footerPlaceholder && !isLockedPage) {
    fetch("/components/footer.html")
      .then((r) => r.text())
      .then((html) => {
        footerPlaceholder.innerHTML = html;
        setFooterYear();
      })
      .catch((err) => console.error("Error loading footer:", err));
  }

  // Initialize homepage simple counters if they exist on the page
  initCounters();
});


/* ───────────────────────────────────────────
   Footer Year
   ─────────────────────────────────────────── */
function setFooterYear() {
  const yearEl = document.getElementById("velour-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ───────────────────────────────────────────
   Mobile Menu Toggle & Animation
   ─────────────────────────────────────────── */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const bar1 = document.getElementById("bar-1");
  const bar2 = document.getElementById("bar-2");
  const bar3 = document.getElementById("bar-3");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (bar1) { bar1.style.transform = "none"; bar1.style.width = "20px"; }
  if (bar2) { bar2.style.opacity = "1"; bar2.style.transform = "none"; }
  if (bar3) { bar3.style.transform = "none"; bar3.style.width = "20px"; }

  if (!btn || !menu) return;

  let isOpen = false;

  // Toggle menu on button click
  btn.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Close menu when clicking a link
  mobileLinks.forEach((link) => {
    if (link.tagName === "A") {
      link.addEventListener("click", () => {
        isOpen = false;
        closeMenu();
      });
    }
  });

  // Open menu function
  function openMenu() {
    // Show menu overlay
    menu.classList.remove("pointer-events-none", "opacity-0");
    menu.classList.add("pointer-events-auto", "opacity-100");
    document.body.classList.add("overflow-hidden");

    // Animate hamburger to X
    if (bar1) {
      bar1.style.transform = "rotate(45deg) translate(2px, 2px)";
      bar1.style.width = "20px";
    }
    if (bar2) {
      bar2.style.opacity = "0";
      bar2.style.transform = "translateX(10px)";
    }
    if (bar3) {
      bar3.style.transform = "rotate(-45deg) translate(2px, -2px)";
      bar3.style.width = "20px";
    }

    // Stagger animate links (fade in from bottom)
    mobileLinks.forEach((link, i) => {
      setTimeout(() => {
        link.style.opacity = "1";
        link.style.transform = "translateY(0)";
        link.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      }, 80 + i * 60); // 60ms delay between each link
    });
  }

  // Close menu function
  function closeMenu() {
    // Reset links (fade out)
    mobileLinks.forEach((link) => {
      link.style.opacity = "0";
      link.style.transform = "translateY(16px)";
      link.style.transition = "all 0.2s ease";
    });

    // Reset hamburger icon
    if (bar1) {
      bar1.style.transform = "none";
      bar1.style.width = "20px";
    }
    if (bar2) {
      bar2.style.opacity = "1";
      bar2.style.transform = "none";
    }
    if (bar3) {
      bar3.style.transform = "none";
      bar3.style.width = "20px";
    }

    // Hide menu overlay after animation
    setTimeout(() => {
      menu.classList.add("pointer-events-none", "opacity-0");
      menu.classList.remove("pointer-events-auto", "opacity-100");
      document.body.classList.remove("overflow-hidden");
    }, 200);
  }
}

/* ───────────────────────────────────────────
   Navbar Scroll Effect (Glass Morphism)
   ─────────────────────────────────────────── */
function initNavbarScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const scrollThreshold = 50; // Pixels to scroll before effect triggers

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > scrollThreshold) {
      // Scrolled — add frosted glass effect
      header.classList.add(
        "backdrop-blur-xl",
        "bg-cream/85",
        "dark:bg-dark-bg/85",
        "shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
      );
    } else {
      // At top — transparent
      header.classList.remove(
        "backdrop-blur-xl",
        "bg-cream/85",
        "dark:bg-dark-bg/85",
        "shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
      );
    }
  });
}

/* ───────────────────────────────────────────
   Active Nav Link Highlight
   ─────────────────────────────────────────── */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    
    // Check if current page matches link href
    if (href && currentPath.endsWith(href.replace(/^\//, ""))) {
      // Add gold underline to active link
      const underline = link.querySelector("span");
      if (underline) {
        underline.classList.remove("w-0");
        underline.classList.add("w-3/4");
      }
      
      // Change text color for active link
      link.classList.remove("text-ink/70", "dark:text-cream/70");
      link.classList.add("text-plum", "dark:text-gold");
    }
  });
}

/* ───────────────────────────────────────────
   Counter Animation (Hero Stats)
   ─────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll(".stat-counter");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetNumber = parseInt(target.getAttribute("data-target"), 10);
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease-out cubic formula
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentNumber = Math.floor(easeOut * targetNumber);
            target.textContent = currentNumber.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = targetNumber.toLocaleString();
            }
          };

          requestAnimationFrame(updateCounter);
          obs.unobserve(target); // Only animate once
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ── Gallery strip: animate items only when section scrolls into view ── */
function initGalleryReveal() {
  const section = document.querySelector('.gallery-section');
  if (!section) return;

  const items = section.querySelectorAll('.gallery-item');
  if (!items.length) return;

  // Start hidden
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px) scale(0.97)';
    item.style.transition = 'none';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('gallery-in-view');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.transition = 'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, i * 60);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(section);
}

document.addEventListener('DOMContentLoaded', initGalleryReveal);
