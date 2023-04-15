import { response } from "./openaiAPI/response.js";

const form = document.querySelector("form[name=addWord]");
const btnQuestion = document.getElementById("submitButtonQue");
const textAnswer = document.getElementById("out-text");

function getLevel(event) {
  event.preventDefault();
  const form = document.querySelector("form[name=addWord]");
  const input = form.querySelector("input[name=quantity]");
  return input.value;
}

form.addEventListener("submit", getLevel);

btnQuestion.addEventListener("click", async (event) => {
  event.preventDefault();

  const formText = document.querySelector("form[name=add-newWord]");
  const inputText = formText.querySelector("input[name=text]");
  const textQuestion = inputText.value;
  if (textQuestion) {
    const res = await response(textQuestion);
    textAnswer.innerHTML = res.data.choices[0].text;
  }
});
