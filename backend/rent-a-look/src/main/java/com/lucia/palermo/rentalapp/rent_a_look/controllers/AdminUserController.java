package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PutMapping("/{id}") // Endpoint para actualizar el usuario con el id dado.
    public AdminUser updateAdminUser(@PathVariable Long id, @RequestBody AdminUser updatedUser) {
        return adminUserService.updateUser(id, updatedUser); // Llama a adminUserService.updateUser para aplicar los
                                                             // cambios
    }

    // Endpoint para login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        AdminUser user = adminUserService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
        }

        // Aquí comparás la contraseña en texto plano (solo para proyecto académico)
        if (!user.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }

        // Si todo OK, devolvés el usuario o algún token (por ahora, el usuario)
        return ResponseEntity.ok(user);
    }

}
