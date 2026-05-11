/* ═══════════════════════════════════════════
   CORE/state.js - Global State
   ═══════════════════════════════════════════
   
   Purpose: All mutable global state in one object.
   No DOM, No Firebase - just data storage.
   
   Access: window.appState
   ═══════════════════════════════════════════ */

window.appState = {
  // User
  user: null,
  isLoggedIn: false,

  // Cart
  cart: [],
  cartTotal: 0,
  cartCount: 0,

  // Wishlist
  wishlist: [],

  // Products
  allProducts: [],
  currentCategory: 'all',
  currentSubCategory: 'All',

  // UI State
  language: 'en',
  isCartOpen: false,
  isProfileOpen: false,
  isMapOpen: false,
  searchQuery: '',

  // Order
  selectedSlot: null,
  deliveryLocation: null,
  appliedCoupon: null,

  // Loading
  isLoading: false,
  productsLoaded: false
};
