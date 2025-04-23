package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.lucia.palermo.rentalapp.rent_a_look.services.ProductService;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;


@RestController // Indica que esta clase maneja peticiones HTTP.
/* @RequestMapping("/products") */ // Define la ruta base del controlador.
@CrossOrigin(origins = "http://localhost:5173") // Permite que el frontend acceda a los endpoints.

public class ProductController {

    /* inyectamos la implementacion */
    @Autowired
    private ProductService service;

    @GetMapping("/products") // Expone un endpoint para listar todas los productos.
    public List<Product> list() {
        return service.findAll(); // El framework convierte el list de productos en una estructura json
    }

     @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

// Ahora puedo hacer una petición GET a: http://localhost:8080/products y ver
// todos los productos almacenadas en la base de datos