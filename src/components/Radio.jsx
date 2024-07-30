function Switch({ isOn, setIsOn, ...props }) {
  return (
    <button
      {...props}
      onClick={() => setIsOn(!isOn)}
      className={`switch btn-rm ${isOn ? "on" : ""}`}
    >
      <div></div>
    </button>
  );
}

export default Switch;
