import PropTypes from "prop-types";

export const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="exist-modal-overlay">
      <div className="exist-modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="modal-button primary-button">
          Entendido
        </button>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};