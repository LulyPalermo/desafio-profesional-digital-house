package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Reservation;
import com.lucia.palermo.rentalapp.rent_a_look.services.ReservationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Crear reserva
    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        Reservation newReservation = reservationService.save(reservation);
        return ResponseEntity.status(HttpStatus.CREATED).body(newReservation);
    }

    // Listar todas las reservas (opcional, para probar)
    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    // Listar reservas por producto
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Reservation>> getReservationsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reservationService.getReservationsByProduct(productId));
    }
}
