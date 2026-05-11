/* ═══════════════════════════════════════════
   UI/cart-ui.js - Cart Visual Updates
   ═══════════════════════════════════════════ */

window.CartUI = {
  updateBadge: function(count) {
    var badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },

  updateTotal: function(total) {
    var el = document.querySelector('.cart-total-display');
    if (el) el.textContent = 'Rs.' + Math.round(total);
  },

  updateBillSummary: function(cart) {
    var mrpTotal = 0, saleTotal = 0;
    cart.forEach(function(item) {
      var qty = item.qty || 1;
      mrpTotal += (item.mrp || item.price) * qty;
      saleTotal += item.price * qty;
    });
    var discount = mrpTotal - saleTotal;
    var deliveryFee = saleTotal >= APP_CONSTANTS.FREE_DELIVERY_THRESHOLD ? 0 : APP_CONSTANTS.DELIVERY_FEE;
    var total = saleTotal + deliveryFee;

    var elMRP = document.getElementById('bill-mrp');
    var elDisc = document.getElementById('bill-discount');
    var elDel = document.getElementById('bill-delivery');
    var elTotal = document.getElementById('bill-total');

    if (elMRP) elMRP.textContent = 'Rs.' + Math.round(mrpTotal);
    if (elDisc) elDisc.textContent = '-Rs.' + Math.round(discount);
    if (elDel) elDel.textContent = deliveryFee === 0 ? 'FREE' : 'Rs.' + deliveryFee;
    if (elTotal) elTotal.textContent = 'Rs.' + Math.round(total);
  },

  updateFDBar: function(cartTotal) {
    var remaining = Math.max(0, APP_CONSTANTS.FREE_DELIVERY_THRESHOLD - cartTotal);
    var pct = Math.min(100, (cartTotal / APP_CONSTANTS.FREE_DELIVERY_THRESHOLD) * 100);
    var fill = document.querySelector('.fd-bar-fill');
    var text = document.querySelector('.fd-truck-text');

    if (fill) fill.style.width = pct + '%';
    if (text) {
      text.innerHTML = remaining > 0 
        ? 'Add <strong>Rs.' + Math.ceil(remaining) + '</strong> more for FREE delivery'
        : '<strong>Free delivery unlocked!</strong>';
    }
  },

  renderCartItems: function(cart) {
    var container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = '<div class="empty-cart">' +
        '<svg viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>' +
        '<h3>Your cart is empty</h3><p>Add items to get started</p></div>';
      return;
    }

    container.innerHTML = cart.map(function(item) {
      return '<div class="cart-item" data-id="' + (item.id || item.productId) + '">' +
        '<img src="' + (item.image || 'assets/icons/icon-192.png') + '" class="ci-img" alt="">' +
        '<div class="ci-info"><div class="ci-name">' + item.name + '</div>' +
        '<div class="ci-hindi">' + (item.nameHindi || '') + '</div>' +
        '<div class="ci-price-row"><span class="ci-price">Rs.' + item.price + '</span>' +
        '<span class="ci-mrp">Rs.' + (item.mrp || item.price) + '</span></div></div>' +
        '<div class="ci-qty"><div class="qty-bar">' +
        '<button class="qty-btn" onclick="Cart.changeQty('' + (item.id || item.productId) + '', -1)">-</button>' +
        '<input type="number" class="qty-input" value="' + (item.qty || 1) + '" ' +
        'onchange="Cart.setQty('' + (item.id || item.productId) + '', this.value)">' +
        '<button class="qty-btn" onclick="Cart.changeQty('' + (item.id || item.productId) + '', 1)">+</button></div></div></div>';
    }).join('');
  }
};
