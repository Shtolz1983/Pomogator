const inputForm = document.querySelector("form");
const voiceSelect = document.querySelector(".js-language");
const buttonStart = document.getElementById("start");
const buttonPause = document.getElementById("pause");
const buttonStop = document.getElementById("stop");
const textArea = document.querySelector(".js-textarea");

function createSelect(arrVoices) {
  const optionElements = arrVoices.map((voice, index) => {
    const el = document.createElement("option");
    el.setAttribute("value", index);
    el.innerHTML = voice.name;
    return el;
  });
  console.log(optionElements);
  voiceSelect.append(...optionElements);
}

module.exports = {
  inputForm,
  voiceSelect,
  buttonPause,
  buttonStart,
  buttonStop,
  textArea,
  createSelect,
};
