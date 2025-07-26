package com.lucia.palermo.rentalapp.rent_a_look.controllers;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.lucia.palermo.rentalapp.rent_a_look.services.CaracteristicaService;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Caracteristica;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaService caracteristicaService;

    @GetMapping
    public List<Caracteristica> getAllCaracteristicas() {
        return caracteristicaService.findAll();
    }
}
