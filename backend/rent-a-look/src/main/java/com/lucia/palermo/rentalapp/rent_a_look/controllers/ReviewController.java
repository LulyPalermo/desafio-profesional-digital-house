package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Review;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.User;
import com.lucia.palermo.rentalapp.rent_a_look.services.ReviewService;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ProductRepository;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ReviewRepository;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // Crear reseña
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody Review review) {
        // Para evitar que un usuario haga más de 1 reseña por producto:
        if (reviewRepository.existsByUserIdAndProductId(
                review.getUser().getId(),
                review.getProduct().getId())) {
            return ResponseEntity.badRequest().body("Ya has reseñado este producto");
        }

        // Buscar usuario y producto existentes
        User user = userRepository.findById(review.getUser().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Product product = productRepository.findById(review.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Asignar entidades encontradas a la reseña
        review.setUser(user);
        review.setProduct(product);

        Review saved = reviewService.save(review);
        return ResponseEntity.ok(saved);
    }

    // Obtener todas las reseñas
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.findAll());
    }

    // Obtener reseñas por producto
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.findByProduct(productId));
    }

    // Obtener reseñas por usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.findByUser(userId));
    }
}
