/* ═══════════════════════════════════════════
   UI/celebration.js - Celebration Effects
   ═══════════════════════════════════════════

   Confetti + emoji rain on order success.
   ═══════════════════════════════════════════ */

window.Celebration = {
  fire: function() {
    this._confetti();
    this._emojiRain();
  },

  _confetti: function() {
    var colors = ['#4A8B5C', '#6BBF7B', '#C8704A', '#FFD700', '#FF6B9D', '#64B5F6'];
    var container = document.getElementById('confetti-container') || document.body;

    for (var i = 0; i < 50; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.top = '-10px';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      container.appendChild(piece);
      setTimeout(function(p) { if (p.parentNode) p.parentNode.removeChild(p); }.bind(null, piece), 4500);
    }
  },

  _emojiRain: function() {
    var emojis = ['🎉', '✨', '🥳', '🎊', '💖', '🌟', '🎈', '🎁'];
    var container = document.body;

    for (var i = 0; i < 20; i++) {
      var el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = 'position:fixed;left:' + Math.random() * 100 + 
        '%;top:-30px;font-size:' + (20 + Math.random() * 20) + 'px;z-index:99;pointer-events:none;animation:confettiFall ' + 
        (2 + Math.random() * 2) + 's linear forwards;animation-delay:' + (Math.random() * 0.5) + 's;';
      container.appendChild(el);
      setTimeout(function(e) { if (e.parentNode) e.parentNode.removeChild(e); }.bind(null, el), 4500);
    }
  }
};
