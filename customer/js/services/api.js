/* ═══════════════════════════════════════════
   SERVICES/api.js - Centralized API Wrapper
   ═══════════════════════════════════════════
   All Firebase calls go through this layer.
   ═══════════════════════════════════════════ */

window.API = {
  products: {
    getAll: function() { return db.collection(APP_CONSTANTS.COLLECTIONS.PRODUCTS).get(); },
    getById: function(id) { return db.collection(APP_CONSTANTS.COLLECTIONS.PRODUCTS).doc(id).get(); },
    subscribe: function(callback) { return db.collection(APP_CONSTANTS.COLLECTIONS.PRODUCTS).onSnapshot(callback); }
  },
  orders: {
    create: function(id, data) { return db.collection(APP_CONSTANTS.COLLECTIONS.ORDERS).doc(id).set(data); },
    getByPhone: function(phone) { return db.collection(APP_CONSTANTS.COLLECTIONS.ORDERS).where('customer.phone', '==', phone).get(); }
  },
  users: {
    get: function(uid) { return db.collection(APP_CONSTANTS.COLLECTIONS.USERS).doc(uid).get(); },
    set: function(uid, data) { return db.collection(APP_CONSTANTS.COLLECTIONS.USERS).doc(uid).set(data, { merge: true }); }
  }
};
