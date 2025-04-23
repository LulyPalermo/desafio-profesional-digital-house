import { useState } from "react";
import PropTypes from "prop-types";
import { ModalGaleria } from "./ModalGaleria";

export const ProductGallery = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

//   if (!images || images.length < 5) return null;
  if (!images || images.length === 0) return null; 

  const mainImage = images[0]; // Primera imagen como imagen principal
  const otherImages = images.slice(1, images.length); // Resto de imágenes en la grilla
//   const otherImages = images.slice(1, 5);

  return (
    <div className="gallery-container">
      <div className="images-wrapper">
        {/* Imagen principal */}
        <div className="main-image">
          <img src={mainImage.imageUrl} alt="Imagen principal del producto" />
        </div>

        {/* Grilla de 2x2 */}
        <div className="image-grid">
          {otherImages.map((img, index) => (
            <div key={index} className="grid-item">
              <img src={img.imageUrl} alt={`Imagen ${index + 2}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Botón Ver más */}
      <div className="view-more-container">
        <button className="primary-button" onClick={() => setIsModalOpen(true)}>Ver más</button>
      </div>

      {/* Modal de imágenes */}
      <ModalGaleria images={images} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};
