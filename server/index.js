import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { Reko } from "./rekognition/aws.rek.js";

const app = express();
dotenv.config();
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer();

app.post("/img", upload.single("img"), async (req, res) => {
  const file = req.file;
  const texts = [];
  let data = [];
  // const arr = Uint8Array.from(file.buffer)
  // console.log(req.file);
  data = await Reko(file.buffer);
  data.TextDetections.map((item) => {
    texts.push(item.DetectedText);
  });
  res.status(200).send(texts);
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
