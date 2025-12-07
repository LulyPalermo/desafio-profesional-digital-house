package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Caracteristica;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.ProductImage;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.CaracteristicaRepository;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.CategoryRepository;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ProductRepository;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ReservationRepository;

/* Hacemos la anotacion @Service para que quede como componente de spring */
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository; /* Inyectamos el respositorio: */
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    @Transactional(readOnly = true) // Esto es para hacer una sincronizacion con la base de datos. Todos métodos que
                                    // sean consultas deben llevar el @Transactional (readOnly = true),readOnly =
                                    // true significa que es solo de lectura
    public List<Product> findAll() {
        return (List<Product>) repository.findAll();
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public Product save(Product product) {
        // Establecer la relación inversa: para cada imagen, le decimos a qué producto
        // pertenece
        if (product.getImages() != null) {
            for (ProductImage image : product.getImages()) {
                image.setProduct(product); // A cada imagen le asigno su "padre"
            }
        }
        return repository.save(product); // Acá se guarda el producto con las imágenes
    }

    @Override
    @Transactional(readOnly = true)
    public Product findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Product updateProduct(Long id, Product updatedProductData) {

        Product existingProduct = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Campos básicos
        existingProduct.setName(updatedProductData.getName());
        existingProduct.setDescription(updatedProductData.getDescription());
        existingProduct.setPrice(updatedProductData.getPrice());
        existingProduct.setSize(updatedProductData.getSize());
        existingProduct.setCode(updatedProductData.getCode());
        existingProduct.setCategory(updatedProductData.getCategory());
        existingProduct.setCaracteristicas(updatedProductData.getCaracteristicas());

        // 🔥 LIMPIAR imágenes viejas (gracias a orphanRemoval = true se borran de la
        // BD)
        if (existingProduct.getImages() != null) {
            existingProduct.getImages().clear();
        }

        // 🔥 CARGAR imágenes nuevas
        if (updatedProductData.getImages() != null) {
            for (ProductImage img : updatedProductData.getImages()) {
                ProductImage newImage = new ProductImage();
                newImage.setImageUrl(img.getImageUrl());
                newImage.setProduct(existingProduct);
                existingProduct.getImages().add(newImage);
            }
        }

        return repository.save(existingProduct);
    }

    @Override
    @Transactional
    public Product updateCategory(Long productId, Long categoryId) {
        Product product = repository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        product.setCategory(category);
        return repository.save(product);
    }

    @Override
    @Transactional
    public Product assignCaracteristicas(Long productId, List<Long> caracteristicaIds) {
        Product product = repository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        List<Caracteristica> caracteristicas = caracteristicaRepository.findAllById(caracteristicaIds);
        product.setCaracteristicas(caracteristicas);

        return repository.save(product);
    }

    @Override
    public List<Product> searchProducts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return (List<Product>) repository.findAll(); // si no hay se devuelve todo
        }
        return repository.findByNameContainingIgnoreCase(query);
    }

    // Este método devuelve solo productos disponibles en un rango de fechas
    @Override
    @Transactional(readOnly = true)
    public List<Product> findAvailableProducts(LocalDate startDate, LocalDate endDate) {
        Iterable<Product> iterable = repository.findAll();
        List<Product> allProducts = new ArrayList<>();
        iterable.forEach(allProducts::add);

        List<Long> reservedProductIds = reservationRepository.findReservedProductIdsBetween(startDate, endDate);

        return allProducts.stream()
                .filter(p -> !reservedProductIds.contains(p.getId()))
                .collect(Collectors.toList());
    }

}
