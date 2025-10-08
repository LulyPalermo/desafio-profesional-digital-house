import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { createReview } from '../services/reviewService';

export const AddReviewModal = ({ isOpen, onClose, userId, product, onReviewAdded }) => {
    const [rating, setRating] = useState(0); // Calificación seleccionada
    const [hover, setHover] = useState(0);   // Preview al pasar el mouse
    const [comment, setComment] = useState("");

    if (!isOpen) return null; // Si no debe mostrarse, no renderiza nada

    const submitReview = async (e) => {
        e.preventDefault();

        if (rating === 0 || comment.trim() === "") {
            alert("Debes seleccionar una calificación y escribir un comentario");
            return;
        }

        const reviewData = {
            rating,
            comment,
            user: { id: userId },
            product: { id: product.id },
        };

        try {
            const res = await createReview(reviewData);
            console.log("Reseña creada:", res);

            // Se actualiza la lista de reseñas en tiempo real
            if (onReviewAdded) {
                onReviewAdded(res);
            }
            onClose();
        } catch (error) {
            console.error("Error al crear la reseña:", error.message);
            alert(error.message);
        }
    };

    return (
        <>
            {/* Fondo oscuro detrás del modal */}
            <div className="revew-modal-overlay" onClick={onClose}></div>

            {/* Contenedor del modal */}
            <div className="review-modal-content">

                <div className="review-modal-header">
                    <button className="login-close-button" onClick={onClose}><i className="ri-close-large-line"></i></button>
                    <h3>Escribe una reseña</h3>
                </div>

                <div className='review-modal-center'>
                    <p>{product.name}</p>
                    <div className='review-modal-center-left'>
                        <img src={product.images[0].imageUrl} alt={product.name} className="review-image" />
                        <div className="add-review-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    {(hover || rating) >= star ? (
                                        <IoIosStar />
                                    ) : (
                                        <IoIosStarOutline />
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='review-modal-bottom'>
                    <form className="login-modal-form" onSubmit={submitReview}>
                        {/* Descripción reseña */}
                        <div className="new-product-info">
                            <label htmlFor="product-detail">Tu reseña:</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Si alquilaste este producto ¡nos encantaría conocer tu opinión!"
                            />
                        </div>
                        <button type="submit" className="primary-button">Enviar reseña</button>
                    </form>

                </div>

            </div>
        </>
    );
};

//Validación de props:
AddReviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                imageUrl: PropTypes.string.isRequired
            })
        ).isRequired,
    }).isRequired,
    userId: PropTypes.number.isRequired,
    onReviewAdded: PropTypes.func.isRequired,
};