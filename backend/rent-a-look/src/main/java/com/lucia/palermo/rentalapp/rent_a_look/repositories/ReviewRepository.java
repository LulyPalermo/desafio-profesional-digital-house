package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Review;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProductId(Long productId);

    // Reseñas por usuario
    List<Review> findByUserId(Long userId);

    // Verifica si un usuario ya hizo reseña para un producto
    boolean existsByUserIdAndProductId(Long userId, Long productId);


}