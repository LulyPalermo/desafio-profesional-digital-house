package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;
import com.lucia.palermo.rentalapp.rent_a_look.services.CategoryService;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.findAll();
    }
}
