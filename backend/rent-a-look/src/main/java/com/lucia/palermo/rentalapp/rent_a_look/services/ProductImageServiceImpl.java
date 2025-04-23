package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.ProductImage;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ProductImageRepository;

@Service
public class ProductImageServiceImpl implements ProductImageService {

    @Autowired
    private ProductImageRepository repository; // Inyectamos el repositorio

    @Override
    @Transactional(readOnly = true) // Solo lectura
    public List<ProductImage> findAll() {
        return (List<ProductImage>) repository.findAll();
    }
}
