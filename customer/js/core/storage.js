/* ═══════════════════════════════════════════
   CORE/storage.js - localStorage Wrapper
   ═══════════════════════════════════════════

   Safe localStorage with try-catch.
   No DOM, No Firebase.
   ═══════════════════════════════════════════ */

window.appStorage = {
  get: function(key, fallback) {
    try { var v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
    catch(e) { return fallback; }
  },
  set: function(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch(e) { console.warn('Storage error:', e); return false; }
  },
  remove: function(key) {
    try { localStorage.removeItem(key); return true; }
    catch(e) { return false; }
  },
  clear: function() {
    try { localStorage.clear(); return true; }
    catch(e) { return false; }
  }
};
