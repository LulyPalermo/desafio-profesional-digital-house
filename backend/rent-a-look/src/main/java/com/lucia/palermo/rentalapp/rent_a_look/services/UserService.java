package com.lucia.palermo.rentalapp.rent_a_look.services;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.User;

import java.util.List;

public interface UserService {
    List<User> findAll(); // Obtener todos los usuarios

    User save(User user); // Guardar un nuevo usuario

    User findByEmail(String email); // Buscar usuario por email

    User findById(Long id);

    List<Product> getFavorites(Long userId); // Obtener los productos favoritos de un usuario

    void addFavorite(Long userId, Long productId); // Marcar un producto como favorito

    void removeFavorite(Long userId, Long productId); // Quitar un producto de favoritos
}
