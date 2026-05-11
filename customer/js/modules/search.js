/* ═══════════════════════════════════════════
   MODULES/search.js - Search Functionality
   ═══════════════════════════════════════════ */

window.Search = {
  timeout: null,

  init: function() {
    var input = document.getElementById('search');
    if (!input) return;

    input.addEventListener('input', function() {
      clearTimeout(Search.timeout);
      var query = this.value.trim();
      Search.timeout = setTimeout(function() { Search.execute(query); }, 300);
    });

    input.addEventListener('focus', function() { document.getElementById('search-suggestions').classList.add('active'); });
  },

  execute: function(query) {
    window.appState.searchQuery = query;
    var filtered = Products.filter(window.appState.currentCategory, window.appState.currentSubCategory, query);
    Products.render('products-grid', filtered);
  },

  clear: function() {
    var input = document.getElementById('search');
    if (input) input.value = '';
    window.appState.searchQuery = '';
    var filtered = Products.filter(window.appState.currentCategory, window.appState.currentSubCategory);
    Products.render('products-grid', filtered);
  },

  voice: function() {
    if (!('webkitSpeechRecognition' in window)) { Toast.error('Voice search not supported'); return; }
    var rec = new webkitSpeechRecognition();
    rec.lang = window.appState.language === 'hi' ? 'hi-IN' : 'en-IN';
    rec.onresult = function(e) {
      var text = e.results[0][0].transcript;
      var input = document.getElementById('search');
      if (input) input.value = text;
      Search.execute(text);
    };
    rec.start();
  }
};
