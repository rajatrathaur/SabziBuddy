/* ═══════════════════════════════════════════
   ADMIN/modules/attendance.js - Attendance
   ═══════════════════════════════════════════ */

window.Attendance = {
  load: function() {
    var date = document.getElementById('attendance-date').value;
    if (!date) { date = new Date().toISOString().split('T')[0]; document.getElementById('attendance-date').value = date; }

    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ATTENDANCE).where('date', '==', date).get()
      .then(function(snap) {
        var records = {};
        snap.forEach(function(doc) { var d = doc.data(); records[d.boyName] = d.status; });

        var tbody = document.querySelector('#attendance-table tbody');
        if (!tbody) return;

        tbody.innerHTML = adminState.boys.map(function(b) {
          var status = records[b.name] || 'absent';
          return '<tr>' +
            '<td>' + b.name + '</td>' +
            '<td><button class="btn ' + (status === 'present' ? 'btn-primary' : 'btn-secondary') + '" onclick="Attendance.setStatus('' + b.name + '', 'present')">Present</button></td>' +
            '<td><button class="btn ' + (status === 'absent' ? 'btn-danger' : 'btn-secondary') + '" onclick="Attendance.setStatus('' + b.name + '', 'absent')">Absent</button></td>' +
          '</tr>';
        }).join('');
      });
  },

  setStatus: function(boyName, status) {
    var date = document.getElementById('attendance-date').value;
    db.collection(ADMIN_CONSTANTS.COLLECTIONS.ATTENDANCE).doc(date + '_' + boyName).set({
      date: date,
      boyName: boyName,
      status: status
    }).then(function() { Attendance.load(); });
  },

  saveAll: function() {
    AdminToast.success('Attendance saved');
  }
};
