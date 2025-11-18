package com.lucia.palermo.rentalapp.rent_a_look.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lucia.palermo.rentalapp.rent_a_look.services.EmailService;

@RestController
@RequestMapping("/test-email")
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @GetMapping
    public String sendTestEmail() {
        String to = "lulypalermo@gmail.com";
        String subject = "Correo de prueba desde mi API 🎉";
        String content = "<h2>¡Funciona!</h2><p>Este es un correo de prueba enviado desde Spring Boot con SendGrid.</p>";

        emailService.sendEmail(to, subject, content);

        return "Correo de prueba enviado (si no lo ves, revisa el spam)";
    }
}
