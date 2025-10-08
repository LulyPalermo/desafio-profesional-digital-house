const API_URL_REVIEWS = "http://localhost:8080/reviews";

export const getReviewsByProduct = async (productId) => {
    const response = await fetch(`${API_URL_REVIEWS}/product/${productId}`);
    if (!response.ok) {
        throw new Error("No se pudieron obtener las reseñas");
    }
    return await response.json();
};


export const createReview = async (reviewData) => {
    const response = await fetch(API_URL_REVIEWS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al crear la reseña");
    }

    return await response.json();
};