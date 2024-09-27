// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDjcm5o9e11Qes2Xv4usvXPckQCo9Ocwo",
  authDomain: "blogspot-e611b.firebaseapp.com",
  projectId: "blogspot-e611b",
  storageBucket: "blogspot-e611b.appspot.com",
  messagingSenderId: "245993604121",
  appId: "1:245993604121:web:636e5d1f74aaa7fd8d9688",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
module.exports = {
  auth,
};
