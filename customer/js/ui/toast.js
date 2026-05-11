/* ═══════════════════════════════════════════
   UI/toast.js - Toast Notifications
   ═══════════════════════════════════════════

   Shows temporary toast messages at bottom.
   Methods: show(msg), success(msg), error(msg), info(msg)
   ═══════════════════════════════════════════ */

window.Toast = {
  _container: null,
  _timer: null,

  _ensureContainer: function() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.id = 'toast-container';
      this._container.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:200;display:flex;flex-direction:column;align-items:center;gap:8px;';
      document.body.appendChild(this._container);
    }
  },

  show: function(message, type) {
    this._ensureContainer();
    clearTimeout(this._timer);

    var el = document.createElement('div');
    var bg = type === 'error' ? '#DC2626' : type === 'success' ? '#16A34A' : '#1C3829';
    el.style.cssText = 'padding:10px 18px;border-radius:12px;background:'+bg+';color:#fff;font-size:13px;font-weight:500;box-shadow:0 4px 16px rgba(0,0,0,0.15);animation:fadeIn 0.3s ease;max-width:280px;text-align:center;';
    el.textContent = message;

    this._container.innerHTML = '';
    this._container.appendChild(el);

    this._timer = setTimeout(function() {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, window.APP_CONSTANTS ? APP_CONSTANTS.TOAST_DURATION : 2500);
  },

  success: function(msg) { this.show(msg, 'success'); },
  error: function(msg) { this.show(msg, 'error'); },
  info: function(msg) { this.show(msg, 'info'); }
};
