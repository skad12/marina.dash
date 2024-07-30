function CheckBox({ checked, setCheked, ...props }) {
  return (
    <button
      {...props}
      onClick={() => setCheked(!checked)}
      className="check-box btn-rm"
    >
      {checked && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 0H0V18H18V0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
            fill="#614f41"
          />
        </svg>
      )}
    </button>
  );
}

export default CheckBox;
