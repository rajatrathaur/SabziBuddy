/* ═══════════════════════════════════════════
   UI/auth-ui.js - OTP Input UI
   ═══════════════════════════════════════════

   OTP 6-box input handling, timer, paste support.
   ═══════════════════════════════════════════ */

window.AuthUI = {
  initOTPInputs: function() {
    var boxes = document.querySelectorAll('.otp-box');
    boxes.forEach(function(box, i) {
      box.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0,1);
        if (this.value && i < boxes.length - 1) boxes[i+1].focus();
      });
      box.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value && i > 0) boxes[i-1].focus();
      });
      box.addEventListener('paste', function(e) {
        e.preventDefault();
        var data = e.clipboardData.getData('text').replace(/\D/g, '').slice(0,6);
        data.split('').forEach(function(d, j) { if (boxes[j]) boxes[j].value = d; });
        if (boxes[Math.min(data.length, 5)]) boxes[Math.min(data.length, 5)].focus();
      });
    });
  },

  startResendTimer: function() {
    var btn = document.getElementById('resend-otp-btn');
    var timerEl = document.getElementById('otp-timer');
    var seconds = APP_CONSTANTS ? APP_CONSTANTS.OTP_RESEND_SECONDS : 30;

    if (btn) btn.disabled = true;

    var interval = setInterval(function() {
      seconds--;
      if (timerEl) timerEl.textContent = '(' + seconds + 's)';
      if (seconds <= 0) {
        clearInterval(interval);
        if (btn) btn.disabled = false;
        if (timerEl) timerEl.textContent = '';
      }
    }, 1000);

    return interval;
  },

  getOTPValue: function() {
    var val = '';
    document.querySelectorAll('.otp-box').forEach(function(box) { val += box.value; });
    return val;
  },

  clearOTP: function() {
    document.querySelectorAll('.otp-box').forEach(function(box) { box.value = ''; });
  },

  updateProfileIcon: function(user) {
    var icon = document.querySelector('.profile-icon-btn');
    if (icon && user && user.name) {
      icon.innerHTML = '<span style="font-size:14px;font-weight:700;color:#fff;">' + user.name.charAt(0).toUpperCase() + '</span>';
      icon.style.background = 'linear-gradient(135deg, var(--g2), var(--g4))';
    }
  }
};
