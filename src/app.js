const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg");
const record = require("./record");
const transcribe = require("./transcribe");
require("dotenv").config();

ffmpeg.setFfmpegPath(ffmpegPath);

async function main() {
  const audioFileName = "recorded_audio.wav";
  await record(audioFileName);
  const transcript = await transcribe(audioFileName);

  console.log("Transcription:\n", transcript);
}

main();
