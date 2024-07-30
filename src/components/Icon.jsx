function Icon({ svg, shadow = true, fill = true, ...props }) {
  return (
    <button
      {...props}
      className={`icon btn-rm ${shadow ? "card" : ""} ${fill ? "fill" : ""}`}
    >
      <div>{svg}</div>
    </button>
  );
}

export default Icon;
