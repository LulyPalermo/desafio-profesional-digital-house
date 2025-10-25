import PropTypes from "prop-types";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export const ShareProductModal = ({ isOpen, onClose, product }) => {
    const [customMessage, setCustomMessage] = useState("Mira este producto que acabo de ver!"); // Estado para mensaje personalizado

    const productUrl = `${window.location.origin}/detail/${product.id}`;  // Enlace directo al producto

    if (!isOpen) return null; // Si no debe mostrarse, no renderiza nada

    // URLs para compartir
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl
    )}&quote=${encodeURIComponent(customMessage)}`;

    const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        productUrl
    )}&text=${encodeURIComponent(customMessage)}`;

    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        customMessage + " " + productUrl
    )}`;

    return (
        <>
            {/* Fondo oscuro detrás del modal */}
            <div className="share-modal-overlay" onClick={onClose}></div>

            {/* Contenedor del modal */}
            <div className="share-modal-content">
                <div className="share-modal-header">
                    <button className="login-close-button" onClick={onClose}><i className="ri-close-large-line"></i></button>
                    <h3>Comparte este producto</h3>
                </div>

                <div className='share-product-info'>
                    <img src={product.images[0].imageUrl} alt={product.name} className="share-image" />
                    <p>{product.description}</p>
                </div>

                {/* Campo de mensaje personalizado */}
                <div className="share-custom-message">
                    <textarea
                        className="share-message"
                        rows={3}
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)} />
                </div>

                <div className="share-button-list">
                    {/* Link a Twitter */}
                    <a className="share-button-link"
                        href={twitterLink}
                        target="_blank"
                        rel="noreferrer" ><span><FaXTwitter /></span>Twitter
                    </a>

                    {/* Link a Facebook */}
                    <a className="share-button-link"
                        href={facebookLink}
                        target="_blank"
                        rel="noreferrer"> <span><FaFacebook /></span>Facebook
                    </a>

                    {/* Link a Whatsapp */}
                    <a className="share-button-link"
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"> <span><FaWhatsapp /></span>WhatsApp
                    </a>

                    {/* Link a Instagram */}
                    <a className="share-button-link"
                        href="#"
                        onClick={(e) => { e.preventDefault(); alert("Instagram no permite compartir enlaces desde navegador 😅"); }}><span><IoLogoInstagram /></span>Instagram
                    </a>
                </div>

            </div>
        </>
    );
};

ShareProductModal.propTypes = {
    isOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object,
};