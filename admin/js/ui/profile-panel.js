/* ═══════════════════════════════════════════
   ADMIN/ui/profile-panel.js - Boy Profile Drawer
   ═══════════════════════════════════════════ */

window.ProfilePanel = {
  open: function() {
    var panel = document.getElementById('boy-profile-panel');
    if (panel) panel.classList.remove('hidden');
  },
  close: function() {
    var panel = document.getElementById('boy-profile-panel');
    if (panel) panel.classList.add('hidden');
  }
};
