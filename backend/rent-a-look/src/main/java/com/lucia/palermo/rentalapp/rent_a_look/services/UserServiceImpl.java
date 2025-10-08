package com.lucia.palermo.rentalapp.rent_a_look.services;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.User;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ProductRepository;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll(); // Retorna una lista con todos los usuarios almacenados
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User save(User user) { // Guarda un nuevo usuario o actualiza uno existente en la base de datos.
                                  // Retorna el usuario guardado (con ID asignado si es nuevo).
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) { // Busca un usuario por su correo electrónico para login y validaciones
        return userRepository.findByEmail(email);
    }

    @Override
    public List<Product> getFavorites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return user.getFavoriteProducts();
    }

    @Override
    public void addFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        user.getFavoriteProducts().add(product);
        userRepository.save(user); // guarda la relación en la tabla intermedia
    }

    @Override
    public void removeFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        user.getFavoriteProducts().remove(product);
        userRepository.save(user); // actualiza la relación en la tabla intermedia
    }
}
