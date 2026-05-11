/* ═══════════════════════════════════════════
   CORE/utils.js - Utility Helpers
   ═══════════════════════════════════════════ */

window.Utils = {
  fmt: function(n) { return 'Rs.' + Math.round(n).toLocaleString('en-IN'); },
  debounce: function(fn, ms) { var t; return function() { clearTimeout(t); t = setTimeout(fn.bind(this, ...arguments), ms); }; },
  throttle: function(fn, ms) { var l=0; return function() { var n=Date.now(); if(n-l>=ms){l=n;fn.apply(this,arguments);} }; },
  uid: function() { return Date.now().toString(36)+Math.random().toString(36).slice(2,8).toUpperCase(); },
  clamp: function(v,min,max) { return Math.min(Math.max(v,min),max); },
  pick: function(obj, keys) { var r={}; keys.forEach(function(k){ if(obj[k]!==undefined) r[k]=obj[k]; }); return r; }
};
