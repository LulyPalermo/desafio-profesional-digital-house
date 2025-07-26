package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Caracteristica;

public interface CaracteristicaService {
    List<Caracteristica> findAll();
    
    Caracteristica findById(Long id);
    
}
