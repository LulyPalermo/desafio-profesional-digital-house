package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.AdminUser;
import com.lucia.palermo.rentalapp.rent_a_look.services.AdminUserService;

@RestController
@RequestMapping("/admin_users")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @GetMapping
    public List<AdminUser> getAllAdminUsers() {
        return adminUserService.findAll();
    }

    @GetMapping("/{id}")
    public AdminUser getAdminUserById(@PathVariable Long id) {
        return adminUserService.findById(id);
    }

}
