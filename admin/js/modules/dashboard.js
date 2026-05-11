/* ═══════════════════════════════════════════
   ADMIN/modules/dashboard.js - Dashboard Stats
   ═══════════════════════════════════════════ */

window.Dashboard = {
  load: function() {
    var from = adminState.dateFrom || new Date();
    var to = adminState.dateTo || new Date();

    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS)
      .where('createdAt', '>=', from)
      .where('createdAt', '<=', to)
      .get()
      .then(function(snap) {
        var total = 0, delivered = 0, pending = 0, value = 0, collected = 0;
        snap.forEach(function(doc) {
          var o = doc.data();
          total++;
          value += o.totals ? o.totals.total : 0;
          if (o.status === 'delivered') { delivered++; if (o.totals) collected += o.totals.total; }
          else if (o.status === 'pending' || o.status === 'assigned') pending++;
        });

        document.getElementById('dash-total').textContent = total;
        document.getElementById('dash-delivered').textContent = delivered;
        document.getElementById('dash-pending').textContent = pending;
        document.getElementById('dash-value').textContent = AdminUtils.fmtCurrency(value);
        document.getElementById('dash-collected').textContent = AdminUtils.fmtCurrency(collected);
      });

    this._loadChart();
  },

  _loadChart: function() {
    var days = [];
    var values = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
      values.push(Math.floor(Math.random() * 20) + 5); // Replace with actual data
    }
    Charts.bar('dash-chart', days, values, '#10b981');
  },

  setToday: function() {
    adminState.dateFrom = new Date();
    adminState.dateTo = new Date();
    this.load();
  }
};
