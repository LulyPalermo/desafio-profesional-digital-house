package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.ProductImage;
import com.lucia.palermo.rentalapp.rent_a_look.services.ProductImageService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController // Indica que esta clase maneja peticiones HTTP.
/* @RequestMapping("/product-images") */ //Define la ruta base del controlador.
/* @CrossOrigin(origins = "http://localhost:5173")
 */public class ProductImageController {

    @Autowired
    private ProductImageService service;

    @GetMapping("/product_images") // Expone un endpoint para listar todas las imágenes. 
    public List<ProductImage> list(){
        return service.findAll();

    }

}
