/* ═══════════════════════════════════════════
   MODULES/order-history.js - Past Orders
   ═══════════════════════════════════════════ */

window.OrderHistory = {
  load: function(userPhone) {
    if (!userPhone) return Promise.resolve([]);
    return db.collection(APP_CONSTANTS.COLLECTIONS.ORDERS)
      .where('customer.phone', '==', userPhone)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()
      .then(function(snap) {
        var orders = [];
        snap.forEach(function(doc) { orders.push({ id: doc.id, ...doc.data() }); });
        return orders;
      });
  },

  render: function(containerId, orders) {
    var container = document.getElementById(containerId);
    if (!container) return;

    if (!orders || orders.length === 0) {
      container.innerHTML = '<div class="no-products-state"><h3>No orders yet</h3><p>Your order history will appear here</p></div>';
      return;
    }

    container.innerHTML = orders.map(function(o) {
      var items = o.items ? o.items.map(function(i) { return i.name + ' x' + i.qty; }).join(', ') : '';
      var date = o.createdAt ? new Date(o.createdAt.toDate()).toLocaleDateString('en-IN') : '';
      return '<div class="order-card">' +
        '<div class="order-card-header"><span class="order-id">' + o.orderId + '</span>' +
        '<span class="order-status ' + (o.status || 'pending') + '">' + (o.status || 'Pending') + '</span></div>' +
        '<div class="order-items">' + items + '</div>' +
        '<div class="order-date">' + date + '</div>' +
        '<div class="order-card-footer"><span class="order-total">Rs.' + (o.totals ? o.totals.total : 0) + '</span></div>' +
      '</div>';
    }).join('');
  }
};
