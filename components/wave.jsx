import { useEffect, useRef } from "react";
import { startWave, renderFrame } from "../lib/wave";

export default function Wave() {
  const audioElem = useRef();

  function startAnim() {
    const { analyser, bufferLength, dataArray } = startWave(audioElem.current);
    console.log(analyser);
    console.log(bufferLength);
    console.log(dataArray);
    setTimeout(() => {
      console.log(dataArray);
    }, 3000);
  }

  function LOG(params) {
    console.log(document.querySelector(".container"));
  }

  useEffect(() => {
    LOG();
  }, []);

  return (
    <>
      <div className="container"></div>

      <div id="content">
        <button onClick={startAnim}>button</button>
        <input type="file" id="thefile" accept="audio/*" />
        <audio ref={audioElem} src="bud-trance_pfui.mp3" controls></audio>
      </div>
    </>
  );
}
