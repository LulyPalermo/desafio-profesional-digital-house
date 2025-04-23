package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import org.springframework.data.repository.CrudRepository;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.ProductImage;

// Si necesito consultas personalizadas, puedo usar JpaRepository<ProductImage, Long> en lugar de CrudRepository para más funcionalidades.
public interface ProductImageRepository extends CrudRepository<ProductImage, Long> { 

}
