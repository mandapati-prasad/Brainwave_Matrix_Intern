const admin = require("firebase-admin");
console.log(process.env.FIREBASE_TYPE);
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMINE,
};

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
