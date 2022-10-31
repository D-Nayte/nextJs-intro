export default function Logo({ classes, startAnim }) {
  return (
    <div
      className={classes.toString().replaceAll(",", " ")}
      onClick={startAnim}>
      <div className="wrapper">
        <div className="next-js-logo"></div>
        <div className="background"></div>
      </div>
    </div>
  );
}
