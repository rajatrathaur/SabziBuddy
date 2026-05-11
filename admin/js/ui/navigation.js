/* ═══════════════════════════════════════════
   ADMIN/ui/navigation.js - Sidebar + Mobile Nav
   ═══════════════════════════════════════════ */

window.Navigation = {
  goTo: function(sectionId) {
    document.querySelectorAll('.admin-section').forEach(function(s) { s.classList.add('hidden'); });
    var section = document.getElementById('sec-' + sectionId);
    if (section) section.classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
    var nav = document.querySelector('.nav-item[data-section="' + sectionId + '"]');
    if (nav) nav.classList.add('active');

    adminState.currentSection = sectionId;

    // Load section data
    if (sectionId === 'dashboard' && window.Dashboard) Dashboard.load();
    if (sectionId === 'products' && window.ProductsAdmin) ProductsAdmin.load();
    if (sectionId === 'orders' && window.Orders) Orders.load();
    if (sectionId === 'boys' && window.Boys) Boys.load();
    if (sectionId === 'analytics' && window.AnalyticsAdmin) AnalyticsAdmin.load();
    if (sectionId === 'attendance' && window.Attendance) Attendance.load();
    if (sectionId === 'settings' && window.Settings) Settings.load();
    if (sectionId === 'zone' && window.Zone) Zone.load();
    if (sectionId === 'myorders' && window.MyOrders) MyOrders.load();
    if (sectionId === 'mymap' && window.MyMap) MyMap.load();
    if (sectionId === 'verify' && window.VerifyPIN) VerifyPIN.reset();
    if (sectionId === 'map' && window.OrderMap) OrderMap.load();
  },

  toggleMobileSidebar: function() {
    document.querySelector('.admin-sidebar').classList.toggle('open');
  },

  setupRoleNav: function(role) {
    document.querySelectorAll('.nav-item').forEach(function(n) {
      var roles = n.dataset.roles;
      if (roles && !roles.split(',').includes(role)) n.classList.add('hidden');
    });
  }
};
