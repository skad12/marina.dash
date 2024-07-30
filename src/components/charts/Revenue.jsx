import { Bar, Line } from "react-chartjs-2";
import { options, labels } from ".";
import { colorPrimary } from "../../utils";
import { useState } from "react";

const graphType = { line: "line", bar: "bar" };

function Revenue(props) {
  const [type, setTyle] = useState(graphType.bar);
  const Graph = type === graphType.bar ? Bar : Line;
  const handleChangeGraph = (e) => setTyle(e.target.value);
  return (
    <div className="stat">
      <div className="flex inp-rev">
        <h4 className="t-primary">Revenue Chart</h4>
        <div className="inputs">
          <select className="raleway">
            <option value="">Monthly</option>
            <option value="">Yearly</option>
          </select>
          <select onChange={handleChangeGraph} className="raleway">
            <option value="bar">Bar</option>
            <option value="line">Line</option>
          </select>
        </div>
      </div>
      <div className="g-cnt">
        <Graph
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels: labels.map((a) => a.slice(0, 3)),
            datasets: [
              {
                label: "",
                data: labels
                  .map((a) => a.slice(0, 3))
                  .map(() => Math.random() * 100),
                borderColor: colorPrimary,
                backgroundColor: colorPrimary,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default Revenue;
