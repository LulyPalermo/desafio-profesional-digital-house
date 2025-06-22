package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.lucia.palermo.rentalapp.rent_a_look.services.CategoryService;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;
import java.util.List;

@RestController
@RequestMapping("/categories")
/* @CrossOrigin(origins = "*")
 */public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.findAll();
    }
}
