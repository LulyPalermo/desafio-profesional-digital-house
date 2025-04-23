import PropTypes from 'prop-types';

export const ConfirmDeleteModal = ({ onClose, onConfirm }) => {
    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <p>¿Estás segura/o de que querés eliminar este producto?</p>
                <div className="modal-buttons">
                    <button className="cancel-button primary-button-ligth" onClick={onClose}>Cancelar</button>
                    <button className="delete-button primary-button" onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};

ConfirmDeleteModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
  };


