const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { OpenAIApi } = require("openai");
const path = require("path");
const app = express();
/* const transcribe = require("./transcript") */ app.use(
  express.static(path.join(__dirname, "videoedit/"))
);
/* const audioExtractor = require("./extract-audio"); */

/* audioExtractor.extractAudio(); */

const PORT = 5000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videoedit/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/processVideo", upload.single("video"), async (req, res) => {
  const videopath = req.file.path;
  console.log(req.file);
  res.json({
    message: "file is okk",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
