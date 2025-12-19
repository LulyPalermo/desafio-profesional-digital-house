import { useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { AddReviewModal } from "./AddReviewModal";
import { useUser } from "../Context/UserContext";
import { LoginModal } from "./LoginModal";
import { getReviewsByProduct } from "../services/reviewService";
import PropTypes from "prop-types";
import { SuccessModal } from "./SuccessModal";
import { getReservationsByUser } from "../services/productService";


export const ReviewsBlock = ({ product }) => {
    const { user } = useUser();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [showExistModal, setShowExistModal] = useState(false);
    const [userHasReservation, setUserHasReservation] = useState(false);
    const [showNoReservationModal, setShowNoReservationModal] = useState(false);

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

    // Se verifica si el usuario reservó determinado producto
    useEffect(() => {
        if (!user) return;

        const fetchUserReservations = async () => {
            try {
                const data = await getReservationsByUser(user.id);

                // Verifica si hay una reserva para este producto
                const hasReserved = data.some(res => res.product?.id === product.id);

                setUserHasReservation(hasReserved);
            } catch (error) {
                console.error("Error obteniendo reservas del usuario:", error);
                setUserHasReservation(false);
            }
        };

        fetchUserReservations();
    }, [user, product.id]);


    //Cuando se hace click en "Escribir reseña"
    const openReviewModal = () => {
        if (!user) {
            // si no hay usuario autenticado abre el modal de login
            setShowLoginModal(true);
            return;
        }

        // Si el usuario no reservó ese producto se le avisa
        if (!userHasReservation) {
            setShowNoReservationModal(true);
            return;
        }

        // Si el usuario ya reseñó ese producto se le avisa
        const hasReview = reviews.some((r) => r.user?.id === user.id);
        if (hasReview) {
            // alert("Ya has reseñado este producto");
            setShowExistModal(true);
            return;
        }

        // Si no tiene reseña en ese producto y puede hacerla se le abre modal para agregar una
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

                    <button
                        className={`nav-link secondary-button ${!userHasReservation ? "disabled-review-button" : ""}`}
                        onClick={openReviewModal}>Escribir una reseña</button>
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
                                                day: "2-digit",
                                                month: "2-digit",
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

            {showNoReservationModal && (
                <SuccessModal
                    message="Solo puedes reseñar un producto que hayas reservado."
                    onClose={() => setShowNoReservationModal(false)}
                />
            )}


        </>
    )
}

ReviewsBlock.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string,
    }).isRequired
};

/* ReviewsBlock.propTypes = {
    product: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}; */