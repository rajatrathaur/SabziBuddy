/* ═══════════════════════════════════════════
   MODULES/products.js - Product Listing
   ═══════════════════════════════════════════

   Handles: Fetch products, render grid, search,
   filter by category, quantity controls.
   ═══════════════════════════════════════════ */

window.Products = {
  load: function() {
    return db.collection(APP_CONSTANTS.COLLECTIONS.PRODUCTS)
      .where('available', '==', true)
      .get()
      .then(function(snap) {
        var products = [];
        snap.forEach(function(doc) { products.push({ id: doc.id, ...doc.data() }); });
        window.appState.allProducts = products;
        window.appState.productsLoaded = true;
        return products;
      });
  },

  render: function(containerId, products) {
    var container = document.getElementById(containerId);
    if (!container) return;

    if (!products || products.length === 0) {
      container.innerHTML = '<div class="no-products-state"><h3>No products found</h3><p>Try different search or category</p></div>';
      return;
    }

    container.innerHTML = products.map(function(p) {
      var cartItem = window.appState.cart.find(function(c) { return c.id === p.id; });
      var qty = cartItem ? cartItem.qty : 0;
      var isWished = window.appState.wishlist.includes(p.id);

      return '<div class="product-card" data-id="' + p.id + '" onclick="ProductDetail.open(this.dataset.id)">' +
        '<div class="pc-img-wrap">' +
          '<img src="' + (p.image || 'assets/icons/icon-192.png') + '" class="pc-img" alt="' + p.name + '" loading="lazy">' +
          (p.stock <= 5 ? '<span class="pc-stock-badge ' + (p.stock === 0 ? 'out' : 'low') + '">' + (p.stock === 0 ? 'Out' : 'Low') + '</span>' : '') +
          '<button class="wish-btn ' + (isWished ? 'wished' : '') + '" onclick="event.stopPropagation(); Wishlist.toggle('' + p.id + '')">' +
            '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2"/></svg>' +
          '</button>' +
          (p.tag ? '<span class="pc-tag">' + p.tag + '</span>' : '') +
        '</div>' +
        '<div class="pc-info">' +
          '<div class="pc-name-hindi">' + (p.nameHindi || '') + '</div>' +
          '<div class="pc-name">' + p.name + '</div>' +
          '<div class="pc-price-row">' +
            '<span class="pc-price">Rs.' + p.price + '</span>' +
            '<span class="pc-mrp">Rs.' + (p.mrp || p.price) + '</span>' +
          '</div>' +
          '<div class="qty-bar">' +
            '<button class="qty-btn" onclick="event.stopPropagation(); Cart.changeQty('' + p.id + '', -1)">-</button>' +
            '<input type="number" class="qty-input" value="' + qty + '" onchange="event.stopPropagation(); Cart.setQty('' + p.id + '', this.value)">' +
            '<button class="qty-btn" onclick="event.stopPropagation(); Cart.changeQty('' + p.id + '', 1)">+</button>' +
            '<span class="pc-unit">' + (p.qty || '') + ' ' + (p.unit || '') + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  },

  filter: function(category, subCategory, search) {
    var products = window.appState.allProducts;

    if (category && category !== 'all') {
      products = products.filter(function(p) { return p.category === category; });
    }
    if (subCategory && subCategory !== 'All') {
      products = products.filter(function(p) { return p.subCategory === subCategory; });
    }
    if (search) {
      var q = search.toLowerCase();
      products = products.filter(function(p) {
        return (p.name && p.name.toLowerCase().includes(q)) ||
               (p.nameHindi && p.nameHindi.includes(q)) ||
               (p.searchKeywords && p.searchKeywords.some(function(k) { return k.toLowerCase().includes(q); }));
      });
    }

    return products;
  }
};
