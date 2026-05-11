/* ═══════════════════════════════════════════
   ADMIN/modules/zone.js - Zone Manager
   ═══════════════════════════════════════════ */

window.Zone = {
  load: function() {
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.CONFIG).doc('zoneSettings').get()
      .then(function(doc) {
        if (doc.exists) {
          var data = doc.data();
          document.getElementById('zone-price').value = data.price || 1;
          document.getElementById('zone-max').value = data.maxItems || 1;
        }
      });

    // Load zone products
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.PRODUCTS).where('zone', '==', true).get()
      .then(function(snap) {
        var container = document.getElementById('zone-items-list');
        if (!container) return;
        container.innerHTML = '';
        snap.forEach(function(doc) {
          var p = doc.data();
          container.innerHTML += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;background:#fff;border-radius:8px;margin-bottom:6px;">' +
            '<span>' + p.name + '</span>' +
            '<button class="btn btn-secondary" onclick="Zone.removeProduct('' + doc.id + '')">Remove</button>' +
          '</div>';
        });
      });
  },

  saveSettings: function() {
    var price = parseFloat(document.getElementById('zone-price').value) || 1;
    var maxItems = parseInt(document.getElementById('zone-max').value) || 1;
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.CONFIG).doc('zoneSettings').set({ price: price, maxItems: maxItems })
      .then(function() { AdminToast.success('Zone settings saved'); })
      .catch(function(err) { AdminToast.error(err.message); });
  },

  removeProduct: function(id) {
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.PRODUCTS).doc(id).update({ zone: false })
      .then(function() { Zone.load(); AdminToast.success('Removed from zone'); });
  }
};
