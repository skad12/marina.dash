import "../css/components/input.css";
import { useEffect, useState } from "react";
import SvgLock from "./svg/Lock";
import Icon from "./Icon";
import ChvSm from "./svg/ChvSm";
import Loader from "./Loader";

function Input({
  svg,
  placeholder,
  password,
  errorMessage,
  type = "text",
  onChange = (v) => {},
  value,
  select,
  onClick,
  loading,
  card = true,
  ...props
}) {
  const [secureEntry, setSecureEntry] = useState(password);
  const [isFocued, setIsFocused] = useState(!!value);
  const toggleSecureEntry = () => setSecureEntry(!secureEntry);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  useEffect(() => {
    if (select) onChange(value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <div className={`input ${isFocued && card ? "card" : ""}`}>
      <div
        className={`placeholder t-primary ${
          isFocued || value ? "f600 focused" : ""
        }`}
      >
        {placeholder}
      </div>
      {select ? (
        <button className="s-btn" onClick={onClick}>
          {value}
        </button>
      ) : (
        <input
          {...props}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          type={password ? (secureEntry ? "password" : "text") : type}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}
      {loading && <Loader />}
      {select && <ChvSm className="selct-chv" />}
      {svg && <Icon fill={false} svg={svg} />}
      {password && (
        <Icon
          onClick={toggleSecureEntry}
          shadow={false}
          fill={false}
          svg={<SvgLock {...(isFocued ? { fill: "#dc8628" } : {})} />}
        />
      )}
      {errorMessage && (
        <span className="f700 error">
          {errorMessage}{" "}
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.00008 0.666504C2.7800 8 0.666504 0.166748 3.27984 0.166748 6.49984C0.166748 9.71984 2.78008 12.3332 6.00008 12.3332C9.22008 12.3332 11.8334 9.71984 11.8334 6.49984C11.8334 3.27984 9.22008 0.666504 6.00008 0.666504ZM6.58342 9.4165H5.41675V8.24984H6.58342V9.4165ZM6.58342 7.08317H5.41675V3.58317H6.58342V7.08317Z"
              fill="#F44336"
            />
          </svg>
        </span>
      )}
    </div>
  );
}

export default Input;
