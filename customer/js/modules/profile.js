/* ═══════════════════════════════════════════
   MODULES/profile.js - User Profile
   ═══════════════════════════════════════════ */

window.Profile = {
  openPanel: function() {
    UIModal.open('profile-overlay', 'profile-panel');
    window.appState.isProfileOpen = true;
    this._updatePanelInfo();
  },

  closePanel: function() {
    UIModal.close('profile-overlay', 'profile-panel');
    window.appState.isProfileOpen = false;
  },

  save: function(data) {
    var user = window.appState.user;
    if (!user) { Toast.error('Please login first'); return Promise.resolve(false); }

    return db.collection(APP_CONSTANTS.COLLECTIONS.USERS).doc(user.uid).set(data, { merge: true })
      .then(function() {
        window.appState.user = { ...window.appState.user, ...data };
        appStorage.set(APP_CONSTANTS.STORAGE_KEYS.USER, window.appState.user);
        Toast.success('Profile saved');
        return true;
      })
      .catch(function(err) { Toast.error('Error saving profile'); return false; });
  },

  load: function() {
    var user = window.appState.user;
    if (!user || !user.uid) return Promise.resolve(null);
    return db.collection(APP_CONSTANTS.COLLECTIONS.USERS).doc(user.uid).get()
      .then(function(doc) {
        if (doc.exists) {
          window.appState.user = { ...window.appState.user, ...doc.data() };
          return window.appState.user;
        }
        return null;
      });
  },

  _updatePanelInfo: function() {
    var user = window.appState.user;
    var nameEl = document.getElementById('pp-name');
    var phoneEl = document.getElementById('pp-phone');
    var avatarEl = document.querySelector('.pp-avatar');

    if (nameEl) nameEl.textContent = user && user.name ? user.name : 'Guest';
    if (phoneEl) phoneEl.textContent = user && user.phone ? user.phone : '';
    if (avatarEl) {
      var initial = user && user.name ? user.name.charAt(0).toUpperCase() : 'G';
      avatarEl.textContent = initial;
    }
  }
};
