import { responseWhisper, responseChatGPT } from "./srs/openAI/response.js";
const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
// const inputTxt = document.querySelector(".js-textarea");
const voiceSelect = document.querySelector(".js-language");

// const pitch = document.querySelector("#pitch");
// const pitchValue = document.querySelector(".pitch-value");
// const rate = document.querySelector("#rate");
// const rateValue = document.querySelector(".rate-value");

let voices = [];
let ans = null;

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
  const selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name.slice(7, -1)} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(ans) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  console.log({ ans });
  if (ans !== "") {
    const utterThis = new SpeechSynthesisUtterance(
      "JavaScript is a scripting language that runs in the web browser. It’s a powerful, dynamic language designed to add behavior to HTML and CSS. JavaScript is used to create interactive websites, to control web page content dynamically, to develop web applications and to process user requests. It's used for both frontend and backend development. JavaScript can be used to manipulate elements on a page, validate forms, write games and other complex programs. It's also used in mobile applications and is a major part of the world wide web."
    );

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
      console.log({ utterThis });
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    // utterThis.pitch = pitch.value;
    // utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

// inputForm.onsubmit = function (event) {
//   event.preventDefault();

//   speak();

//   inputTxt.blur();
// };

// pitch.onchange = function () {
//   pitchValue.textContent = pitch.value;
// };

// rate.onchange = function () {
//   rateValue.textContent = rate.value;
// };

// voiceSelect.onchange = function () {
//   speak();
// };

let chunks = [];
let mediaRecorder = null;

// document.querySelector('footer').textContent += new Date().getFullYear()

async function startRecord() {
  // проверяем поддержку
  if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
    return console.warn("Not supported");
  }

  // если запись не запущена
  if (!mediaRecorder) {
    try {
      // получаем поток аудио-данных
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      // создаем экземпляр `MediaRecorder`, передавая ему поток в качестве аргумента
      mediaRecorder = new MediaRecorder(stream);
      // запускаем запись
      mediaRecorder.start();
      // по окончанию записи и наличии данных добавляем эти данные в соответствующий массив
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      // обработчик окончания записи (см. ниже)
      mediaRecorder.onstop = mediaRecorderStop;
    } catch (e) {
      console.error(e);
    }
  } else {
    // если запись запущена, останавливаем ее
    mediaRecorder.stop();
  }
}

inputForm.onsubmit = async function (event) {
  event.preventDefault();
  startRecord();
};

async function mediaRecorderStop() {
  const audio = new File([chunks[0]], "demo.webm", { type: "audio/webm" });
  // console.log(audio);

  const trans = await responseWhisper(audio);
  console.log(trans.data);
  const answer = await responseChatGPT(trans.data);

  mediaRecorder = null;
  chunks = [];

  ans = answer.data.choices[0].text;
  speak(ans);
}
