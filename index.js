import { response } from "./openaiAPI/response.js";
const textQuestion = document.querySelector("[name='question']");
const btnQuestion = document.querySelector(".btn_question");
const textAnswer = document.querySelector(".code");

console.log(textAnswer);

function createElement(answer, el) {
  el.innerHTML = answer;
}

btnQuestion.addEventListener("click", async (event) => {
  event.preventDefault();
  if (textQuestion.value) {
    const res = await response(textQuestion.value);
    console.log(res.data);
    createElement(res.data.choices[0].text, textAnswer);
  }
});
