/* ═══════════════════════════════════════════
   HANDLERS/network.js - Online/Offline
   ═══════════════════════════════════════════ */

window.Network = {
  isOnline: navigator.onLine,

  init: function() {
    window.addEventListener('online', function() { Network.isOnline = true; Toast.success('Back online'); });
    window.addEventListener('offline', function() { Network.isOnline = false; Toast.error('You are offline'); });
  }
};
