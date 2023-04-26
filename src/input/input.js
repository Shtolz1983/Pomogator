async function createMediaRecorder() {
  // проверяем поддержку
  if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
    return console.warn("Not supported");
  }
  try {
    // получаем поток аудио-данных
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    // создаем экземпляр `MediaRecorder`, передавая ему поток в качестве аргумента
    const mediaRecorder = new MediaRecorder(stream);
    return mediaRecorder;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { createMediaRecorder };
