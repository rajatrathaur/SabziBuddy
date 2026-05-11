/* ═══════════════════════════════════════════
   CORE/validators.js - Pure Validation Functions
   ═══════════════════════════════════════════ */

window.Validators = {
  phone: function(p) { return /^\d{10}$/.test(String(p).replace(/\D/g,'').slice(-10)); },
  name: function(n) { return n && n.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(n.trim()); },
  pin: function(p) { return /^\d{4}$/.test(p); },
  required: function(v) { return v !== null && v !== undefined && String(v).trim() !== ''; },
  email: function(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
};
