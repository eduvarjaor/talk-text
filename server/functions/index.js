const functions = require("firebase-functions");
const { admin } = require("./src/config/firebaseConfig");
const { OpenAI } = require("openai");
const fs = require("fs");
const os = require("os");
const path = require("path");
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
        if (req.method !== "POST") {
            return res.status(405).send("Not allowed method.");
        }

        const busboy = Busboy({ headers: req.headers });
        const tmpdir = os.tmpdir();
        let tmpFilePath;

        busboy.on("file", (fieldname, file, fileInfo, encoding, mimetype) => {
            const { filename } = fileInfo;

            const filePath = path.join(tmpdir, filename);
            tmpFilePath = filePath;
            const writeStream = fs.createWriteStream(filePath);
            file.pipe(writeStream);
        });

        busboy.on("finish", async () => {
            try {
                const transcription = await openai.audio.transcriptions.create({
                    file: fs.createReadStream(tmpFilePath),
                    model: "whisper-1",
                });

                fs.unlinkSync(tmpFilePath);

                res.status(200).send({ data: transcription.text });
            } catch (error) {
                console.error("Error on transcription:", error);
                fs.unlinkSync(tmpFilePath);
                res.status(500).send({ error: "Internal Server Error" });
            }
        });

        busboy.on("error", (error) => {
            console.error("Busboy error:", error);
            res.status(500).send({ error: "Busboy Error" });
        });

        if (req.rawBody) {
            busboy.end(req.rawBody);
        } else {
            req.pipe(busboy);
        }
    });
});
