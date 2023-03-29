const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  organization: "org-kobBNmEgKGNvpgEHIqV9HWs7",
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

async function transcribeAudio(fileName) {
  const transcript = await openai.createTranscription(
    fs.createReadStream(fileName),
    "whisper-1"
  );
  return transcript.data.text;
}

module.exports = transcribeAudio;
