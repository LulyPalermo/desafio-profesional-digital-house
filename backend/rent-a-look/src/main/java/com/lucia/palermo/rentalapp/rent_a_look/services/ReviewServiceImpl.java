package com.lucia.palermo.rentalapp.rent_a_look.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Review;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ReservationRepository;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ReviewRepository;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public Review save(Review review) {

        Long userId = review.getUser().getId();
        Long productId = review.getProduct().getId();

        // Valida que el usuario haya reservado el producto
        boolean hasReservation = reservationRepository.existsByUserIdAndProductId(userId, productId);
        if (!hasReservation) {
            throw new RuntimeException("Solo puedes reseñar un producto que hayas reservado.");
        }

        // Validar que no exista una reseña previa del mismo usuario
        boolean alreadyReviewed = reviewRepository.existsByUserIdAndProductId(userId, productId);
        if (alreadyReviewed) {
            throw new RuntimeException("Ya has reseñado este producto.");
        }

        // Guarda la reseña
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> findByProduct(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public List<Review> findByUser(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

}
