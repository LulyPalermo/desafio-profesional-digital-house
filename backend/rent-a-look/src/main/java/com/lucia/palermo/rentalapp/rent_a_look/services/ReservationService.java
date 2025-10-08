package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Reservation;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ReservationRepository;

@Service
public class ReservationService {

    
    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation save(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByProduct(Long productId) {
        return reservationRepository.findByProductId(productId);
    }
}
