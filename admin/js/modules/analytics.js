/* ═══════════════════════════════════════════
   ADMIN/modules/analytics.js - Analytics
   ═══════════════════════════════════════════ */

window.AnalyticsAdmin = {
  load: function(period) {
    period = period || 7;
    var from = new Date();
    from.setDate(from.getDate() - period);

    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS)
      .where('createdAt', '>=', from)
      .get()
      .then(function(snap) {
        var total = 0, revenue = 0, delivered = 0;
        snap.forEach(function(doc) {
          var o = doc.data();
          total++;
          revenue += o.totals ? o.totals.total : 0;
          if (o.status === 'delivered') delivered++;
        });

        document.getElementById('ana-orders').textContent = total;
        document.getElementById('ana-revenue').textContent = AdminUtils.fmtCurrency(revenue);
        document.getElementById('ana-delivered').textContent = delivered;
        document.getElementById('ana-avg').textContent = total > 0 ? AdminUtils.fmtCurrency(revenue / total) : 'Rs.0';
      });
  }
};
