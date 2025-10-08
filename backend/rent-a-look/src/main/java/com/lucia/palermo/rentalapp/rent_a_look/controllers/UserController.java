package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.User;
import com.lucia.palermo.rentalapp.rent_a_look.services.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
// Endpoint base para usuarios
/*
 * @CrossOrigin(origins = "*") // Permite peticiones desde cualquier frontend
 */public class UserController {

    @Autowired
    private UserService userService;

    // Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) { // recibe un user en la petición
        // Aquí se pueden agregar validaciones

        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) { // Verifica si el usuario ya existe para evitar duplicados
            return ResponseEntity.badRequest().build();
        }
        User savedUser = userService.save(user);
        return ResponseEntity.ok(savedUser); // retorna el usuario guardado
    }

    // Ver todos los usuarios registrados
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    // Login de usuario
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) { // Recibe un User con email y password.
        User existingUser = userService.findByEmail(user.getEmail()); // Busca el usuario por email.
        if (existingUser == null) {
            // Usuario no existe
            return ResponseEntity.status(404).build();
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            // Contraseña incorrecta
            return ResponseEntity.status(401).build();
        }

        // Login exitoso
        return ResponseEntity.ok(existingUser);
    }

    // Obtener favoritos de un usuario
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<Product>> getFavoriteProducts(@PathVariable Long userId) {
        User user = userService.findById(userId); // devuelve directamente User
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.getFavoriteProducts());
    }

    // Marcar un producto como favorito
    @PostMapping("/{userId}/favorites/{productId}")
    public ResponseEntity<Void> addFavoriteProduct(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            userService.addFavorite(userId, productId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Quitar un producto de favoritos
    @DeleteMapping("/{userId}/favorites/{productId}")
    public ResponseEntity<Void> removeFavoriteProduct(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            userService.removeFavorite(userId, productId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
