import PropTypes from "prop-types";
import { useState } from "react";

export const ModalGaleria = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || !images || images.length === 0) return null;

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Cruz en la parte superior con el icono de Remix */}
        <div className="modal-close-container">
          <span className="btnCerrar" onClick={onClose}>
            <i className="ri-close-line"></i>
          </span>
        </div>

        {/* Imagen y navegación de flechas */}
        <div className="modal-image-container">
          <button
            className="btnAnt"
            onClick={prevImage}
            disabled={currentIndex === 0}
          >
            <i className="ri-arrow-left-s-line"></i> {/* Flecha izquierda */}
          </button>

          <img
            src={images[currentIndex].imageUrl}
            alt={`Imagen ${currentIndex + 1}`}
          />

          <button
            className="btnSig"
            onClick={nextImage}
            disabled={currentIndex === images.length - 1}
          >
            <i className="ri-arrow-right-s-line"></i> {/* Flecha derecha */}
          </button>
        </div>

        {/* Numeración de las imágenes */}
        <div className="modal-footer">
          <span className="num">
            <span className="act">{currentIndex + 1}</span> / <span className="tot">{images.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

ModalGaleria.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

