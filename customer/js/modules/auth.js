/* ═══════════════════════════════════════════
   MODULES/auth.js - OTP Authentication
   ═══════════════════════════════════════════

   Handles: Send OTP, Verify OTP, Resend OTP,
   Login state, Logout.
   ═══════════════════════════════════════════ */

window.Auth = {
  confirmationResult: null,
  currentPhone: null,

  sendOTP: function(phone) {
    this.currentPhone = phone;
    // Firebase Phone Auth implementation
    // Uses Firebase RecaptchaVerifier
    var appVerifier = new firebase.auth.RecaptchaVerifier('send-otp-btn', { size: 'invisible' });
    return firebase.auth().signInWithPhoneNumber('+91' + phone, appVerifier)
      .then(function(result) {
        Auth.confirmationResult = result;
        return { success: true };
      })
      .catch(function(error) {
        console.error('OTP send error:', error);
        return { success: false, error: error.message };
      });
  },

  verifyOTP: function(otp) {
    if (!this.confirmationResult) return Promise.resolve({ success: false, error: 'No OTP sent' });
    return this.confirmationResult.confirm(otp)
      .then(function(result) {
        var user = result.user;
        window.appState.user = { uid: user.uid, phone: user.phoneNumber };
        window.appState.isLoggedIn = true;
        appStorage.set(APP_CONSTANTS.STORAGE_KEYS.USER, window.appState.user);
        return { success: true, user: user };
      })
      .catch(function(error) {
        console.error('OTP verify error:', error);
        return { success: false, error: error.message };
      });
  },

  logout: function() {
    return firebase.auth().signOut().then(function() {
      window.appState.user = null;
      window.appState.isLoggedIn = false;
      appStorage.remove(APP_CONSTANTS.STORAGE_KEYS.USER);
      appStorage.remove(APP_CONSTANTS.STORAGE_KEYS.CART);
      window.location.reload();
    });
  },

  checkLoginState: function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.appState.user = { uid: user.uid, phone: user.phoneNumber };
        window.appState.isLoggedIn = true;
      }
    });
  }
};
