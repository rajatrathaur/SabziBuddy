/* ═══════════════════════════════════════════
   ADMIN/ui/modals.js - Admin Modals
   ═══════════════════════════════════════════ */

window.AdminModal = {
  open: function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  },
  close: function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  },
  openProductModal: function(product) {
    if (product) {
      document.getElementById('prod-name').value = product.name || '';
      document.getElementById('prod-hindi').value = product.nameHindi || '';
      document.getElementById('prod-mrp').value = product.mrp || '';
      document.getElementById('prod-price').value = product.price || '';
      document.getElementById('prod-stock').value = product.stock || 0;
      document.getElementById('prod-cat').value = product.category || '';
      document.getElementById('prod-id').value = product.id || '';
    } else {
      document.getElementById('prod-form').reset();
      document.getElementById('prod-id').value = '';
    }
    this.open('prod-modal');
  }
};
