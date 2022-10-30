const container = document.querySelector(".container");

var file = document.getElementById("thefile");
var audio = document.getElementById("audio");

let id;

file.onchange = function () {
  var files = this.files;
  audio.src = URL.createObjectURL(files[0]);
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
  // dataArray = dataArray.filter((data, index) => index < 80);
  bufferLength = 90;

  const fragment = document.createDocumentFragment();
  for (let index = 0; index < bufferLength; index++) {
    const div = document.createElement("div");
    div.classList.add("div");
    div.classList.add(`div${index}`);
    fragment.appendChild(div);
  }

  container.appendChild(fragment);

  const circle = document.createElement("div");
  circle.classList.add(".circle");

  function renderFrame() {
    console.log(id);
    id = requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(dataArray);

    for (var i = 0; i < bufferLength; i++) {
      const height = dataArray[i];

      const changeDiv = document.querySelector(`.div${i}`);
      changeDiv.style.height = `${height * 1.3}px`;
    }
  }

  audio.play();
  renderFrame();
  // setTimeout(() => {
  //   window.cancelAnimationFrame(id);
  // }, 1000);
};

let path = `polygon(49% 45%, 0% 66%, 49% 40%, 99% 64%)`;
document.documentElement.style.setProperty("--path", path);
