package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ProductRepository;

/* Hacemos la anotacion @Service para que quede como componente de spring */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository; /* Inyectamos el respositorio: */

    @Override
    @Transactional(readOnly = true) // Esto es para hacer una sincronizacion con la base de datos. Todos métodos que sean consultas deben llevar el @Transactional (readOnly = true),readOnly = true significa que es solo de lectura
    public List<Product> findAll() {

        return (List<Product>) repository.findAll();
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

   

}
