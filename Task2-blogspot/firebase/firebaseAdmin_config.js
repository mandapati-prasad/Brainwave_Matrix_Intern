const admin = require("firebase-admin");
const serviceAccount = require("../config/blogspot-e611b-firebase-adminsdk-6ul26-a753e89e51.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "blogspot-e611b.appspot.com",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = {
  admin,
  db,
  bucket,
};
