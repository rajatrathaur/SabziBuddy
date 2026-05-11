/* ═══════════════════════════════════════════
   init.js - Application Bootstrap
   ═══════════════════════════════════════════

   Initialize app: load state, auth, products,
   set up event listeners. ALWAYS LOAD LAST.
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  function init() {
    // 1. Load saved state
    Cart.loadFromStorage();
    var savedWishlist = appStorage.get(APP_CONSTANTS.STORAGE_KEYS.WISHLIST, []);
    window.appState.wishlist = savedWishlist;
    var savedLang = appStorage.get(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE, 'en');
    window.appState.language = savedLang;

    // 2. Check auth state
    Auth.checkLoginState();

    // 3. Load products
    Products.load().then(function(products) {
      Products.render('products-grid', products);
    });

    // 4. Initialize UI components
    AuthUI.initOTPInputs();
    Search.init();
    I18n.apply();

    // 5. Initialize handlers
    BackHandler.init();
    Network.init();

    // 6. Set up listeners
    document.querySelectorAll('.top-cat-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var cat = this.dataset.cat;
        window.appState.currentCategory = cat;
        CategoryUI.setActive(cat);
        CategoryUI.renderSubCategories(cat);
        Products.render('products-grid', Products.filter(cat, 'All'));
      });
    });

    // 7. Hide splash after delay
    setTimeout(function() {
      var splash = document.getElementById('splash-screen');
      if (splash) splash.style.display = 'none';
    }, 1500);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
