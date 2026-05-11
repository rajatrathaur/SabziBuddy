/* ═══════════════════════════════════════════
   CORE/config.js - Firebase Initialization
   ═══════════════════════════════════════════

   Firebase config and initialization.
   ═══════════════════════════════════════════ */

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAD5frbOw7vTCaTB1xL5OpgDlDZvmd1tog",
  authDomain: "sabzibuddy-website.firebaseapp.com",
  projectId: "sabzibuddy-website",
  storageBucket: "sabzibuddy-website.appspot.com",
  messagingSenderId: "629878927662",
  appId: "1:629878927662:web:9a0ac70eacfe09ba40dc88"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();
var storage = firebase.storage();
