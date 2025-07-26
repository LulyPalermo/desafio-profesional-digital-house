package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;
import java.util.Optional;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;

public interface ProductService {
    List<Product> findAll();

    Optional<Product> findById(Long id); // Método para buscar producto por ID

    void deleteById(Long id); // Método para eliminar producto

    Product save(Product product); // Método para guardar un producto

    Product findByName (String name); // Método para buscar por nombre

    Product updateCategory(Long productId, Long categoryId); //Endpoint específico para actualizar solo la categoría de un producto.

    Product assignCaracteristicas(Long productId, List<Long> caracteristicaIds); //Método para asignar características a un producto existente.

}
