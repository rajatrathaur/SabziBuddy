/* ═══════════════════════════════════════════
   ADMIN/modules/coupons.js - Coupon Manager
   ═══════════════════════════════════════════ */

window.CouponsAdmin = {
  load: function() {
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.COUPONS).orderBy('createdAt', 'desc').get()
      .then(function(snap) {
        var coupons = [];
        snap.forEach(function(doc) { coupons.push({ id: doc.id, ...doc.data() }); });
        adminState.coupons = coupons;
        CouponsAdmin.render(coupons);
        CouponsAdmin.updateStats(coupons);
      });
  },

  render: function(coupons) {
    var tbody = document.querySelector('#coupons-table tbody');
    if (!tbody) return;

    tbody.innerHTML = coupons.map(function(c) {
      var now = new Date();
      var expiry = c.expiry ? c.expiry.toDate() : null;
      var isExpired = expiry && now > expiry;
      var status = !c.active ? 'inactive' : isExpired ? 'expired' : c.usedCount >= c.maxUses ? 'full' : 'active';

      return '<tr>' +
        '<td><strong>' + c.code + '</strong></td>' +
        '<td>Rs.' + c.discount + '</td>' +
        '<td>' + c.usedCount + ' / ' + c.maxUses + '</td>' +
        '<td>' + (expiry ? AdminUtils.fmtDate(expiry) : 'No expiry') + '</td>' +
        '<td>' + AdminUtils.statusBadge(status) + '</td>' +
        '<td><button class="btn btn-secondary" onclick="CouponsAdmin.toggleActive('' + c.id + '', ' + !c.active + ')">' + (c.active ? 'Deactivate' : 'Activate') + '</button></td>' +
      '</tr>';
    }).join('');
  },

  updateStats: function(coupons) {
    var set = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
    set('stat-total-coupons', coupons.length);
    set('stat-active-coupons', coupons.filter(function(c) { return c.active; }).length);
    set('stat-total-uses', coupons.reduce(function(s, c) { return s + (c.usedCount || 0); }, 0));
  },

  create: function() {
    var code = document.getElementById('coupon-code').value.trim().toUpperCase();
    var discount = parseFloat(document.getElementById('coupon-discount').value);
    var maxUses = parseInt(document.getElementById('coupon-max-uses').value) || 100;
    var expiryDate = document.getElementById('coupon-expiry').value;
    var minOrder = parseFloat(document.getElementById('coupon-min-order').value) || 0;

    if (!code || !discount) { AdminToast.error('Code and discount required'); return; }

    var data = {
      code: code,
      discount: discount,
      maxUses: maxUses,
      usedCount: 0,
      active: true,
      minOrder: minOrder,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (expiryDate) {
      data.expiry = firebase.firestore.Timestamp.fromDate(new Date(expiryDate));
    }

    db.collection(ADMIN_CONSTANTS.COLLECTIONS.COUPONS).add(data)
      .then(function() { AdminToast.success('Coupon created'); CouponsAdmin.load(); })
      .catch(function(err) { AdminToast.error(err.message); });
  },

  toggleActive: function(id, active) {
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.COUPONS).doc(id).update({ active: active })
      .then(function() { CouponsAdmin.load(); });
  },

  deleteCoupon: function(id) {
    if (!confirm('Delete this coupon?')) return;
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.COUPONS).doc(id).delete()
      .then(function() { CouponsAdmin.load(); AdminToast.success('Deleted'); });
  }
};
