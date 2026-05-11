/* ═══════════════════════════════════════════
   MODULES/order.js - Order Placement
   ═══════════════════════════════════════════ */

window.Order = {
  place: function(formData) {
    if (!this._validate(formData)) return Promise.resolve(false);

    var orderId = 'ORD' + Date.now().toString(36).toUpperCase();
    var deliveryPin = Math.floor(1000 + Math.random() * 9000).toString();

    var order = {
      orderId: orderId,
      customer: {
        name: formData.name,
        phone: formData.phone,
        altPhone: formData.altPhone || '',
        address: formData.address
      },
      location: window.appState.deliveryLocation,
      items: window.appState.cart.map(function(c) { return { productId: c.id, name: c.name, qty: c.qty, price: c.price }; }),
      slot: window.appState.selectedSlot,
      coupon: window.appState.appliedCoupon,
      totals: {
        subtotal: window.appState.cartTotal,
        discount: window.appState.appliedCoupon ? window.appState.appliedCoupon.discount : 0,
        delivery: window.appState.cartTotal >= APP_CONSTANTS.FREE_DELIVERY_THRESHOLD ? 0 : APP_CONSTANTS.DELIVERY_FEE,
        total: window.appState.cartTotal - (window.appState.appliedCoupon ? window.appState.appliedCoupon.discount : 0)
      },
      deliveryPin: deliveryPin,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    return db.collection(APP_CONSTANTS.COLLECTIONS.ORDERS).doc(orderId).set(order)
      .then(function() {
        Cart.clear();
        Order.showThankYou(orderId, deliveryPin);
        return true;
      })
      .catch(function(err) { Toast.error('Order failed: ' + err.message); return false; });
  },

  _validate: function(data) {
    if (!Validators.name(data.name)) { Toast.error('Please enter your name'); return false; }
    if (!Validators.phone(data.phone)) { Toast.error('Please enter valid phone number'); return false; }
    if (!Validators.required(data.address)) { Toast.error('Please enter delivery address'); return false; }
    if (!window.appState.selectedSlot) { Toast.error('Please select a delivery slot'); return false; }
    if (window.appState.cartTotal < APP_CONSTANTS.MIN_ORDER) {
      Toast.error('Minimum order Rs.' + APP_CONSTANTS.MIN_ORDER); return false;
    }
    return true;
  },

  showThankYou: function(orderId, pin) {
    var ov = document.querySelector('.thankyou-overlay');
    if (ov) {
      ov.classList.add('show');
      var oid = ov.querySelector('.order-id-display');
      if (oid) oid.textContent = orderId;
      var dp = ov.querySelector('.delivery-pin code');
      if (dp) dp.textContent = pin;
    }
    Celebration.fire();
  },

  closeThankYou: function() {
    var ov = document.querySelector('.thankyou-overlay');
    if (ov) ov.classList.remove('show');
    document.getElementById('order-page').classList.add('hidden');
  }
};
