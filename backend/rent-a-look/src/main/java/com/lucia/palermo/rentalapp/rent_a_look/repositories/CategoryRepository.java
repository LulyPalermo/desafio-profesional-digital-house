package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
