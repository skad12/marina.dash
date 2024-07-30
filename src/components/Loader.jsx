import "../css/components/loader.css";

function Loader({ className = "primary", loading = true, scale = 0.3 }) {
  if (!loading) return null;
  return (
    <div
      className={`lds-spinner ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
