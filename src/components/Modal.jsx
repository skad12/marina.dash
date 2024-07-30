import "../css/components/modal.css";

function Modal({ visible = false, children }) {
  return (
    <div
      className={`modal flex justify-center align-center ${
        visible ? "visible" : ""
      }`}
    >
      {visible && <div className="modal-cnt border">{children}</div>}
    </div>
  );
}

export default Modal;
