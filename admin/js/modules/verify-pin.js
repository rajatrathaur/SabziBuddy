/* ═══════════════════════════════════════════
   ADMIN/modules/verify-pin.js - PIN Verify
   ═══════════════════════════════════════════ */

window.VerifyPIN = {
  reset: function() {
    document.getElementById('verify-order-id').value = '';
    document.getElementById('verify-pin').value = '';
  },

  verify: function() {
    var orderId = document.getElementById('verify-order-id').value.trim();
    var pin = document.getElementById('verify-pin').value.trim();

    if (!orderId || !pin) { AdminToast.error('Enter order ID and PIN'); return; }

    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS).doc(orderId).get()
      .then(function(doc) {
        if (!doc.exists) { AdminToast.error('Order not found'); return; }
        var data = doc.data();
        if (data.deliveryPin === pin) {
          db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS).doc(orderId).update({
            status: 'delivered',
            deliveredAt: firebase.firestore.FieldValue.serverTimestamp()
          }).then(function() { AdminToast.success('Order verified & delivered!'); VerifyPIN.reset(); });
        } else {
          AdminToast.error('Invalid PIN');
        }
      });
  },

  cancelOrder: function() {
    var orderId = document.getElementById('verify-order-id').value.trim();
    var pin = document.getElementById('verify-cancel-pin').value.trim();

    if (!orderId || !pin) { AdminToast.error('Enter order ID and cancel PIN'); return; }

    // Verify cancel PIN (different from delivery PIN - provided by owner)
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS).doc(orderId).get()
      .then(function(doc) {
        if (!doc.exists) { AdminToast.error('Order not found'); return; }
        // Cancel PIN check - in real app, this would be validated against a stored cancel PIN
        db.collection(ADMIN_CONSTANTS.COLLECTIONS.ORDERS).doc(orderId).update({
          status: 'cancelled',
          cancelledAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() { AdminToast.success('Order cancelled'); VerifyPIN.reset(); });
      });
  }
};
