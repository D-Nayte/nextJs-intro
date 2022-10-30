window.onload = function () {
  let id;
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");

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
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);

    const type = "bubble";

    let bubbleWidth = dataArray[i];
    let posY = rnd(rndvalue) + bubbleWidth / 2;
    let posX = rnd(rndvalue) + bubbleWidth / 2;

    function renderFrame() {
      id = requestAnimationFrame(renderFrame);
      let data = [];
      analyser.getByteFrequencyData(dataArray);

      xPosition = 0;

      if (type === "column") {
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          data.push({ x: xPosition, y: barHeight });
          xPosition++;
        }
      }

      if (type === "bubble") {
        for (var i = 0; i < bufferLength; i++) {
          let bubbleWidth = dataArray[i];
          let posY = rnd(rndvalue) + bubbleWidth / 2;
          let posX = rnd(rndvalue) + bubbleWidth / 2;

          data.push({ x: posX, y: posY, z: bubbleWidth });
        }

        rndvalue += 1;
        // data = [
        //   //   { x: 50, y: 20, z: dataArray[50] },
        //   { x: 50, y: 20, z: dataArray[10] },
        //   { x: 50, y: 20, z: dataArray[20] },
        //   { x: 50, y: 20, z: dataArray[40] },
        //   { x: 20, y: 20, z: 1 },
        //   { x: 70, y: 20, z: 200 },
        // ];
      }

      let chart;

      if (type === "column") {
        chart = createBarChart(data);
      }
      if (type === "bubble") {
        chart = createBubbleChart(data);
      }

      chart.render();
    }

    audio.play();
    renderFrame();

    setTimeout(() => {
      window.cancelAnimationFrame(id);
    }, 5000);
  };
};

function createBarChart(dataSet) {
  var chart = new CanvasJS.Chart("chartContainer", {
    // exportEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    // title: {
    //   text: "Simple Column Chart with Index Labels",
    // },
    // axisY: {
    //   includeZero: true,
    // },
    colorSet: "customColorSet1",
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelFontSize: 16,
        indexLabelPlacement: "outside",
        dataPoints: dataSet,
      },
    ],
  });
  return chart;
}

function createBubbleChart(dataSet) {
  CanvasJS.addColorSet("customColorSet1", [
    //colorSet Array
    "purple",
    "darkblue",
  ]);

  var chart = new CanvasJS.Chart("chartContainer", {
    // exportEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    // title: {
    //   text: "Simple Column Chart with Index Labels",
    // },
    // axisY: {
    //   includeZero: true,
    // },
    colorSet: "customColorSet1",
    data: [
      {
        type: "bubble", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelFontSize: 16,
        indexLabelPlacement: "outside",
        dataPoints: dataSet,
        markerBorderThickness: 2,
        markerBorderColor: "black",
        // markerColor: "#00800000",
      },
    ],
  });
  return chart;
}
