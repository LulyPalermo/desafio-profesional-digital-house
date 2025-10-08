package com.lucia.palermo.rentalapp.rent_a_look.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Review;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ReviewRepository;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review save(Review review) {
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
