package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByProductId(Long productId);
}
