package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByProductId(Long productId);

    @Query("SELECT r.product.id FROM Reservation r WHERE r.startDate <= :endDate AND r.endDate >= :startDate")
    List<Long> findReservedProductIdsBetween(@Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    List<Reservation> findByUserId(Long userId);

    // Método para saber si un usuario reservó un producto
    boolean existsByUserIdAndProductId(Long userId, Long productId);
}
