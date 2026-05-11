/* ═══════════════════════════════════════════
   ADMIN/init.js - Admin Bootstrap
   ═══════════════════════════════════════════
   ALWAYS LOAD LAST.
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  function init() {
    AuthAdmin.checkAuth();

    // Global navigation handler
    document.querySelectorAll('.nav-item[data-section]').forEach(function(item) {
      item.addEventListener('click', function() {
        Navigation.goTo(this.dataset.section);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
