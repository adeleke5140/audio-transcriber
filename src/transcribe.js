import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  organization: "org-aOacz9dAOVmQyUFlqiO4itg2",
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

const transcribeAudio = async (fileName) => {
  const transcript = await openai.createTranscription(
    fs.createReadStream(fileName),
    "whisper-1"
  );
  return transcript.data.text;
};

export { transcribeAudio };
