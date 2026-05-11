/* ═══════════════════════════════════════════
   MODULES/cart.js - Cart Management
   ═══════════════════════════════════════════ */

window.Cart = {
  add: function(product, qty) {
    qty = parseInt(qty) || 1;
    var existing = window.appState.cart.find(function(c) { return c.id === product.id; });

    if (existing) {
      existing.qty = Math.min(existing.qty + qty, APP_CONSTANTS.MAX_CART_QTY);
    } else {
      window.appState.cart.push({
        id: product.id,
        name: product.name,
        nameHindi: product.nameHindi,
        price: product.price,
        mrp: product.mrp || product.price,
        image: product.image,
        qty: qty
      });
    }

    this._save();
    this._updateState();
    CartUI.updateBadge(window.appState.cartCount);
    CartUI.updateTotal(window.appState.cartTotal);
    Toast.success(product.nameHindi || product.name + ' added to cart');
  },

  changeQty: function(productId, delta) {
    var item = window.appState.cart.find(function(c) { return c.id === productId; });
    if (!item) {
      if (delta > 0) {
        var product = window.appState.allProducts.find(function(p) { return p.id === productId; });
        if (product) this.add(product, 1);
      }
      return;
    }

    item.qty += delta;
    if (item.qty <= 0) {
      window.appState.cart = window.appState.cart.filter(function(c) { return c.id !== productId; });
    }

    this._save();
    this._updateState();
    CartUI.updateBadge(window.appState.cartCount);
    CartUI.updateTotal(window.appState.cartTotal);

    if (window.appState.isCartOpen) {
      CartUI.renderCartItems(window.appState.cart);
      CartUI.updateBillSummary(window.appState.cart);
      CartUI.updateFDBar(window.appState.cartTotal);
    }

    Products.render('products-grid', Products.filter(window.appState.currentCategory, window.appState.currentSubCategory));
  },

  setQty: function(productId, qty) {
    qty = parseInt(qty) || 0;
    if (qty <= 0) {
      window.appState.cart = window.appState.cart.filter(function(c) { return c.id !== productId; });
    } else {
      var item = window.appState.cart.find(function(c) { return c.id === productId; });
      if (item) {
        item.qty = Math.min(qty, APP_CONSTANTS.MAX_CART_QTY);
      } else {
        var product = window.appState.allProducts.find(function(p) { return p.id === productId; });
        if (product) this.add(product, qty);
        return;
      }
    }

    this._save();
    this._updateState();
    CartUI.updateBadge(window.appState.cartCount);
    CartUI.updateTotal(window.appState.cartTotal);

    if (window.appState.isCartOpen) {
      CartUI.renderCartItems(window.appState.cart);
      CartUI.updateBillSummary(window.appState.cart);
      CartUI.updateFDBar(window.appState.cartTotal);
    }

    Products.render('products-grid', Products.filter(window.appState.currentCategory, window.appState.currentSubCategory));
  },

  clear: function() {
    window.appState.cart = [];
    this._save();
    this._updateState();
    CartUI.updateBadge(0);
    CartUI.updateTotal(0);
    CartUI.renderCartItems([]);
    Toast.info('Cart cleared');
  },

  openPanel: function() {
    UIModal.open('cart-overlay', 'cart-panel');
    window.appState.isCartOpen = true;
    CartUI.renderCartItems(window.appState.cart);
    CartUI.updateBillSummary(window.appState.cart);
    CartUI.updateFDBar(window.appState.cartTotal);
  },

  closePanel: function() {
    UIModal.close('cart-overlay', 'cart-panel');
    window.appState.isCartOpen = false;
  },

  openCheckout: function() {
    if (window.appState.cart.length === 0) {
      Toast.error('Cart is empty');
      return;
    }
    this.closePanel();
    document.getElementById('order-page').classList.remove('hidden');
  },

  _save: function() {
    appStorage.set(APP_CONSTANTS.STORAGE_KEYS.CART, window.appState.cart);
  },

  _updateState: function() {
    window.appState.cartCount = window.appState.cart.reduce(function(s, c) { return s + (c.qty || 0); }, 0);
    window.appState.cartTotal = window.appState.cart.reduce(function(s, c) { return s + (c.price * (c.qty || 0)); }, 0);
  },

  loadFromStorage: function() {
    var saved = appStorage.get(APP_CONSTANTS.STORAGE_KEYS.CART, []);
    window.appState.cart = saved;
    this._updateState();
    CartUI.updateBadge(window.appState.cartCount);
    CartUI.updateTotal(window.appState.cartTotal);
  }
};
