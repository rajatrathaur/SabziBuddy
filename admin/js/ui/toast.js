/* ═══════════════════════════════════════════
   ADMIN/ui/toast.js - Admin Toast
   ═══════════════════════════════════════════ */

window.AdminToast = {
  show: function(message, type) {
    var el = document.getElementById('admin-toast') || this._createContainer();
    var bg = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6';
    el.innerHTML = '<div style="padding:10px 18px;background:'+bg+';color:#fff;border-radius:8px;font-size:13px;font-weight:500;box-shadow:0 4px 16px rgba(0,0,0,0.15);">' + message + '</div>';
    clearTimeout(this._timer);
    this._timer = setTimeout(function() { if (el) el.innerHTML = ''; }, 3000);
  },
  success: function(m) { this.show(m, 'success'); },
  error: function(m) { this.show(m, 'error'); },
  info: function(m) { this.show(m, 'info'); },
  _createContainer: function() {
    var el = document.createElement('div');
    el.id = 'admin-toast';
    el.style.cssText = 'position:fixed;top:16px;right:16px;z-index:200;';
    document.body.appendChild(el);
    return el;
  }
};
