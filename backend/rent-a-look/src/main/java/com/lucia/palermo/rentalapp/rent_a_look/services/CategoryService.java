package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return (List<Category>) categoryRepository.findAll();
    }
}
