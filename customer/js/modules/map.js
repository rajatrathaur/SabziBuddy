/* ═══════════════════════════════════════════
   MODULES/map.js - Map Location Picker
   ═══════════════════════════════════════════ */

window.MapPicker = {
  map: null,
  marker: null,
  circle: null,
  selectedLat: null,
  selectedLng: null,
  selectedAddress: '',

  init: function() {
    var center = APP_CONSTANTS.DEFAULT_MAP_CENTER;
    this.map = L.map('map').setView(center, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.circle = L.circle(center, {
      radius: APP_CONSTANTS.DELIVERY_RADIUS_KM * 1000,
      className: 'leaflet-radius-circle',
      fillOpacity: 0.1
    }).addTo(this.map);

    this.map.on('move', function() {
      var c = MapPicker.map.getCenter();
      MapPicker.selectedLat = c.lat;
      MapPicker.selectedLng = c.lng;
    });

    this.selectedLat = center[0];
    this.selectedLng = center[1];
  },

  open: function() {
    document.getElementById('map-modal').classList.add('show');
    if (!this.map) { this.init(); }
    setTimeout(function() { if (MapPicker.map) MapPicker.map.invalidateSize(); }, 300);
  },

  close: function() {
    document.getElementById('map-modal').classList.remove('show');
  },

  confirm: function() {
    window.appState.deliveryLocation = {
      lat: this.selectedLat,
      lng: this.selectedLng,
      address: this.selectedAddress || 'Selected Location'
    };
    document.getElementById('dlr-city').textContent = 'Deliver Here';
    document.getElementById('dlr-addr-text').textContent = this.selectedAddress || 'Location selected';
    this.close();
    Toast.success('Location set');
  },

  search: function(query) {
    if (!query) return;
    var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query);
    fetch(url).then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.length > 0) {
          var r = data[0];
          var lat = parseFloat(r.lat), lng = parseFloat(r.lon);
          MapPicker.map.setView([lat, lng], 16);
          MapPicker.selectedLat = lat;
          MapPicker.selectedLng = lng;
          MapPicker.selectedAddress = r.display_name;
          document.getElementById('map-selected-addr').textContent = r.display_name;
        }
      });
  }
};
