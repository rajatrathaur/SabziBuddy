/* ═══════════════════════════════════════════
   ADMIN/modules/orders.js - Order Management
   ═══════════════════════════════════════════ */

window.Orders = {
  listener: null,

  load: function() {
    this.startListener();
  },

  startListener: function() {
    if (this.listener) this.listener();

    this.listener = db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS)
      .orderBy('createdAt', 'desc')
      .limit(100)
      .onSnapshot(function(snap) {
        var orders = [];
        snap.forEach(function(doc) { orders.push({ id: doc.id, ...doc.data() }); });
        adminState.orders = orders;
        Orders.render(orders);
        Orders.updateQuickStats(orders);
      }, function(err) {
        console.error('Orders listener error:', err);
        Orders.loadOnce();
      });
  },

  loadOnce: function() {
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS).orderBy('createdAt', 'desc').limit(100).get()
      .then(function(snap) {
        var orders = [];
        snap.forEach(function(doc) { orders.push({ id: doc.id, ...doc.data() }); });
        adminState.orders = orders;
        Orders.render(orders);
      });
  },

  render: function(orders) {
    var tbody = document.querySelector('#orders-table tbody');
    if (!tbody) return;

    tbody.innerHTML = orders.map(function(o) {
      var date = o.createdAt ? new Date(o.createdAt.toDate()).toLocaleDateString('en-IN') : '';
      return '<tr>' +
        '<td><input type="checkbox" value="' + o.id + '"></td>' +
        '<td>' + o.orderId + '</td>' +
        '<td>' + (o.customer ? o.customer.name : '') + '<br><small>' + (o.customer ? o.customer.phone : '') + '</small></td>' +
        '<td>' + (o.slot || '') + '</td>' +
        '<td>' + AdminUtils.fmtCurrency(o.totals ? o.totals.total : 0) + '</td>' +
        '<td>' + AdminUtils.statusBadge(o.status || 'pending') + '</td>' +
        '<td>' + date + '</td>' +
        '<td><select onchange="Orders.assignBoy('' + o.id + '', this.value)"><option value="">Assign</option>' + adminState.boys.map(function(b) { return '<option value="' + b.id + '">' + b.name + '</option>'; }).join('') + '</select></td>' +
      '</tr>';
    }).join('');
  },

  updateQuickStats: function(orders) {
    var p = 0, a = 0, d = 0, c = 0;
    orders.forEach(function(o) {
      if (o.status === 'pending') p++;
      else if (o.status === 'assigned') a++;
      else if (o.status === 'delivered') d++;
      else if (o.status === 'cancelled') c++;
    });
    var setText = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
    setText('stat-pending', p);
    setText('stat-assigned', a);
    setText('stat-delivered', d);
    setText('stat-cancelled', c);
  },

  assignBoy: function(orderId, boyId) {
    if (!boyId) return;
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS).doc(orderId).update({
      status: 'assigned',
      assignedTo: boyId,
      assignedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() { AdminToast.success('Assigned'); });
  },

  filter: function(status) {
    var filtered = status ? adminState.orders.filter(function(o) { return o.status === status; }) : adminState.orders;
    this.render(filtered);
  }
};
