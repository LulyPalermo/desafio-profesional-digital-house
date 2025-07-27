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

    // Endpoint para crear una característica nueva
    @PostMapping
    public Caracteristica createCaracteristica(@RequestBody Caracteristica caracteristica) {
        return caracteristicaService.save(caracteristica);
    }

    // Endpoint para eliminar una característica
    @DeleteMapping("/{id}")
    public void deleteCaracteristica(@PathVariable Long id) {
        caracteristicaService.deleteById(id);
    }

    // Endpoint para traer la característica por id
    @GetMapping("/{id}")
    public Caracteristica getCaracteristicaById(@PathVariable Long id) {
        return caracteristicaService.findById(id);
    }

    // Endpoint para editar una característica existente
    @PutMapping("/{id}")
    public Caracteristica updateCaracteristica(@PathVariable Long id, @RequestBody Caracteristica nuevaCaracteristica) {
        return caracteristicaService.update(id, nuevaCaracteristica);
    }

}
