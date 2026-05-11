/* ═══════════════════════════════════════════
   HANDLERS/backhandler.js - Back Button
   ═══════════════════════════════════════════ */

window.BackHandler = {
  stack: [],

  push: function(closeFn) { this.stack.push(closeFn); },

  pop: function() {
    if (this.stack.length > 0) { var fn = this.stack.pop(); fn(); return true; }
    return false;
  },

  init: function() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') BackHandler.pop();
    });
  }
};
