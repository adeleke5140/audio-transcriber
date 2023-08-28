import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import { recordAudio } from "./record.js";
import { transcribeAudio } from "./transcribe.js";
import * as dotenv from "dotenv";
import { createSpinner } from "nanospinner";
import chalkAnimation from "chalk-animation";

dotenv.config();

ffmpeg.setFfmpegPath(ffmpegPath);

const sleep = async (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const intro = chalkAnimation.rainbow(
    "Welcome to TransAI. Record your voice and let AI transcribe it for you. \n"
  );

  await sleep();
  intro.stop();
}

async function main() {
  const audioFileName = "recorded_audio.wav";
  await recordAudio(audioFileName);
  const spinner = createSpinner("Transcribing...").start();
  const transcript = await transcribeAudio(audioFileName);
  if (transcript) {
    spinner.success({ text: "Transcription complete:" });
    console.log(transcript);
  } else {
    spinner.error({ text: "Could not transcribe file ❌" });
    process.exit(1);
  }
}

await welcome();
await main();
