/* ═══════════════════════════════════════════
   MODULES/address-book.js - Saved Addresses
   ═══════════════════════════════════════════ */

window.AddressBook = {
  addresses: [],

  load: function() {
    this.addresses = appStorage.get(APP_CONSTANTS.STORAGE_KEYS.ADDRESSES, []);
    return this.addresses;
  },

  save: function(address) {
    this.addresses.push(address);
    appStorage.set(APP_CONSTANTS.STORAGE_KEYS.ADDRESSES, this.addresses);
    Toast.success('Address saved');
  },

  render: function(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    if (this.addresses.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--tmut);padding:20px;">No saved addresses</p>';
      return;
    }

    container.innerHTML = this.addresses.map(function(a, i) {
      return '<div class="address-card" style="padding:12px;background:#fff;border-radius:12px;margin-bottom:8px;">' +
        '<div style="font-weight:600;font-size:13px;">' + a.label + '</div>' +
        '<div style="font-size:12px;color:var(--tm);margin-top:4px;">' + a.address + '</div>' +
      '</div>';
    }).join('');
  }
};
