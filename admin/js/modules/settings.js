/* ═══════════════════════════════════════════
   ADMIN/modules/settings.js - Site Settings
   ═══════════════════════════════════════════ */

window.Settings = {
  load: function() {
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.CONFIG).doc('siteSettings').get()
      .then(function(doc) {
        if (doc.exists) {
          var data = doc.data();
          document.getElementById('set-fd-threshold').value = data.freeDeliveryThreshold || 99;
          document.getElementById('set-delivery-fee').value = data.deliveryFee || 20;
          document.getElementById('set-delivery-discount').value = data.deliveryFeeDiscount || 0;
          document.getElementById('set-min-order').value = data.minOrder || 99;
          document.getElementById('set-wa-number').value = data.whatsappNumber || '917900684615';
        }
      });
  },

  save: function() {
    var data = {
      freeDeliveryThreshold: parseFloat(document.getElementById('set-fd-threshold').value) || 99,
      deliveryFee: parseFloat(document.getElementById('set-delivery-fee').value) || 20,
      deliveryFeeDiscount: parseFloat(document.getElementById('set-delivery-discount').value) || 0,
      minOrder: parseFloat(document.getElementById('set-min-order').value) || 99,
      whatsappNumber: document.getElementById('set-wa-number').value,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection(ADMIN_CONSTANTS.COLLECTIONS.CONFIG).doc('siteSettings').set(data)
      .then(function() { AdminToast.success('Settings saved'); })
      .catch(function(err) { AdminToast.error(err.message); });
  }
};
