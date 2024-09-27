const { admin } = require("../firebase/firebaseAdmin_config");

const optionalAuth = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
  } catch (error) {
    console.log("Token verification failed:", error.message);
    req.user = null;
  }

  next(); // Continue regardless of token verification success or failure
};

module.exports = optionalAuth;
