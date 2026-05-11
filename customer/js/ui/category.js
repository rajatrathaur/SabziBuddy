/* ═══════════════════════════════════════════
   UI/category.js - Category Tab Navigation
   ═══════════════════════════════════════════ */

window.CategoryUI = {
  setActive: function(categoryId) {
    document.querySelectorAll('.top-cat-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.cat === categoryId);
    });
    this.updateIndicator(categoryId);
  },

  updateIndicator: function(categoryId) {
    var active = document.querySelector('.top-cat-btn[data-cat="' + categoryId + '"]');
    var indicator = document.getElementById('cat-indicator');
    if (active && indicator) {
      indicator.style.left = active.offsetLeft + 'px';
      indicator.style.width = active.offsetWidth + 'px';
    }
  },

  scrollToCategory: function(categoryId) {
    var btn = document.querySelector('.top-cat-btn[data-cat="' + categoryId + '"]');
    if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  },

  renderSubCategories: function(categoryId) {
    var container = document.getElementById('sub-cat-row');
    if (!container) return;
    var subs = APP_CONSTANTS.SUB_CATEGORIES[categoryId] || ['All'];
    container.innerHTML = subs.map(function(s) {
      return '<button class="filter-btn' + (s === 'All' ? ' active' : '') + '" data-sub="' + s + '">' + s + '</button>';
    }).join('');
  }
};
