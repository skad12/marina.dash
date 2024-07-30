import { useState } from "react";
import "../../css/table.css";
import Button from "../Button";
import Input from "../Input";
import Loader from "../Loader";
import Row from "./Row";

function Table({
  title,
  head,
  data = [],
  btn,
  showSearch = true,
  onSearch,
  style,
  loading,
  right,
}) {
  const [search, setSearch] = useState("");
  return (
    <div className="table hover" style={style}>
      <div className="flex justify-between">
        {right && !showSearch ? (
          <div className="flex tb-he justify-between align-center">
            <h2 className="t-primary f600">{title}</h2>
            {right}
          </div>
        ) : (
          <h2 className="t-primary f600">{title}</h2>
        )}
        {showSearch && (
          <Input
            value={search}
            placeholder="Search"
            onChange={(v) => {
              setSearch(v);
              if (typeof onSearch === "function") onSearch(v);
            }}
          />
        )}
      </div>
      <Row isHead cells={head} data />
      {loading && (
        <div className="table-loader flex justify-center align-center">
          <Loader />
        </div>
      )}
      {data.map((d, idx) => (
        <Row cells={head} data={d} key={idx} didx={idx} />
      ))}
      <div className="table-footer flex justify-end">
        {btn && <Button {...btn} />}
      </div>
    </div>
  );
}

export default Table;
