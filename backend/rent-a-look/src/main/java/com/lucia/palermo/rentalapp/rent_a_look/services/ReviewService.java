package com.lucia.palermo.rentalapp.rent_a_look.services;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Review;
import java.util.List;

public interface ReviewService {
    Review save(Review review);
    List<Review> findAll();
    List<Review> findByProduct(Long productId);
    List<Review> findByUser(Long userId);

}
