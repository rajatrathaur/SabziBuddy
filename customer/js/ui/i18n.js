/* ═══════════════════════════════════════════
   UI/i18n.js - Multi-Language Support
   ═══════════════════════════════════════════ */

window.TRANSLATIONS = {
  en: {
    searchPlaceholder: 'Search for veggies, fruits...',
    addToCart: 'Add to Cart',
    checkout: 'Checkout',
    placeOrder: 'Place Order',
    myOrders: 'My Orders',
    myWishlist: 'My Wishlist',
    myProfile: 'My Profile',
    logout: 'Logout',
    login: 'Login'
  },
  hi: {
    searchPlaceholder: 'सब्जी, फल खोजें...',
    addToCart: 'कार्ट में डालें',
    checkout: 'चेकआउट',
    placeOrder: 'ऑर्डर दें',
    myOrders: 'मेरे ऑर्डर',
    myWishlist: 'मेरी विशलिस्ट',
    myProfile: 'मेरी प्रोफाइल',
    logout: 'लॉगआउट',
    login: 'लॉगिन'
  }
};

window.I18n = {
  setLanguage: function(lang) {
    window.appState.language = lang;
    appStorage.set(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE, lang);
    this.apply();
  },

  apply: function() {
    var t = TRANSLATIONS[window.appState.language] || TRANSLATIONS.en;
    var search = document.getElementById('search');
    if (search) search.placeholder = t.searchPlaceholder || '';
  },

  t: function(key) {
    var t = TRANSLATIONS[window.appState.language] || TRANSLATIONS.en;
    return t[key] || key;
  }
};
