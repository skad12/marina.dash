import { forwardRef, useEffect, useState } from "react";
import { numberFormatter } from "../utils";
import Input from "./Input";

const CurrencyInput = forwardRef(
  ({ Wrapper = Input, onChange = () => {}, value, ...props }, ref) => {
    const [formattedValue, setFormattedValue] = useState("");

    useEffect(() => {
      if (value) setFormattedValue(numberFormatter(value, "").split(".")[0]);
      else setFormattedValue("");
    }, [value]);
    return (
      <Wrapper
        {...props}
        ref={ref}
        value={formattedValue === "0" ? "" : formattedValue}
        onChange={(v) => {
          let vl = v.replace(/[^,\d]/g, "").split(".")[0];
          while (vl.includes(",")) vl = vl.replace(",", "");
          onChange(vl);
          setFormattedValue(numberFormatter(vl || "0", "").split(".")[0]);
        }}
      />
    );
  }
);
export default CurrencyInput;
