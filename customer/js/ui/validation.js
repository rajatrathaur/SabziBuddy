/* ═══════════════════════════════════════════
   UI/validation.js - Form Validation Display
   ═══════════════════════════════════════════ */

window.UIValidation = {
  showFieldError: function(inputEl, message) {
    inputEl.style.borderColor = '#DC2626';
    inputEl.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.1)';

    var existing = inputEl.parentNode.querySelector('.field-error');
    if (existing) existing.remove();

    var err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'color:#DC2626;font-size:11px;margin-top:4px;display:block;';
    err.textContent = message;
    inputEl.parentNode.appendChild(err);
  },

  clearFieldError: function(inputEl) {
    inputEl.style.borderColor = '';
    inputEl.style.boxShadow = '';
    var existing = inputEl.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
  },

  clearAllErrors: function(formEl) {
    formEl.querySelectorAll('.field-error').forEach(function(el) { el.remove(); });
    formEl.querySelectorAll('input, textarea').forEach(function(el) {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    });
  }
};
