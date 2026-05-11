/* ═══════════════════════════════════════════
   ADMIN/core/utils.js - Admin Utilities
   ═══════════════════════════════════════════ */

window.AdminUtils = {
  fmtDate: function(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); },
  fmtTime: function(d) { return new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); },
  fmtCurrency: function(n) { return 'Rs.' + Math.round(n).toLocaleString('en-IN'); },
  statusBadge: function(status) { return '<span class="status-badge ' + status + '">' + status + '</span>'; },
  uid: function() { return 'ID' + Date.now().toString(36).toUpperCase(); }
};
