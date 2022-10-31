import { useEffect, useRef, useState } from "react";
import { startWave } from "../lib/wave";
import Logo from "./logo";

export default function Wave() {
  const audioElem = useRef();
  const [soundBars, setSoundBars] = useState(null);
  const [renderFrame, setRenderFrame] = useState(null);
  const [classes, setClasses] = useState(["next-js-wrapper"]);
  const [activeBar, setActiveBar] = useState(false);
  let id = 0;

  function startAnim() {
    const { renderFrame, bufferLength } = startWave(audioElem.current);
    const amountOfBars = [];
    for (let index = 0; index < bufferLength; index++) {
      amountOfBars.push(index);
    }
    setSoundBars(amountOfBars);
    setRenderFrame(() => renderFrame);
  }

  useEffect(() => {
    if (soundBars) {
      renderFrame();
      setTimeout(() => {
        setActiveBar(true);
        setClasses((old) => [...old, "active"]);
      }, 1000);
    }
  }, [soundBars]);

  return (
    <>
      <div className="container">
        {soundBars &&
          soundBars.map((bar) => {
            let elem = (
              <div
                key={id}
                className={
                  !activeBar ? `div div${id}` : `div div${id} barActive`
                }></div>
            );
            id++;
            return elem;
          })}
      </div>

      <div id="content" controls>
        <audio ref={audioElem} src="transition.mp3"></audio>
      </div>
      <Logo classes={classes} startAnim={startAnim} />
    </>
  );
}
