package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.CategoryRepository;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ProductRepository;
import jakarta.transaction.Transactional;

/* import com.lucia.palermo.rentalapp.rent_a_look.services.CategoryService;
 */import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    CategoryServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            // Aca se desasocian los productos
            List<Product> products = category.getProducts();
            if (products != null) {
                for (Product product : products) {
                    product.setCategory(null);
                    productRepository.save(product);
                }
            }
            // Ahora sí se elimina la categoría
            categoryRepository.delete(category);
        }
    }

}
