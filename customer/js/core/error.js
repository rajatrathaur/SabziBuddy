/* ═══════════════════════════════════════════
   CORE/error.js - Error Handling
   ═══════════════════════════════════════════ */

window.ErrorHandler = {
  log: function(err, ctx) { console.error('[SabziBuddy Error' + (ctx ? ' | '+ctx : '') + ']:', err); },
  safe: function(fn, ctx) {
    return function() { try { return fn.apply(this, arguments); } catch(e) { ErrorHandler.log(e, ctx); } };
  },
  asyncSafe: function(fn, ctx) {
    return function() { return Promise.resolve().then(fn.bind(this, ...arguments)).catch(function(e){ ErrorHandler.log(e, ctx); }); };
  }
};
