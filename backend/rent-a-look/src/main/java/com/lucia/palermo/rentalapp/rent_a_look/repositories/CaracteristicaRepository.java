package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Caracteristica;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
}
