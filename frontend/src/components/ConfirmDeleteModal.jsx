import PropTypes from 'prop-types';

export const ConfirmDeleteModal = ({ message, onClose, onConfirm }) => {
    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                 <p>{message}</p>
                <div className="modal-buttons">
                    <button className="cancel-button primary-button-ligth" onClick={onClose}>Cancelar</button>
                    <button className="delete-button primary-button" onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};

ConfirmDeleteModal.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
  };


