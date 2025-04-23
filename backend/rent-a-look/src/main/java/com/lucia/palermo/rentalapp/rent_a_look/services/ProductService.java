package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;

public interface ProductService {
    List<Product> findAll();

}
