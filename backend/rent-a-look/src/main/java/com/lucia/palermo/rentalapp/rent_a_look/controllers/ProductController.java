package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.lucia.palermo.rentalapp.rent_a_look.services.ProductService;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody Product product) { // @RequestBody: Convertimos automáticamente
                                                                           // el JSON que se le manda desde el front en
                                                                           // un objeto Product de Java.
        Product existing = service.findByName(product.getName()); // Se consulta si ya existe en la base de datos un
                                                                  // producto con el mismo nombre.

        if (existing != null) { // Si ya existe un producto con ese nombre, entonces no guardamos el nuevo.
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("message", "El nombre de este producto ya está en uso."));
        }
        Product saved = service.save(product); // Si el nombre es único, se guarda el nuevo producto en la base de
                                               // datos.
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // Devuelve un código 201 (Created) que dice que
                                                                      // todo salió bien, y también devuelve el producto
                                                                      // que se guardó
        // ResponseEntity<?>: Permite devolver distintos tipos de respuestas HTTP
        // (códigos y cuerpos).
    }
}

// Ahora puedo hacer una petición GET a: http://localhost:8080/products y ver
// todos los productos almacenadas en la base de datos