/* ═══════════════════════════════════════════
   MODULES/coupon.js - Coupon/Discount System
   ═══════════════════════════════════════════ */

window.Coupon = {
  apply: function(code) {
    return db.collection(APP_CONSTANTS.COLLECTIONS.COUPONS)
      .where('code', '==', code.toUpperCase())
      .where('active', '==', true)
      .get()
      .then(function(snap) {
        if (snap.empty) { Toast.error('Invalid coupon code'); return null; }
        var coupon = snap.docs[0].data();
        var now = new Date();
        var expiry = coupon.expiry ? coupon.expiry.toDate() : null;

        if (expiry && now > expiry) { Toast.error('Coupon expired'); return null; }
        if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) { Toast.error('Coupon limit reached'); return null; }
        if (coupon.minOrder && window.appState.cartTotal < coupon.minOrder) {
          Toast.error('Min order Rs.' + coupon.minOrder + ' required'); return null;
        }

        window.appState.appliedCoupon = { id: snap.docs[0].id, ...coupon };
        Toast.success('Coupon applied! Save Rs.' + coupon.discount);
        return window.appState.appliedCoupon;
      })
      .catch(function(err) { Toast.error('Error applying coupon'); return null; });
  },

  remove: function() {
    window.appState.appliedCoupon = null;
    Toast.info('Coupon removed');
  },

  getDiscount: function() {
    return window.appState.appliedCoupon ? window.appState.appliedCoupon.discount : 0;
  }
};
