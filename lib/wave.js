export function startWave(audio) {
  console.log(audio);
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

  // const fragment = document.createDocumentFragment();
  // for (let index = 0; index < bufferLength; index++) {
  //   const div = document.createElement("div");
  //   div.classList.add("div");
  //   div.classList.add(`div${index}`);
  //   fragment.appendChild(div);
  // }

  // container.appendChild(fragment);

  audio.play();
  // setTimeout(() => {
  //   window.cancelAnimationFrame(id);
  // }, 10000);
  return {
    analyser: analyser,
    bufferLength: bufferLength,
    dataArray: dataArray,
  };
}

export function renderFrame(analyser, bufferLength, dataArray) {
  const id = requestAnimationFrame(renderFrame);

  analyser.getByteFrequencyData(dataArray);

  for (var i = 0; i < bufferLength; i++) {
    const height = dataArray[i];

    const changeDiv = document.querySelector(`.div${i}`);
    changeDiv.style.height = `${height * 1.3}px`;
  }
  return id;
}
