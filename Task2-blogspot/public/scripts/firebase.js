import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
export const auth = getAuth(app);
