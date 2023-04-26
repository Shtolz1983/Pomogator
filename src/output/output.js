const synth = window.speechSynthesis;

function populateVoiceList() {
  const voices = synth.getVoices().sort(function (a, b) {
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
  return voices;
}

function speakText(ans, { voice, pitch = 1, rate = 1 }) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (ans !== "") {
    const utterThis = new SpeechSynthesisUtterance(ans);

    utterThis.onend = function () {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (e) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    utterThis.voice = voice;
    utterThis.pitch = pitch;
    utterThis.rate = rate;

    synth.speak(utterThis);
  }
}

module.exports = { speakText, populateVoiceList };
