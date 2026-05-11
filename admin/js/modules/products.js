/* ═══════════════════════════════════════════
   ADMIN/modules/products.js - Product CRUD
   ═══════════════════════════════════════════ */

window.ProductsAdmin = {
  load: function() {
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.PRODUCTS).get()
      .then(function(snap) {
        var products = [];
        snap.forEach(function(doc) { products.push({ id: doc.id, ...doc.data() }); });
        adminState.products = products;
        ProductsAdmin.render(products);
      });
  },

  render: function(products) {
    var tbody = document.querySelector('#products-table tbody');
    if (!tbody) return;

    if (!products || products.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:20px;">No products</td></tr>';
      return;
    }

    tbody.innerHTML = products.map(function(p) {
      var stockPct = Math.min(100, (p.stock / 50) * 100);
      var stockColor = stockPct > 50 ? '#10b981' : stockPct > 20 ? '#f59e0b' : '#ef4444';
      return '<tr>' +
        '<td><img src="' + (p.image || '') + '" style="width:40px;height:40px;object-fit:cover;border-radius:4px;"></td>' +
        '<td><strong>' + p.name + '</strong><br><small>' + (p.nameHindi || '') + '</small></td>' +
        '<td>Rs.' + p.price + '<br><small style="text-decoration:line-through;">Rs.' + (p.mrp || p.price) + '</small></td>' +
        '<td><div style="width:60px;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="width:' + stockPct + '%;height:100%;background:' + stockColor + ';"></div></div></td>' +
        '<td>' + AdminUtils.statusBadge(p.available !== false ? 'active' : 'inactive') + '</td>' +
        '<td><button class="btn btn-secondary" onclick="AdminModal.openProductModal(adminState.products.find(p=>p.id==='' + p.id + ''))">Edit</button></td>' +
      '</tr>';
    }).join('');
  },

  save: function() {
    var id = document.getElementById('prod-id').value;
    var data = {
      name: document.getElementById('prod-name').value,
      nameHindi: document.getElementById('prod-hindi').value,
      mrp: parseFloat(document.getElementById('prod-mrp').value) || 0,
      price: parseFloat(document.getElementById('prod-price').value) || 0,
      stock: parseInt(document.getElementById('prod-stock').value) || 0,
      category: document.getElementById('prod-cat').value,
      images: ImageUpload.getSlotUrls(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    var promise = id
      ? db.collection(ADMIN_CONSTANTS.COLLECTIONS.PRODUCTS).doc(id).update(data)
      : db.collection(ADMIN_CONSTANTS.COLLECTIONS.PRODUCTS).add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });

    promise.then(function() {
      AdminToast.success(id ? 'Product updated' : 'Product added');
      AdminModal.close('prod-modal');
      ProductsAdmin.load();
    }).catch(function(err) {
      AdminToast.error(err.message);
    });
  },

  deleteProduct: function(id) {
    if (!confirm('Delete this product?')) return;
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.PRODUCTS).doc(id).delete()
      .then(function() { AdminToast.success('Deleted'); ProductsAdmin.load(); })
      .catch(function(err) { AdminToast.error(err.message); });
  }
};
