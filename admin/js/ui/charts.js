/* ═══════════════════════════════════════════
   ADMIN/ui/charts.js - Bar Charts
   ═══════════════════════════════════════════ */

window.Charts = {
  bar: function(containerId, labels, values, color) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var max = Math.max.apply(null, values);
    var html = '<div style="display:flex;align-items:flex-end;gap:8px;height:150px;padding:10px 0;">';

    labels.forEach(function(label, i) {
      var h = max > 0 ? (values[i] / max) * 100 : 0;
      html += '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">' +
        '<div style="font-size:10px;color:#6b7280;">' + values[i] + '</div>' +
        '<div style="width:100%;height:' + h + '%;background:' + (color || '#10b981') + ';border-radius:4px 4px 0 0;min-height:4px;transition:height 0.5s;"></div>' +
        '<div style="font-size:9px;color:#6b7280;white-space:nowrap;">' + label + '</div>' +
      '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
  }
};
