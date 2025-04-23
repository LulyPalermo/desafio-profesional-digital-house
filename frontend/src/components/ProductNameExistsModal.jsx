import PropTypes from "prop-types";

export const ProductNameExistsModal = ({ onClose }) => {
    return (
      <div className="exist-modal-overlay">
        <div className="exist-modal-content">
          <p>El nombre de este producto ya está en uso, debes elegir otro.</p>
          <button onClick={onClose} className="modal-button primary-button">Entendido</button>
        </div>
      </div>
    );
  };

  ProductNameExistsModal.propTypes = {
      onClose: PropTypes.func.isRequired
    };