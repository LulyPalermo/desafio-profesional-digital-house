package com.lucia.palermo.rentalapp.rent_a_look.services;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.User;

import java.util.List;

public interface UserService {
    List<User> findAll(); // Obtener todos los usuarios
    User save(User user); // Guardar un nuevo usuario
    User findByEmail(String email); // Buscar usuario por email
}
