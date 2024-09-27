import { auth } from "./firebase.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const eyeContainer = document.querySelector(".eye_icon");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("cpassword");
const ceyeContainer = document.querySelector(".c_eye_icon");
const googleBtn = document.querySelector(".google_btn");

const messageContainer = document.getElementById("message");

eyeContainer?.addEventListener("click", () => {
  const eyeIcon = document.querySelector(".eye_icon i");
  if (eyeIcon.classList[0] === "ri-eye-fill") {
    eyeIcon.classList.replace("ri-eye-fill", "ri-eye-off-fill");
    password.type = "text";
  } else {
    eyeIcon.classList.replace("ri-eye-off-fill", "ri-eye-fill");
    password.type = "password";
  }
});

ceyeContainer?.addEventListener("click", () => {
  const eyeIcon = document.querySelector(".c_eye_icon i");
  if (eyeIcon.classList[0] === "ri-eye-fill") {
    eyeIcon.classList.replace("ri-eye-fill", "ri-eye-off-fill");
    confirmPassword.type = "text";
  } else {
    eyeIcon.classList.replace("ri-eye-off-fill", "ri-eye-fill");
    confirmPassword.type = "password";
  }
});

if (messageContainer?.classList[1] === "active") {
  setTimeout(() => {
    messageContainer?.classList.remove("active");
  }, 4000);
}

googleBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const token = user.accessToken;

  fetch("/user/googleLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/"; // Redirect on successful login
      }
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error);
    });
});
