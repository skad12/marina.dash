import { numberFormatter } from "../utils";

function DisplayCard({ value, svg, title }) {
  return (
    <div className="hover flex align-center display-card border">
      <div className="svg flex justify-center align-center">{svg}</div>
      <div>
        <h2 className="t-primary">{numberFormatter(value, "")}</h2>
        <span className="f600">{title}</span>
      </div>
    </div>
  );
}

export default DisplayCard;
