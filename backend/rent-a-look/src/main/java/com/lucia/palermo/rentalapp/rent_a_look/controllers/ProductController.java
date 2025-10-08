package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.lucia.palermo.rentalapp.rent_a_look.services.ProductService;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController // Indica que esta clase maneja peticiones HTTP.
/* @RequestMapping("/products") */ // Define la ruta base del controlador.
// @CrossOrigin(origins = "*") // Permite peticiones desde cualquier frontend
public class ProductController {

    /* inyectamos la implementacion */
    @Autowired
    private ProductService service;

    @GetMapping("/products") // Expone un endpoint para listar todas los productos.
    public List<Product> list() {
        return service.findAll(); // El framework convierte el list de productos en una estructura json
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> productOpt = service.findById(id);
        if (productOpt.isPresent()) {
            return ResponseEntity.ok(productOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un producto por ID
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Crear un nuevo producto
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
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // Devuelve un código 201(Created) que dice que
                                                                      // todo salió bien, y también devuelve el producto
                                                                      // que se guardó
        // ResponseEntity<?>: Permite devolver distintos tipos de respuestas HTTP
        // (códigos y cuerpos).
    }

    // Endpoint para actualizar producto completo
    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        try {
            Optional<Product> optionalProduct = service.findById(id);
            if (!optionalProduct.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Product product = optionalProduct.get();

            // Validar si se intenta cambiar el nombre a uno ya existente en otro producto
            Product existingByName = service.findByName(productDetails.getName());
            if (existingByName != null && !existingByName.getId().equals(id)) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Collections.singletonMap("message", "El nombre de este producto ya está en uso."));
            }

            // Actualizar campos
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setCode(productDetails.getCode());
            product.setSize(productDetails.getSize());
            product.setStatus(productDetails.getStatus());

            if (productDetails.getCategory() != null) {
                product.setCategory(productDetails.getCategory());
            }

            // Para actualizar características
            if (productDetails.getCaracteristicas() != null) {
                product.setCaracteristicas(productDetails.getCaracteristicas());
            }

            // No actualizar imágenes por ahora
            // product.setImages(productDetails.getImages());

            Product updatedProduct = service.save(product);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Error actualizando producto"));
        }
    }

    // Endpoint para asignar categoría a un producto existente
    @PutMapping("/products/{id}/category")
    public ResponseEntity<Product> updateCategory(
            @PathVariable Long id,
            @RequestParam Long categoryId) {

        try {
            Product updated = service.updateCategory(id, categoryId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Endpoint para asignar caracteristicas
    @PutMapping("/products/{id}/caracteristicas")
    public ResponseEntity<?> assignCaracteristicasToProduct(
            @PathVariable Long id,
            @RequestBody List<Long> caracteristicaIds) {

        try {
            Product updatedProduct = service.assignCaracteristicas(id, caracteristicaIds);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    // Endpoint para buscar productos
    @GetMapping("/products/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return service.searchProducts(query);
    }

}
