export default function Text({ classes }) {
  return (
    <div className={classes.toString().replaceAll(",", " ")}>
      {/* <div className="text-wrapper-active"> */}
      <h1>BUILD</h1>
      <h1>WITH</h1>
    </div>
  );
}
