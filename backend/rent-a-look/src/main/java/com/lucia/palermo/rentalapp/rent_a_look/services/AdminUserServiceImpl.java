package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.AdminUser;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.AdminUserRepository;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Override
    public List<AdminUser> findAll() {
        return adminUserRepository.findAll(); // Retorna todos los usuarios almacenados
    }

    @Override
    public AdminUser findById(Long id) {
        return adminUserRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
