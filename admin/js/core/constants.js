/* ═══════════════════════════════════════════
   ADMIN/core/constants.js - Admin Constants
   ═══════════════════════════════════════════ */

window.ADMIN_CONSTANTS = {
  ROLES: { OWNER: 'owner', MANAGER: 'manager', DELIVERY: 'delivery' },
  ORDER_STATUS: ['pending', 'assigned', 'delivered', 'cancelled'],
  SLOT_GROUPS: ['today-morning', 'today-evening', 'tomorrow-morning', 'tomorrow-evening', 'other'],
  COLLECTIONS: {
    PRODUCTS: 'products', ORDERS: 'orders', USERS: 'users',
    USER_ROLES: 'userRoles', DELIVERY_BOYS: 'deliveryBoys',
    ATTENDANCE: 'attendance', COUPONS: 'coupons', CONFIG: 'config'
  }
};
