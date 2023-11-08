const functions = require("firebase-functions");
const { admin } = require("./src/config/firebaseConfig");

exports.sendAudio = functions.https.onRequest(async (req, res) => {
    res.status(200).send("OK");
});
