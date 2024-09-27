const { admin } = require("../firebase/firebaseAdmin_config");

const protected = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .render("login", { error: "You must be logged in to access this page" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Authentication error:", error.message);
    return res
      .status(401)
      .render("login", { error: "Invalid or expired token" });
  }
};

module.exports = protected;
