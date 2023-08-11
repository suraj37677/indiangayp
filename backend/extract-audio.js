// // extract-audio.js

// const path = require("path");
// const { spawn } = require("child_process");
// const ffmpeg = require("ffmpeg-static");

// function extractAudio() {
//   // Replace these paths with your actual file paths
//   const inputVideoPath = path.join(
//     __dirname,
//     "videoedit",
//     "x0e91652712227-video.mp4.mp4"
//   );
//   const outputAudioPath = path.join(__dirname, "audio.mp3");

//   const ffmpegArgs = [
//     "-i",
//     inputVideoPath,
//     "-vn", // Disable video recording
//     "-acodec",
//     "mp3",
//     outputAudioPath,
//   ];

//   const ffmpegProcess = spawn(ffmpeg, ffmpegArgs);

//   ffmpegProcess.stdout.on("data", (data) => {
//     console.log(`FFmpeg stdout: ${data}`);
//   });

//   ffmpegProcess.stderr.on("data", (data) => {
//     console.error(`FFmpeg stderr: ${data}`);
//   });

//   ffmpegProcess.on("close", (code) => {
//     if (code === 0) {
//       console.log("Audio extraction successful.");
//     } else {
//       console.error("Audio extraction failed.");
//     }
//   });
// }

// module.exports = {
//   extractAudio, // Export the extractAudio function
// };
