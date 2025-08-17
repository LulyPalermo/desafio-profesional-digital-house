package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.AdminUser;

public interface AdminUserService {
        List<AdminUser> findAll(); // Obtener todos los usuarios

        public AdminUser findById(Long id); // Obtener usuario por id

        AdminUser updateUser(Long id, AdminUser adminUser); // Método para actualizar un usuario

        AdminUser findByEmail(String email);


}
