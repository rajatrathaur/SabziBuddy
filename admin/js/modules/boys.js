/* ═══════════════════════════════════════════
   ADMIN/modules/boys.js - Delivery Boys
   ═══════════════════════════════════════════ */

window.Boys = {
  load: function() {
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.DELIVERY_BOYS).get()
      .then(function(snap) {
        var boys = [];
        snap.forEach(function(doc) { boys.push({ id: doc.id, ...doc.data() }); });
        adminState.boys = boys;
        Boys.render(boys);
      });
  },

  render: function(boys) {
    var tbody = document.querySelector('#boys-table tbody');
    if (!tbody) return;

    tbody.innerHTML = boys.map(function(b) {
      return '<tr>' +
        '<td><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">' + (b.name ? b.name.charAt(0) : '?') + '</div></td>' +
        '<td><strong>' + b.name + '</strong><br><small>' + b.phone + '</small></td>' +
        '<td>' + (b.area || '') + '</td>' +
        '<td>' + (b.email || '') + '</td>' +
        '<td><button class="btn btn-secondary" onclick="Boys.editBoy('' + b.id + '')">Edit</button></td>' +
      '</tr>';
    }).join('');
  },

  save: function() {
    var id = document.getElementById('boy-id').value;
    var data = {
      name: document.getElementById('boy-name').value,
      phone: document.getElementById('boy-phone').value,
      area: document.getElementById('boy-area').value,
      email: document.getElementById('boy-email').value,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    var promise = id
      ? db.collection(ADMIN_CONSTANTS.COLLECTIONS.DELIVERY_BOYS).doc(id).update(data)
      : db.collection(ADMIN_CONSTANTS.COLLECTIONS.DELIVERY_BOYS).add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });

    promise.then(function() {
      AdminToast.success(id ? 'Boy updated' : 'Boy added');
      AdminModal.close('boy-modal');
      Boys.load();
    });
  },

  editBoy: function(id) {
    var boy = adminState.boys.find(function(b) { return b.id === id; });
    if (!boy) return;
    document.getElementById('boy-id').value = boy.id;
    document.getElementById('boy-name').value = boy.name || '';
    document.getElementById('boy-phone').value = boy.phone || '';
    document.getElementById('boy-area').value = boy.area || '';
    document.getElementById('boy-email').value = boy.email || '';
    AdminModal.open('boy-modal');
  }
};
