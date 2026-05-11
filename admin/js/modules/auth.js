/* ═══════════════════════════════════════════
   ADMIN/modules/auth.js - Email/Password Auth
   ═══════════════════════════════════════════ */

window.AuthAdmin = {
  login: function(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
      .then(function(cred) {
        return db.collection(ADMIN_CONSTANTS.COLLECTIONS.USER_ROLES).doc(cred.user.uid).get();
      })
      .then(function(doc) {
        if (!doc.exists) throw new Error('No role assigned');
        var data = doc.data();
        adminState.role = data.role;
        adminState.boyId = data.boyId || null;
        adminState.boyName = data.name || cred.user.email;
        adminState.user = cred.user;
        Navigation.setupRoleNav(data.role);
        Navigation.goTo(data.role === ADMIN_CONSTANTS.ROLES.DELIVERY ? 'myorders' : 'dashboard');
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-app').classList.remove('hidden');
        AdminToast.success('Welcome, ' + adminState.boyName);
        return data.role;
      })
      .catch(function(err) {
        AdminToast.error(err.message);
        throw err;
      });
  },

  logout: function() {
    auth.signOut().then(function() {
      adminState.user = null;
      adminState.role = null;
      window.location.reload();
    });
  },

  checkAuth: function() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        db.collection(ADMIN_CONSTANTS.COLLECTIONS.USER_ROLES).doc(user.uid).get()
          .then(function(doc) {
            if (doc.exists) {
              var data = doc.data();
              adminState.role = data.role;
              adminState.boyId = data.boyId || null;
              adminState.boyName = data.name || user.email;
              adminState.user = user;
              Navigation.setupRoleNav(data.role);
              document.getElementById('login-screen').classList.add('hidden');
              document.getElementById('admin-app').classList.remove('hidden');
              Navigation.goTo(data.role === ADMIN_CONSTANTS.ROLES.DELIVERY ? 'myorders' : 'dashboard');
            }
          });
      }
    });
  }
};
