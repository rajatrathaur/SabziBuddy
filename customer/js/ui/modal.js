/* ═══════════════════════════════════════════
   UI/modal.js - Modal Management
   ═══════════════════════════════════════════ */

window.UIModal = {
  open: function(overlayId, contentId) {
    var ov = document.getElementById(overlayId);
    if (ov) { ov.style.display = 'flex'; ov.classList.add('show'); }
    if (contentId) {
      var ct = document.getElementById(contentId);
      if (ct) setTimeout(function() { ct.classList.add('open'); }, 10);
    }
  },

  close: function(overlayId, contentId) {
    if (contentId) {
      var ct = document.getElementById(contentId);
      if (ct) ct.classList.remove('open');
    }
    setTimeout(function() {
      var ov = document.getElementById(overlayId);
      if (ov) { ov.style.display = 'none'; ov.classList.remove('show'); }
    }, contentId ? 300 : 0);
  },

  openBottomSheet: function(overlayId, sheetId) {
    this.open(overlayId, sheetId);
  },

  closeBottomSheet: function(overlayId, sheetId) {
    this.close(overlayId, sheetId);
  },

  showLoading: function(message) {
    var el = document.getElementById('loading-indicator');
    if (el) { el.style.display = 'flex'; el.querySelector('.loading-text').textContent = message || 'Loading...'; }
  },

  hideLoading: function() {
    var el = document.getElementById('loading-indicator');
    if (el) el.style.display = 'none';
  }
};
