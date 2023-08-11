// const { WhisperSTT } = require("whisper-speech-to-text");
// const fs = require("fs");

// const apiKey = "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";
// const whisper = new WhisperSTT(apiKey);

// async function transcribeAudio(inputAudioPath) {
//   try {
//     const audioData = fs.readFileSync(inputAudioPath);
//     const transcription = await whisper.transcribe(audioData);
//     return transcription;
//   } catch (error) {
//     throw error;
//   }
// }

// const inputAudioPath =
//   "C:UsersHPDownloads\functionupProject\backendaudioaudio.mp3";

// transcribeAudio(inputAudioPath)
//   .then((transcription) => {
//     console.log("Transcription:", transcription);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
