const functions = require("firebase-functions");
const { admin } = require("./src/config/firebaseConfig");
const { OpenAI } = require("openai");
const fs = require("fs");
const cors = require("cors");
const Busboy = require("busboy");

require("dotenv").config();

const corsMiddleware = cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type"],
    credentials: true,
    contentType: true,
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.transcriptAudio = functions.https.onRequest(async (req, res) => {
    corsMiddleware(req, res, async () => {
        res.status(200).send("OK");
    });
});
