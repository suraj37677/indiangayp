const express = require("express");
const multer = require("multer");
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const { OpenAI } = require("openai");

const app = express();
const upload = multer();

const openai = new OpenAI(
  "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"
);

const PORT = 5000;

app.post("/processVideo", upload.single("video"), async (req, res) => {
  try {
    // Step 1: Upload video to OpenAI Whisper API
    const formData = new FormData();
    formData.append("audio", req.file.buffer, {
      filename: "My_video.mp4",
    });

    const uploadResponse = await axios.post(
      "https://api.openai.com/v1/whisper/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${openai.apiKey}`,
          ...formData.getHeaders(),
        },
      }
    );

    // Step 2: Get captions with word-level timestamps
    const transcriptionResponse = await axios.post(
      "https://api.openai.com/v1/whisper/transcribe",
      {
        audio_url: uploadResponse.data.data.url,
      },
      {
        headers: {
          Authorization: `Bearer ${openai.apiKey}`,
        },
      }
    );

    const wordTimestamps = transcriptionResponse.data.data.words;

    // Step 3: Add captions to the video using FFmpeg
    const inputFilePath = req.file.buffer;
    const outputFilePath = `public/captioned_video_${Date.now()}.mp4`;

    ffmpeg(inputFilePath)
      .complexFilter([
        "subtitles=subtitles.srt", // Create a separate subtitles.srt file with the captions
      ])
      .output(outputFilePath)
      .on("end", () => {
        res.json({
          videoUrl: outputFilePath,
        });
      })
      .on("error", (error) => {
        console.error("Error adding captions:", error);
        res.status(500).json({ error: "Error adding captions to the video." });
      })
      .run();
  } catch (error) {
    console.error("Error processing video:", error);
    res.status(500).json({ error: "Error processing the video." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
