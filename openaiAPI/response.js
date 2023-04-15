const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-7wXMl4JgsGdorSTaimF0ipHq",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// temperature
// number
// Optional
// Defaults to 1
// What sampling temperature to use, between 0 and 2. Higher values like
// 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

// We generally recommend altering this or top_p but not both.

async function response(question, temper = 1) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      temperature: temper,
      max_tokens: 2000,
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}

export { response };
