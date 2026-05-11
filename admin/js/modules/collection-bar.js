/* ═══════════════════════════════════════════
   ADMIN/modules/collection-bar.js - Collection
   ═══════════════════════════════════════════ */

window.CollectionBar = {
  render: function(total, collected, count) {
    var remaining = total - collected;
    var pct = total > 0 ? (collected / total) * 100 : 0;

    var el = document.getElementById('collection-bar');
    if (!el) return;

    el.innerHTML = '<div style="background:#fff;border-radius:8px;padding:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
        '<div><div style="font-size:11px;color:#6b7280;">Total</div><div style="font-size:18px;font-weight:700;">' + AdminUtils.fmtCurrency(total) + '</div></div>' +
        '<div><div style="font-size:11px;color:#6b7280;">Collected</div><div style="font-size:18px;font-weight:700;color:#10b981;">' + AdminUtils.fmtCurrency(collected) + '</div></div>' +
        '<div><div style="font-size:11px;color:#6b7280;">Remaining</div><div style="font-size:18px;font-weight:700;color:#ef4444;">' + AdminUtils.fmtCurrency(remaining) + '</div></div>' +
      '</div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%;"></div></div>' +
      '<div style="font-size:11px;color:#6b7280;margin-top:4px;text-align:right;">' + Math.round(pct) + '% collected (' + count + ' orders)</div>' +
    '</div>';
  }
};
