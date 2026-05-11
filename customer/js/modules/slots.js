/* ═══════════════════════════════════════════
   MODULES/slots.js - Delivery Slot Management
   ═══════════════════════════════════════════ */

window.Slots = {
  generate: function() {
    var slots = [];
    var now = new Date();
    var h = now.getHours();

    var today = new Date(now);
    var tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    var fmt = function(d) { return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); };

    if (h < 12) slots.push({ id: 'today-morning', label: 'Morning', date: fmt(today), time: '7AM - 12PM', group: 'today-morning' });
    slots.push({ id: 'today-evening', label: 'Evening', date: fmt(today), time: '4PM - 9PM', group: 'today-evening' });
    slots.push({ id: 'tomorrow-morning', label: 'Morning', date: fmt(tomorrow), time: '7AM - 12PM', group: 'tomorrow-morning' });
    slots.push({ id: 'tomorrow-evening', label: 'Evening', date: fmt(tomorrow), time: '4PM - 9PM', group: 'tomorrow-evening' });

    return slots;
  },

  render: function(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var slots = this.generate();

    container.innerHTML = slots.map(function(s) {
      return '<button class="slot-btn" data-slot="' + s.id + '" onclick="Slots.select(this)">' +
        '<div>' + s.label + '</div>' +
        '<div class="slot-date">' + s.date + ' | ' + s.time + '</div>' +
      '</button>';
    }).join('');
  },

  select: function(btn) {
    document.querySelectorAll('.slot-btn').forEach(function(b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    window.appState.selectedSlot = btn.dataset.slot;
  }
};
