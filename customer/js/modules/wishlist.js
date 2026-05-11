/* ═══════════════════════════════════════════
   MODULES/wishlist.js - Wishlist
   ═══════════════════════════════════════════ */

window.Wishlist = {
  toggle: function(productId) {
    var idx = window.appState.wishlist.indexOf(productId);
    if (idx === -1) {
      if (window.appState.wishlist.length >= APP_CONSTANTS.MAX_WISHLIST) {
        Toast.error('Wishlist full (max ' + APP_CONSTANTS.MAX_WISHLIST + ')');
        return;
      }
      window.appState.wishlist.push(productId);
      Toast.success('Added to wishlist');
    } else {
      window.appState.wishlist.splice(idx, 1);
      Toast.info('Removed from wishlist');
    }
    appStorage.set(APP_CONSTANTS.STORAGE_KEYS.WISHLIST, window.appState.wishlist);
    this.updateUI();
  },

  updateUI: function() {
    document.querySelectorAll('.wish-btn').forEach(function(btn) {
      var id = btn.closest('.product-card') ? btn.closest('.product-card').dataset.id : null;
      if (id) btn.classList.toggle('wished', window.appState.wishlist.includes(id));
    });
    var badge = document.getElementById('wishlist-count');
    if (badge) {
      badge.textContent = window.appState.wishlist.length;
      badge.style.display = window.appState.wishlist.length > 0 ? 'flex' : 'none';
    }
  },

  renderPage: function() {
    var container = document.getElementById('wishlist-grid');
    if (!container) return;
    var wished = window.appState.allProducts.filter(function(p) { return window.appState.wishlist.includes(p.id); });
    Products.render(container.id, wished);
  }
};
