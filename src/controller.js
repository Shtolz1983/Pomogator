const output = require("./output/output");
const openAI = require("./openAI/response");
const input = require("./input/input");
const view = require("./view");
const { addStorage, getStorage } = require("./storage/storage");

let audioFile = null;

(async function () {
  const mediaRecorder = await input.createMediaRecorder();
  view.createSelect(output.populateVoiceList());

  view.buttonPause.addEventListener("click", (event) => {
    event.preventDefault();
    if (mediaRecorder.state === "recording") {
      mediaRecorder.pause();
    } else if (mediaRecorder.state === "paused") {
      mediaRecorder.resume();
    }
  });

  view.buttonStop.addEventListener("click", (event) => {
    event.preventDefault();
    if (!(mediaRecorder.state === "inactive")) {
      mediaRecorder.stop();
    }
  });

  view.buttonStart.addEventListener("click", (event) => {
    event.preventDefault();
    mediaRecorder.start();
  });

  mediaRecorder.onstart = () => {
    audioFile = null;
  };
  mediaRecorder.ondataavailable = async (event) => {
    const voiceNumber = view.voiceSelect.value;
    audioFile = new File([event.data], "demo.webm", { type: "audio/webm" });
    const trans = await openAI.responseWhisper(audioFile, "ru"); //изменить параметр "ru"
    view.textArea.innerHTML = trans.data;
    addStorage({ role: "user", content: trans.data });
    // console.log(getStorage());
    const answer = await openAI.responseChatGPT(getStorage());
    view.textArea.innerHTML = answer.data.choices[0].message.content;
    addStorage({
      role: "assistant",
      content: answer.data.choices[0].message.content,
    });
    output.speakText(answer.data.choices[0].message.content, {
      voice: output.populateVoiceList()[+voiceNumber],
    });
  };
})();
