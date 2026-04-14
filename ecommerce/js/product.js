/* ═════════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Product Detail Page Logic
   Handles: dynamic product loading, gallery, variants, qty stepper,
            add-to-cart, related products, accordion, SEO meta update
   ═════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  /* ── DOM Refs ────────────────────────────────────────────────── */
  const skeletonEl        = document.getElementById('product-skeleton');
  const notFoundEl        = document.getElementById('product-not-found');
  const contentEl         = document.getElementById('product-content');

  // Gallery
  const mainImageEl       = document.getElementById('product-main-image');
  const imgFallbackEl     = document.getElementById('product-img-fallback');
  const galleryBadgeEl    = document.getElementById('product-gallery-badge');
  const thumbsEl          = document.getElementById('product-gallery-thumbs');

  // Info panel
  const categoryLabelEl   = document.getElementById('product-category-label');
  const breadcrumbNameEl  = document.getElementById('product-breadcrumb-name');
  const nameEl            = document.getElementById('product-name');
  const priceEl           = document.getElementById('product-price');
  const oldPriceEl        = document.getElementById('product-old-price');
  const saveBadgeEl       = document.getElementById('product-save-badge');
  const descEl            = document.getElementById('product-desc');
  const longDescEl        = document.getElementById('product-long-desc');

  // Variants
  const variantsWrapEl    = document.getElementById('product-variants');
  const variantOptionsEl  = document.getElementById('product-variant-options');
  const variantSelectedEl = document.getElementById('product-variant-selected');
  const variantErrorEl    = document.getElementById('product-variant-error');

  // Qty + ATC
  const qtyDecBtn         = document.getElementById('qty-decrease');
  const qtyIncBtn         = document.getElementById('qty-increase');
  const qtyValueEl        = document.getElementById('qty-value');
  const atcBtn            = document.getElementById('product-atc-btn');
  const wishlistBtn       = document.getElementById('product-wishlist-btn');

  // Stock
  const stockWrapEl       = document.getElementById('product-stock');
  const stockTextEl       = document.getElementById('product-stock-text');

  // Benefits
  const benefitsWrapEl    = document.getElementById('product-benefits');
  const benefitsListEl    = document.getElementById('product-benefits-list');

  // Related
  const relatedSection    = document.getElementById('product-related');
  const relatedGridEl     = document.getElementById('product-related-grid');

  /* ── State ───────────────────────────────────────────────────── */
  let product        = null;
  let selectedVariant = null;
  let quantity       = 1;
  let isWishlisted   = false;

  /* ═══════════════════════════════════════════════════════════════
     1. RESOLVE PRODUCT FROM URL
     ═══════════════════════════════════════════════════════════════ */
  function getSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || params.get('slug') || null;
  }

  function init() {
    const slug = getSlugFromURL();
    if (!slug) {
      showNotFound();
      return;
    }

    const found = getProductBySlug(slug);
    if (!found) {
      showNotFound();
      return;
    }

    product = found;
    renderProduct(product);
  }

  /* ═══════════════════════════════════════════════════════════════
     2. RENDER PRODUCT
     ═══════════════════════════════════════════════════════════════ */
  function renderProduct(p) {
    // Update page meta
    updateSEOMeta(p);

    // Breadcrumb
    if (breadcrumbNameEl) breadcrumbNameEl.textContent = p.name;

    // Category
    const cat = PRODUCT_CATEGORIES.find(c => c.slug === p.category);
    if (categoryLabelEl) categoryLabelEl.textContent = cat ? cat.label : p.category;

    // Name
    if (nameEl) nameEl.textContent = p.name;

    // Prices
    renderPrices(p);

    // Short description
    if (descEl) descEl.textContent = p.description;

    // Long description (accordion)
    if (longDescEl) longDescEl.textContent = p.longDescription || p.description;

    // Gallery
    renderGallery(p);

    // Badge on gallery
    if (p.badge && galleryBadgeEl) {
      galleryBadgeEl.textContent = p.badge;
      galleryBadgeEl.className = `product-gallery__badge product-gallery__badge--${getBadgeModifier(p.badge)}`;
      galleryBadgeEl.style.display = '';
    }

    // Variants
    renderVariants(p);

    // Stock
    renderStock(p);

    // Benefits
    renderBenefits(p);

    // Related products
    renderRelated(p);

    // Show content, hide skeleton
    hideSkeleton();
    showContent();

    // Initialize wishlist button with real state
    initProductWishlist();

    // Entrance animation
    requestAnimationFrame(() => {
      contentEl.classList.add('product-content--visible');
    });
  }

  /* ─── Price Rendering ────────────────────────────────────────── */
  function renderPrices(p, variant = null) {
    const price = variant ? variant.price : p.price;
    const oldPrice = p.oldPrice;

    if (priceEl) priceEl.textContent = formatPrice(price);

    if (oldPrice && !variant) {
      if (oldPriceEl) {
        oldPriceEl.textContent = formatPrice(oldPrice);
        oldPriceEl.style.display = '';
      }
      if (saveBadgeEl) {
        const saving = oldPrice - price;
        saveBadgeEl.textContent = `Save ${formatPrice(saving)}`;
        saveBadgeEl.style.display = '';
      }
    } else {
      if (oldPriceEl) oldPriceEl.style.display = 'none';
      if (saveBadgeEl) saveBadgeEl.style.display = 'none';
    }
  }

  /* ─── Gallery Rendering ──────────────────────────────────────── */
  function renderGallery(p) {
    const images = (p.gallery && p.gallery.length > 0) ? p.gallery : [p.image];

    // Set main image
    setMainImage(images[0], p.name);

    // Render thumbnails only if there are 2+ images
    if (thumbsEl) {
      if (images.length > 1) {
        thumbsEl.innerHTML = images.map((src, i) => `
          <button
            class="product-gallery__thumb ${i === 0 ? 'is-active' : ''}"
            data-img="${src}"
            data-index="${i}"
            role="listitem"
            aria-label="View image ${i + 1}"
          >
            <img src="${src}" alt="${p.name} — view ${i + 1}" loading="lazy"
              onerror="this.parentElement.style.display='none';"
            />
          </button>
        `).join('');

        thumbsEl.querySelectorAll('.product-gallery__thumb').forEach(thumb => {
          thumb.addEventListener('click', () => {
            const src = thumb.dataset.img;
            setMainImage(src, p.name);

            // Update active state
            thumbsEl.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('is-active'));
            thumb.classList.add('is-active');
          });
        });
      } else {
        thumbsEl.innerHTML = '';
      }
    }
  }

  function setMainImage(src, alt) {
    if (!mainImageEl) return;
    mainImageEl.style.opacity = '0';
    mainImageEl.src = src;
    mainImageEl.alt = alt;
    if (imgFallbackEl) imgFallbackEl.style.display = 'none';
    mainImageEl.style.display = '';

    mainImageEl.onload = () => {
      mainImageEl.style.transition = 'opacity 0.35s ease';
      mainImageEl.style.opacity = '1';
    };
    mainImageEl.onerror = () => {
      mainImageEl.style.display = 'none';
      if (imgFallbackEl) imgFallbackEl.style.display = 'flex';
    };
  }

  /* ─── Variant Rendering ──────────────────────────────────────── */
  function renderVariants(p) {
    if (!p.variants || !p.variants.length) {
      if (variantsWrapEl) variantsWrapEl.style.display = 'none';
      selectedVariant = null;
      return;
    }

    if (variantsWrapEl) variantsWrapEl.style.display = '';

    if (variantOptionsEl) {
      variantOptionsEl.innerHTML = p.variants.map((v, i) => `
        <button
          class="product-variant-btn"
          data-variant-index="${i}"
          role="radio"
          aria-checked="false"
          aria-label="Select ${v.label}"
        >
          ${v.label}
        </button>
      `).join('');

      variantOptionsEl.querySelectorAll('.product-variant-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.variantIndex, 10);
          const variant = p.variants[idx];

          // Update selection state
          variantOptionsEl.querySelectorAll('.product-variant-btn').forEach(b => {
            b.classList.remove('is-selected');
            b.setAttribute('aria-checked', 'false');
          });
          btn.classList.add('is-selected');
          btn.setAttribute('aria-checked', 'true');

          selectedVariant = variant;

          // Update displayed selected label
          if (variantSelectedEl) variantSelectedEl.textContent = `— ${variant.label}`;

          // Update price
          renderPrices(p, variant);

          // Clear variant error if shown
          clearVariantError();
        });
      });
    }
  }

  function showVariantError() {
    if (variantErrorEl) {
      variantErrorEl.style.display = '';
      variantErrorEl.style.animation = 'none';
      requestAnimationFrame(() => {
        variantErrorEl.style.animation = 'productShake 0.4s ease';
      });
    }
  }

  function clearVariantError() {
    if (variantErrorEl) variantErrorEl.style.display = 'none';
  }

  /* ─── Stock Status ───────────────────────────────────────────── */
  function renderStock(p) {
    if (!stockWrapEl || !stockTextEl) return;

    stockWrapEl.className = 'product-stock';
    if (p.stock === 0) {
      stockWrapEl.classList.add('product-stock--out');
      stockTextEl.textContent = 'Out of stock';
    } else if (p.stock <= 5) {
      stockWrapEl.classList.add('product-stock--low');
      stockTextEl.textContent = `Only ${p.stock} left in stock — order soon`;
    } else {
      stockWrapEl.classList.add('product-stock--in');
      stockTextEl.textContent = 'In stock — ready to ship';
    }
  }

  /* ─── Benefits ───────────────────────────────────────────────── */
  function renderBenefits(p) {
    if (!p.benefits || !p.benefits.length) {
      if (benefitsWrapEl) benefitsWrapEl.style.display = 'none';
      return;
    }

    if (benefitsWrapEl) benefitsWrapEl.style.display = '';
    if (benefitsListEl) {
      benefitsListEl.innerHTML = p.benefits.map(b => `
        <li class="product-benefits__item">
          <svg class="product-benefits__check" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${b}</span>
        </li>
      `).join('');
    }
  }

  /* ─── Related Products ───────────────────────────────────────── */
  function renderRelated(p) {
    const related = getRelatedProducts(p.id, 4);
    if (!related.length || !relatedSection || !relatedGridEl) return;

    relatedSection.style.display = '';

    relatedGridEl.innerHTML = related.map((rp, i) => {
      const cat = PRODUCT_CATEGORIES.find(c => c.slug === rp.category);
      const badgeClass = getBadgeModifier(rp.badge);
      const delay = i * 0.07;

      return `
        <article
          class="vl-product-card"
          role="listitem"
          style="opacity:0;transform:translateY(24px);"
          data-related-index="${i}"
        >
          <div class="vl-product-card__image-wrap">
            <a href="/ecommerce/pages/product.html?id=${rp.slug}" aria-label="View ${rp.name}">
              <img
                class="vl-product-card__image"
                src="${rp.image}"
                alt="${rp.name}"
                onerror="this.style.display='none';this.insertAdjacentHTML('afterend', '<div class=\\'ec-img-fallback\\'>V</div>');"
              />
            </a>
            ${rp.badge ? `<span class="vl-product-card__badge vl-product-card__badge--${badgeClass}">${rp.badge}</span>` : ''}
            <button
              class="vl-product-card__quick-add"
              data-add-id="${rp.id}"
              aria-label="Add ${rp.name} to cart"
            >
              <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
          <a href="/ecommerce/pages/product.html?id=${rp.slug}" class="vl-product-card__body" style="text-decoration:none;">
            <span class="vl-product-card__category">${cat ? cat.label : rp.category}</span>
            <h3 class="vl-product-card__name">${rp.name}</h3>
            <div class="vl-product-card__price-row">
              <span class="vl-product-card__price">${formatPrice(rp.price)}</span>
              ${rp.oldPrice ? `<span class="vl-product-card__old-price">${formatPrice(rp.oldPrice)}</span>` : ''}
            </div>
          </a>
        </article>
      `;
    }).join('');

    // Quick-add handlers for related products
    relatedGridEl.querySelectorAll('.vl-product-card__quick-add').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const rp = getProductById(btn.dataset.addId);
        if (!rp) return;
        const v = rp.variants ? rp.variants[0] : null;
        addToCart(rp, 1, v);
        showCartToast(`${rp.name} added to cart!`);
        btn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`;
        btn.style.background = 'var(--vl-gold)';
        btn.querySelector('svg').style.stroke = 'var(--vl-ink)';
        setTimeout(() => {
          btn.innerHTML = `<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
          btn.style.background = '';
        }, 1400);
      });
    });

    // Animate related cards in using IntersectionObserver
    const cards = relatedGridEl.querySelectorAll('.vl-product-card');
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.relatedIndex, 10);
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.55s var(--ec-ease), transform 0.55s var(--ec-ease)';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => obs.observe(card));
  }

  /* ═══════════════════════════════════════════════════════════════
     3. QUANTITY STEPPER
     ═══════════════════════════════════════════════════════════════ */
  function updateQtyUI() {
    if (qtyValueEl) qtyValueEl.textContent = quantity;
    if (qtyDecBtn) qtyDecBtn.disabled = quantity <= 1;
    if (qtyIncBtn && product) qtyIncBtn.disabled = quantity >= product.stock;
  }

  if (qtyDecBtn) {
    qtyDecBtn.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        updateQtyUI();
      }
    });
  }

  if (qtyIncBtn) {
    qtyIncBtn.addEventListener('click', () => {
      if (product && quantity < product.stock) {
        quantity++;
        updateQtyUI();
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     4. ADD TO CART
     ═══════════════════════════════════════════════════════════════ */
  if (atcBtn) {
    atcBtn.addEventListener('click', () => {
      if (!product) return;

      // Validate variant selection
      if (product.variants && product.variants.length > 0 && !selectedVariant) {
        showVariantError();
        // Scroll to variants with shake
        if (variantsWrapEl) {
          variantsWrapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Out of stock guard
      if (product.stock === 0) {
        showCartToast('Sorry, this product is out of stock.', 'error');
        return;
      }

      // Loading state
      atcBtn.disabled = true;
      atcBtn.classList.add('is-loading');
      const originalHTML = atcBtn.innerHTML;
      atcBtn.innerHTML = `
        <svg class="product-atc-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
            <animate attributeName="stroke-dashoffset" dur="0.8s" values="32;0" repeatCount="indefinite"/>
          </circle>
        </svg>
        Adding…
      `;

      // Simulate async (real cart op is sync but UX needs the feel)
      setTimeout(() => {
        addToCart(product, quantity, selectedVariant);

        // Success state
        atcBtn.innerHTML = `
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          Added to Cart!
        `;
        atcBtn.classList.remove('is-loading');
        atcBtn.classList.add('is-success');

        showCartToast(`${product.name} added to cart!`, 'success');

        // Restore after 1.8s
        setTimeout(() => {
          atcBtn.innerHTML = originalHTML;
          atcBtn.disabled = false;
          atcBtn.classList.remove('is-success');
        }, 1800);
      }, 600);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     5. WISHLIST (Phase 7 — fully integrated)
     ═══════════════════════════════════════════════════════════════ */
  function initProductWishlist() {
    if (!wishlistBtn || !product) return;

    // Check initial state from localStorage
    if (typeof isInWishlist === 'function') {
      isWishlisted = isInWishlist(product.id);
      wishlistBtn.classList.toggle('is-wishlisted', isWishlisted);
      wishlistBtn.setAttribute('aria-label', isWishlisted ? 'Remove from wishlist' : 'Save to wishlist');
    }

    wishlistBtn.addEventListener('click', () => {
      if (typeof toggleWishlist !== 'function') return;

      const added = toggleWishlist(product.id);
      isWishlisted = added;
      wishlistBtn.classList.toggle('is-wishlisted', added);
      wishlistBtn.setAttribute('aria-label', added ? 'Remove from wishlist' : 'Save to wishlist');

      showCartToast(
        added ? `${product.name} saved to favorites ♥` : `${product.name} removed from favorites`,
        added ? 'success' : 'info'
      );
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     6. ACCORDION PANELS
     ═══════════════════════════════════════════════════════════════ */
  function initAccordions() {
    document.querySelectorAll('.product-accordion__trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // Close all
        document.querySelectorAll('.product-accordion__trigger').forEach(t => {
          t.setAttribute('aria-expanded', 'false');
          const p = document.getElementById(t.getAttribute('aria-controls'));
          if (p) {
            p.style.maxHeight = '0';
            p.style.opacity = '0';
          }
        });

        // Open this one if it was closed
        if (!isOpen && panel) {
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          panel.style.opacity = '1';
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     7. SEO META UPDATE
     ═══════════════════════════════════════════════════════════════ */
  function updateSEOMeta(p) {
    document.title = `${p.name} — Velour Hair Studio`;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', p.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${p.name} — Velour Hair Studio`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', p.description);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && p.image) ogImage.setAttribute('content', p.image);
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

  function showContent() {
    if (contentEl) contentEl.style.display = '';
    if (notFoundEl) notFoundEl.style.display = 'none';
  }

  function showNotFound() {
    hideSkeleton();
    if (contentEl) contentEl.style.display = 'none';
    if (notFoundEl) notFoundEl.style.display = '';
    document.title = 'Product Not Found — Velour Hair Studio';
  }

  /* ── Badge modifier helper ───────────────────────────────────── */
  function getBadgeModifier(badge) {
    if (!badge) return '';
    const b = badge.toLowerCase();
    if (b === 'sale')          return 'sale';
    if (b === 'new')           return 'new';
    if (b.includes('best'))    return 'best-seller';
    if (b.includes('value'))   return 'value';
    return 'best-seller';
  }

  /* ── Inject page-level keyframes ─────────────────────────────── */
  const productStyles = document.createElement('style');
  productStyles.textContent = `
    @keyframes productFadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes productShake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
    .product-content--visible {
      animation: productFadeIn 0.55s var(--ec-ease-out, cubic-bezier(0.16,1,0.3,1)) both;
    }
  `;
  document.head.appendChild(productStyles);

  /* ═══════════════════════════════════════════════════════════════
     BOOT
     ═══════════════════════════════════════════════════════════════ */
  initAccordions();
  init();
  updateQtyUI();
});
