import { getNestedValueFromObject } from "../../utils";

function Row({ cells = [], data, isHead, didx = 0 }) {
  return (
    <div className="row flex align-center">
      {cells.map(
        ({ render, className, target, separator = " ", title }, idx) => {
          const value =
            title && isHead
              ? title
              : target === "#"
              ? (didx + 1).toString()
              : target === "*"
              ? data
              : typeof target === "string"
              ? getNestedValueFromObject(data, target)
              : target.map((f) => getNestedValueFromObject(data, f));
          return (
            <div
              className={`row-item ${
                isHead ? "f600" : "f400"
              } t-default tregular ${className}`}
              key={idx}
            >
              {typeof render === "function" && !isHead
                ? render(value)
                : typeof value === "string" || typeof value === "number"
                ? value
                : value?.join(separator)}
            </div>
          );
        }
      )}
    </div>
  );
}

export default Row;
