/* ═══════════════════════════════════════════
   ADMIN/modules/my-orders.js - Boy's Orders
   ═══════════════════════════════════════════ */

window.MyOrders = {
  listener: null,

  load: function() {
    if (!adminState.boyId) { AdminToast.error('No boy ID'); return; }

    this.startListener();
  },

  startListener: function() {
    if (this.listener) this.listener();

    this.listener = db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS)
      .where('assignedTo', '==', adminState.boyId)
      .onSnapshot(function(snap) {
        var orders = [];
        snap.forEach(function(doc) { orders.push({ id: doc.id, ...doc.data() }); });
        MyOrders.render(orders);
        MyOrders.updateCollectionBar(orders);
      });
  },

  render: function(orders) {
    var container = document.getElementById('my-orders-list');
    if (!container) return;

    if (orders.length === 0) {
      container.innerHTML = '<p style="text-align:center;padding:40px;color:#6b7280;">No assigned orders</p>';
      return;
    }

    container.innerHTML = orders.map(function(o) {
      return '<div style="background:#fff;border-radius:8px;padding:14px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">' +
          '<strong>' + o.orderId + '</strong>' + AdminUtils.statusBadge(o.status) + '</div>' +
        '<div style="font-size:13px;">' + (o.customer ? o.customer.name + ' - ' + o.customer.phone : '') + '</div>' +
        '<div style="font-size:12px;color:#6b7280;margin:4px 0;">' + (o.customer ? o.customer.address : '') + '</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">' +
          '<span style="font-weight:700;">' + AdminUtils.fmtCurrency(o.totals ? o.totals.total : 0) + '</span>' +
          '<button class="btn btn-primary" onclick="MyOrders.markDelivered('' + o.id + '', ' + (o.deliveryPin ? ''' + o.deliveryPin + ''' : 'null') + ')">Mark Delivered</button>' +
        '</div>' +
      '</div>';
    }).join('');
  },

  updateCollectionBar: function(orders) {
    var total = 0, collected = 0;
    orders.forEach(function(o) {
      if (o.totals) total += o.totals.total;
      if (o.status === 'delivered' && o.totals) collected += o.totals.total;
    });
    var remaining = total - collected;
    var pct = total > 0 ? (collected / total) * 100 : 0;

    var el = document.getElementById('collection-bar');
    if (el) {
      el.innerHTML = '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">' +
        '<span>Total: ' + AdminUtils.fmtCurrency(total) + '</span>' +
        '<span>Collected: ' + AdminUtils.fmtCurrency(collected) + '</span>' +
        '<span>Remaining: ' + AdminUtils.fmtCurrency(remaining) + '</span></div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%;"></div></div>';
    }
  },

  markDelivered: function(orderId, pin) {
    var enteredPin = prompt('Enter delivery PIN:');
    if (enteredPin !== pin) { AdminToast.error('Wrong PIN'); return; }

    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS).doc(orderId).update({
      status: 'delivered',
      deliveredAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() { AdminToast.success('Marked delivered'); });
  }
};
