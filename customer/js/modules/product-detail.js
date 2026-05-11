/* ═══════════════════════════════════════════
   MODULES/product-detail.js - Product Detail
   ═══════════════════════════════════════════ */

window.ProductDetail = {
  currentProduct: null,

  open: function(productId) {
    var product = window.appState.allProducts.find(function(p) { return p.id === productId; });
    if (!product) return;
    this.currentProduct = product;

    var page = document.getElementById('product-detail-page');
    if (!page) return;

    page.querySelector('.pd-name').textContent = product.nameHindi || product.name;
    page.querySelector('.pd-name-sub').textContent = product.name;
    page.querySelector('.pd-price').textContent = 'Rs.' + product.price;
    page.querySelector('.pd-mrp').textContent = 'Rs.' + (product.mrp || product.price);
    page.querySelector('.pd-save-badge').textContent = 'Save Rs.' + ((product.mrp || product.price) - product.price);

    var cartItem = window.appState.cart.find(function(c) { return c.id === productId; });
    var qtyInput = page.querySelector('.pd-sticky-cta .qty-input');
    if (qtyInput) qtyInput.value = cartItem ? cartItem.qty : 0;

    page.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },

  close: function() {
    var page = document.getElementById('product-detail-page');
    if (page) page.classList.add('hidden');
    document.body.style.overflow = '';
    this.currentProduct = null;
  }
};
