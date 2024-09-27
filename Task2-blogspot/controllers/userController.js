const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} = require("firebase/auth");
const { auth } = require("../firebase/firebase_config");

const renderLoginPage = async (req, res) => {
  res.render("login", { error: null });
};

const renderRegisterPage = async (req, res) => {
  res.render("register", { error: null });
};

const registerUser = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  try {
    if (password !== cpassword) {
      throw new Error("passwords do not match");
    }
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCred.user;
    await updateProfile(user, { displayName: name });
    return res.redirect("/login");
  } catch (error) {
    console.log(error.message);
    return res.status(400).render("register", { error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("please enter the values");
    }
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    const idToken = await user.getIdToken();
    res.cookie("authToken", idToken, {
      path: "/",
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "none",
      secure: true,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("login", { error: error.message });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    res.cookie("authToken", token, {
      path: "/",
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.render("login", { error: "login failed" });
  }
};

const logoutUser = async (req, res) => {
  try {
    await signOut(auth);
    res.clearCookie("authToken");
    return res.redirect("/");
  } catch (error) {
    console.log(error.message);
    return res.render("login", { error: "Logout failed. Please try again." });
  }
};

module.exports = {
  renderLoginPage,
  renderRegisterPage,
  registerUser,
  loginUser,
  logoutUser,
  loginWithGoogle,
};
