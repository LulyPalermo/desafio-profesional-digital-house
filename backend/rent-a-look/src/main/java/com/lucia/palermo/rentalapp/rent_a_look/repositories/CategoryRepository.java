package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import org.springframework.data.repository.CrudRepository;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
