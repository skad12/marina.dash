import { useState } from "react";
import Input from "./Input";
import { useEffect } from "react";
import moment from "moment";
import { getFirstAndLastDateOfMonth } from "../utils";

function Filter({ setValues, handleChange }) {
  // eslint-disable-next-line
  const [status, setStatus] = useState("Paid");
  const [from, setFrom] = useState(getFirstAndLastDateOfMonth().firstDay);
  const [to, setTo] = useState(getFirstAndLastDateOfMonth().lastDay);

  useEffect(() => {
    if (typeof setValues != "function") return;
    setValues({ status: status, from: from, to: to });
    if (typeof handleChange != "function") return;
    handleChange(from, to);
  }, [from, to]);

  return (
    <div className="flex filter">
      <Input
        card={false}
        value={from}
        onChange={setFrom}
        placeholder="From"
        type="date"
      />
      <Input
        card={false}
        value={to}
        onChange={setTo}
        placeholder="To"
        type="date"
      />
      <Input value={status} card={false} disabled placeholder="Status" />
    </div>
  );
}

export default Filter;
