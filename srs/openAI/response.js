const { Configuration, OpenAIApi } = require("openai");

class CustomFormData extends FormData {
  getHeaders() {
    return {};
  }
}

const configuration = new Configuration({
  organization: "org-7wXMl4JgsGdorSTaimF0ipHq",
  apiKey: process.env.OPENAI_API_KEY,
  formDataCtor: CustomFormData,
});
const openai = new OpenAIApi(configuration);

async function responseWhisper(buffer, language = "en") {
  try {
    const response = await openai.createTranscription(
      buffer,
      "whisper-1",
      undefined,
      "text",
      0,
      language
    );
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function responseChatGPT(text) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 2000,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

export { responseChatGPT, responseWhisper };
