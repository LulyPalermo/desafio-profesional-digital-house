package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;

public interface CategoryService {
    List<Category> findAll();

    Category findById(Long id);

    Category save(Category category);

    void deleteById(Long id);

}
