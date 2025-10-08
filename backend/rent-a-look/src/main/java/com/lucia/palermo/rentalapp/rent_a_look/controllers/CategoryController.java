package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.lucia.palermo.rentalapp.rent_a_look.services.CategoryService;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;
import java.util.List;

@RestController
@RequestMapping("/categories")
/*
 * @CrossOrigin(origins = "*")
 */public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.findAll();
    }

    // Nuevo endpoint para agregar una categoría
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    // endpoint para eliminar una categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
