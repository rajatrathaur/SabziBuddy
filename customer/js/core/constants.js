/* ═══════════════════════════════════════════
   CORE/constants.js - App Constants
   ═══════════════════════════════════════════
   
   Purpose: All app-wide constants in one place.
   No DOM, No Firebase - pure constants only.
   
   Change these values to modify app behavior globally.
   ═══════════════════════════════════════════ */

window.APP_CONSTANTS = {
  // Order thresholds
  MIN_ORDER: 99,
  FREE_DELIVERY_THRESHOLD: 99,
  DELIVERY_FEE: 20,

  // Limits
  MAX_WISHLIST: 99,
  MAX_NOTIFICATIONS: 99,
  MAX_CART_QTY: 99,

  // OTP
  OTP_LENGTH: 6,
  OTP_RESEND_SECONDS: 30,

  // Delivery PIN
  DELIVERY_PIN_LENGTH: 4,

  // Toast
  TOAST_DURATION: 2500,

  // Map
  DEFAULT_MAP_CENTER: [25.5941, 85.1376],
  DELIVERY_RADIUS_KM: 5,

  // Slots
  SLOT_GROUPS: [
    'today-morning',
    'today-evening',
    'tomorrow-morning',
    'tomorrow-evening',
    'other'
  ],

  // Storage keys
  STORAGE_KEYS: {
    CART: 'cart',
    WISHLIST: 'wishlist',
    USER: 'user',
    ADDRESSES: 'addresses',
    LANGUAGE: 'lang',
    CATEGORY: 'category',
    HIDE_FD: 'hideFreeDelivery',
    HIDE_BN: 'hideBottomNav',
    SKIP_LOGIN: 'skipLogin'
  },

  // Firebase collections
  COLLECTIONS: {
    PRODUCTS: 'products',
    ORDERS: 'orders',
    USERS: 'users',
    USER_ROLES: 'userRoles',
    DELIVERY_BOYS: 'deliveryBoys',
    ATTENDANCE: 'attendance',
    COUPONS: 'coupons',
    CONFIG: 'config'
  },

  // Categories
  CATEGORIES: [
    { id: 'all',         name: 'All',         nameHindi: 'सब',            icon: 'all.webp' },
    { id: 'veggie',      name: 'Veggies',     nameHindi: 'सब्ज़ियाँ',     icon: 'veggie.webp' },
    { id: 'fruit',       name: 'Fruits',      nameHindi: 'फल',            icon: 'fruit.webp' },
    { id: 'dairy',       name: 'Dairy',       nameHindi: 'डेयरी',         icon: 'dairy.webp' },
    { id: 'grocery',     name: 'Grocery',     nameHindi: 'किराना',        icon: 'grocery.webp' },
    { id: 'food',        name: 'Food',        nameHindi: 'खाद्य',         icon: 'food.webp' },
    { id: 'kitchen',     name: 'Kitchen',     nameHindi: 'रसोई',          icon: 'home-kitchen.webp' },
    { id: 'electronics', name: 'Electronics', nameHindi: 'इलेक्ट्रॉनिक्स', icon: 'electronics.webp' },
    { id: 'new',         name: 'New',         nameHindi: 'नया',           icon: 'new.webp' }
  ],

  // Sub-categories per category
  SUB_CATEGORIES: {
    all:           ['All'],
    veggie:        ['All', 'Leafy', 'Root', 'Exotic'],
    fruit:         ['All', 'Seasonal', 'Imported', 'Local'],
    dairy:         ['All', 'Milk', 'Cheese', 'Butter'],
    grocery:       ['All', 'Rice', 'Dal', 'Spices'],
    food:          ['All', 'Snacks', 'Beverages', 'Frozen'],
    kitchen:       ['All', 'Tools', 'Containers', 'Appliances'],
    electronics:   ['All', 'Mobile', 'Accessories', 'Gadgets'],
    new:           ['All']
  }
};
