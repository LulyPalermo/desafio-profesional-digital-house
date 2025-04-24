package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;

public interface ProductService {
    List<Product> findAll();

    void deleteById(Long id); // Método para eliminar producto

    Product save(Product product); // Método para guardar un producto

    Product findByName (String name); // Método para buscar por nombre
}
