// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyD_LH4Cp_nOblbaLHPIPVCFIcJUWkwcZL0",
  authDomain: "drradauthpay.firebaseapp.com",
  projectId: "drradauthpay",
  storageBucket: "drradauthpay.appspot.com",
  messagingSenderId: "714460504159",
  appId: "1:714460504159:web:5548d442132bed7056bbea",
  measurementId: "G-5JDM7VBGYZ",
  databaseURL: "https://drradauthpay-default-rtdb.firebaseio.com/",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
