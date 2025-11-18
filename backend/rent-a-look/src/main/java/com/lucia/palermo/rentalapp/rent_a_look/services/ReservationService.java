package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Reservation;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ReservationRepository;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    // Guarda una nueva reserva solo si el producto está disponible
    public Reservation save(Reservation reservation) {
        boolean available = isProductAvailable(
                reservation.getProduct().getId(),
                reservation.getStartDate(),
                reservation.getEndDate());

        if (!available) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "El producto ya está reservado en esas fechas");
        }

        return reservationRepository.save(reservation);
    }

    // Verifica si el producto está disponible en las fechas indicadas
    public boolean isProductAvailable(Long productId, LocalDate startDate, LocalDate endDate) {
        List<Long> reservedProductIds = reservationRepository.findReservedProductIdsBetween(startDate, endDate);
        return !reservedProductIds.contains(productId);
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByProduct(Long productId) {
        return reservationRepository.findByProductId(productId);
    }

    // Traer todas las reservas de un usuario
    public List<Reservation> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId);
    }
}
