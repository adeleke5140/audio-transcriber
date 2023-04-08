import mic from "mic";
import fs from "fs";
import { Readable } from "stream";
import chalk from "chalk";

//what does sample rate of 16000Hz mean and what does the audio channel
//mono mean
const recordAudio = async (fileName) => {
  return new Promise((resolve, reject) => {
    const micInstance = mic({
      rate: "16000",
      channels: "1",
      fileType: "wav",
    });

    const micInputStream = micInstance.getAudioStream();
    const output = fs.createWriteStream(fileName);
    const writable = new Readable().wrap(micInputStream);

    console.log(chalk.bgBlue("Recording...🎙️\n"));
    console.log(chalk.bgGreen("Press Ctrl+C to stop"));

    writable.pipe(output);

    micInstance.start();

    process.on("SIGINT", () => {
      micInstance.stop();
      console.log("Finished recording 🚀 \n");
      resolve();
    });

    micInputStream.on("error", (err) => {
      reject(err);
    });
  });
};

export { recordAudio };
