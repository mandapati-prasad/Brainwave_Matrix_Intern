const express = require("express");
const router = express.Router();

const {
  registerUser,
  renderRegisterPage,
  renderLoginPage,
  loginUser,
  logoutUser,
  loginWithGoogle,
} = require("../controllers/userController");

router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/googleLogin", loginWithGoogle);
router.get("/logout", logoutUser);

module.exports = router;
