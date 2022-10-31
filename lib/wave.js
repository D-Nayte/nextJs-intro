export function startWave(audio) {
  audio.load();
  audio.play();
  var context = new AudioContext();
  var src = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;

  var bufferLength = analyser.frequencyBinCount;

  var dataArray = new Uint8Array(bufferLength);

  bufferLength = 90;

  function renderFrame() {
    const id = requestAnimationFrame(renderFrame);

    analyser.getByteFrequencyData(dataArray);

    for (var i = 0; i < bufferLength; i++) {
      const height = dataArray[i];

      const changeDiv = document.querySelector(`.div${i}`);
      changeDiv.style.height = `${height * 1.3}px`;
    }
    return id;
  }

  audio.play();

  return {
    renderFrame: renderFrame,
    bufferLength: bufferLength,
  };
}
