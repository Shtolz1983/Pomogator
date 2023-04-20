import { responseWhisper, responseChatGPT } from "./srs/openAI/response.js";

let chunks = [];
let mediaRecorder = null;

const inputForm = document.querySelector("form");

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
  console.log(answer.data.choices[0]);

  mediaRecorder = null;
  chunks = [];
}
