package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.CategoryRepository;
/* import com.lucia.palermo.rentalapp.rent_a_look.services.CategoryService;
 */import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }
}
