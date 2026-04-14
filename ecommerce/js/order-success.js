/* ═══════════════════════════════════════════════════════════════
   VELOUR HAIR STUDIO — Order Success Page Logic (Phase 5)
   Reads saved order data from localStorage and renders the
   confirmation details
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── DOM Refs ──────────────────────────────────────────────── */
  const skeletonEl     = document.getElementById('order-skeleton');
  const contentEl      = document.getElementById('order-content');
  const thankYouEl     = document.getElementById('order-thank-you');
  const refEl          = document.getElementById('order-ref');
  const dateEl         = document.getElementById('order-date');
  const itemsListEl    = document.getElementById('order-items-list');
  const deliveryEl     = document.getElementById('order-delivery-address');
  const subtotalEl     = document.getElementById('order-subtotal');
  const shippingEl     = document.getElementById('order-shipping');
  const totalEl        = document.getElementById('order-total');
  const emailEl        = document.getElementById('order-email');

  /* ── Init ──────────────────────────────────────────────────── */
  function init() {
    setTimeout(() => {
      hideSkeleton();

      const order = getOrderData();
      if (!order) {
        showFallback();
        return;
      }

      renderOrder(order);
      showContent();
    }, 500);
  }

  /* ── Get Order Data ────────────────────────────────────────── */
  function getOrderData() {
    try {
      // First check URL for order ref
      const params = new URLSearchParams(window.location.search);
      const refFromUrl = params.get('ref');

      // Try last order
      const lastOrderRaw = localStorage.getItem('velour_last_order');
      if (lastOrderRaw) {
        const lastOrder = JSON.parse(lastOrderRaw);
        // If URL ref matches or no ref specified, use last order
        if (!refFromUrl || lastOrder.orderRef === refFromUrl) {
          return lastOrder;
        }
      }

      // Try order history
      if (refFromUrl) {
        const historyRaw = localStorage.getItem('velour_order_history');
        if (historyRaw) {
          const history = JSON.parse(historyRaw);
          const found = history.find(o => o.orderRef === refFromUrl);
          if (found) return found;
        }
      }

      return null;
    } catch (e) {
      console.error('OrderSuccess: Error reading order data', e);
      return null;
    }
  }

  /* ── Render Order ──────────────────────────────────────────── */
  function renderOrder(order) {
    // Thank you message
    if (thankYouEl) {
      thankYouEl.textContent = `Thank you, ${order.customer.firstName}! Your order is on its way.`;
    }

    // Reference
    if (refEl) refEl.textContent = order.orderRef;

    // Date
    if (dateEl) {
      const d = new Date(order.timestamp);
      dateEl.textContent = d.toLocaleDateString('en-NG', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }

    // Items
    if (itemsListEl && order.items) {
      itemsListEl.innerHTML = order.items.map(item => {
        const variant = item.variant ? ` — ${item.variant}` : '';
        return `
          <div class="order-item">
            <div class="order-item__info">
              <p class="order-item__name">${item.name}</p>
              <p class="order-item__meta">Qty: ${item.quantity}${variant}</p>
            </div>
            <span class="order-item__price">${formatPrice(item.total)}</span>
          </div>
        `;
      }).join('');
    }

    // Delivery address
    if (deliveryEl && order.delivery) {
      deliveryEl.textContent = `${order.delivery.address}, ${order.delivery.city}, ${order.delivery.state}`;
      if (order.delivery.notes) {
        deliveryEl.textContent += ` • Note: ${order.delivery.notes}`;
      }
    }

    // Totals
    if (subtotalEl)  subtotalEl.textContent = formatPrice(order.subtotal);
    if (shippingEl)  shippingEl.textContent = order.shipping === 0 ? 'Free' : formatPrice(order.shipping);
    if (totalEl)     totalEl.textContent = formatPrice(order.total);

    // Email
    if (emailEl && order.customer) {
      emailEl.textContent = order.customer.email;
    }

    // Update page title
    document.title = `Order ${order.orderRef} Confirmed — Velour Hair Studio`;
  }

  /* ── Fallback (no order data found) ────────────────────────── */
  function showFallback() {
    if (contentEl) {
      contentEl.style.display = '';
      // Hide the details card and just show a generic message
      const detailsCard = document.getElementById('order-details-card');
      if (detailsCard) detailsCard.style.display = 'none';

      if (thankYouEl) {
        thankYouEl.textContent = 'Thank you for shopping with Velour Hair Studio!';
      }
    }
  }

  /* ── UI Helpers ─────────────────────────────────────────────── */
  function hideSkeleton() {
    if (skeletonEl) {
      skeletonEl.style.transition = 'opacity 0.3s ease';
      skeletonEl.style.opacity = '0';
      setTimeout(() => skeletonEl.remove(), 300);
    }
  }

  function showContent() {
    if (contentEl) contentEl.style.display = '';
  }

  /* ── Boot ───────────────────────────────────────────────────── */
  init();
});
