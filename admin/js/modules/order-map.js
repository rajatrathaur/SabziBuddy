/* ═══════════════════════════════════════════
   ADMIN/modules/order-map.js - Order Map View
   ═══════════════════════════════════════════ */

window.OrderMap = {
  map: null,
  markers: [],

  load: function() {
    if (!this.map) {
      this.map = L.map('order-map-view').setView([25.5941, 85.1376], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap'
      }).addTo(this.map);
    }

    // Clear existing markers
    this.markers.forEach(function(m) { this.map.removeLayer(m); }.bind(this));
    this.markers = [];

    // Add order markers
    adminState.orders.forEach(function(o) {
      if (o.location && o.location.lat && o.location.lng) {
        var color = o.status === 'delivered' ? 'green' : o.status === 'assigned' ? 'blue' : 'orange';
        var marker = L.circleMarker([o.location.lat, o.location.lng], {
          radius: 8,
          fillColor: color,
          color: '#fff',
          weight: 2,
          fillOpacity: 0.8
        }).addTo(this.map);
        marker.bindPopup('<b>' + o.orderId + '</b><br>' + (o.customer ? o.customer.name : '') + '<br>Rs.' + (o.totals ? o.totals.total : 0));
        this.markers.push(marker);
      }
    }.bind(this));
  }
};
