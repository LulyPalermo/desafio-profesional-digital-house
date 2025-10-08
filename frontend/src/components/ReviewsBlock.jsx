import { useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { AddReviewModal } from "./AddReviewModal";
import { useUser } from "../Context/UserContext";
import { LoginModal } from "./LoginModal";
import { getReviewsByProduct } from "../services/reviewService";
import PropTypes from "prop-types";
import { SuccessModal } from "./SuccessModal";


export const ReviewsBlock = ({ product }) => {
    const { user } = useUser();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [showExistModal, setShowExistModal] = useState(false);


    const productId = product.id;

    // Se cargan las reseñas
    useEffect(() => {
        if (!productId) return;

        const fetchData = async () => {
            try {
                const data = (await getReviewsByProduct(productId)) || [];
                setReviews(data);

                if (data.length > 0) {
                    const avg = data.reduce((acc, r) => acc + (r.rating || 0), 0) / data.length;
                    setAverageRating(Number(avg.toFixed(1)));
                } else {
                    setAverageRating(0);
                }
            } catch (error) {
                console.error("Error cargando reseñas:", error);
                setReviews([]);
                setAverageRating(0);
            }
        };

        fetchData();
    }, [productId]);


    //Cuando se hace click en "Escribir reseña"
    const openReviewModal = () => {
        if (!user) {
            // si NO hay usuario autenticado abre el modal de login
            setShowLoginModal(true);
            return;
        }

        // Se verifica si el usuario ya tiene una reseña
        const hasReview = reviews.some((r) => r.user?.id === user.id);
        if (hasReview) {
            // alert("Ya has reseñado este producto");
            setShowExistModal(true);
            return;
        }

        // Si no tiene reseña en ese producto abre modal para agregar una
        setShowReviewModal(true);
    };

    // Función para recalcular promedio
    const recalcAverage = (newReviews) => {
        if (newReviews.length > 0) {
            const avg = newReviews.reduce((acc, r) => acc + (r.rating || 0), 0) / newReviews.length;
            setAverageRating(Number(avg.toFixed(1)));
        } else {
            setAverageRating(0);
        }
    };

    // Callback para actualizar reseñas en tiempo real
    const handleNewReview = (newReview) => {
        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        recalcAverage(updatedReviews);
    };



    return (
        <>
            <div className="product-review">
                <div className="product-review-header">
                    <h3 className="review-title">Reseñas y Calificaciones</h3>
                    <button className="nav-link secondary-button" onClick={openReviewModal}>Escribir una reseña</button>
                </div>

                {/* Puntuación general */}
                <div className="total-review">
                    <div className="total-review-top">
                        <p>{averageRating ? `${averageRating} puntos` : "Sin calificaciones"}</p>
                        {reviews.length > 0 && (
                            <>
                                <span>|</span>
                                <p>
                                    {reviews.length} reseña{reviews.length !== 1 && "s"}
                                </p>
                            </>
                        )}
                    </div>
                    <div className="review-stars">
                        {[...Array(5)].map((_, i) =>
                            i < Math.round(averageRating) ? <IoIosStar key={i} /> : <IoIosStarOutline key={i} />
                        )}
                    </div>
                </div>

                {/* Lista de reseñas */}
                {reviews.length === 0 ? (
                    <p className="no-reviews">Aún no hay reseñas para este producto.</p>
                ) : (
                    <div className="review-grid">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-item">
                                <h4 className="review-name">{review.user?.nombre || "Usuario anónimo"}</h4>

                                <div className="review-center">
                                    <div className="review-stars">
                                        {[...Array(5)].map((_, i) =>
                                            i < (review.rating || 0) ? <IoIosStar key={i} /> : <IoIosStarOutline key={i} />
                                        )}
                                    </div>
                                    <p className="review-date">
                                        {review.createdAt
                                            ? new Date(review.createdAt).toLocaleDateString("es-ES", {
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : ""}
                                    </p>
                                </div>

                                <p className="review-description">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal para agregar reseña*/}
            {user && (
                <AddReviewModal
                    isOpen={showReviewModal}
                    onClose={() => setShowReviewModal(false)}
                    userId={user.id}
                    product={product}
                    onReviewAdded={handleNewReview}
                />
            )}

            {/* Modal de login si no está autenticado */}
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

            {/* Modal de reseña ya realizada */}
            {showExistModal && (
                <SuccessModal message="Ya has reseñado este producto" onClose={() => setShowExistModal(false)} />
            )}

        </>
    )
}


ReviewsBlock.propTypes = {
    product: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};