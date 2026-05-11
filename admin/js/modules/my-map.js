/* ═══════════════════════════════════════════
   ADMIN/modules/my-map.js - Boy's Route
   ═══════════════════════════════════════════ */

window.MyMap = {
  map: null,

  load: function() {
    if (!this.map) {
      this.map = L.map('my-route-map').setView([25.5941, 85.1376], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap'
      }).addTo(this.map);
    }

    // Filter my assigned orders
    var myOrders = adminState.orders.filter(function(o) { return o.assignedTo === adminState.boyId && o.status !== 'delivered'; });

    // Add numbered markers
    myOrders.forEach(function(o, i) {
      if (o.location && o.location.lat && o.location.lng) {
        var num = i + 1;
        var icon = L.divIcon({
          html: '<div style="width:28px;height:28px;background:#3b82f6;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.2);">' + num + '</div>',
          className: '',
          iconSize: [28, 28]
        });
        L.marker([o.location.lat, o.location.lng], { icon: icon })
          .addTo(MyMap.map)
          .bindPopup(o.orderId + '<br>' + (o.customer ? o.customer.address : ''));
      }
    });
  }
};
