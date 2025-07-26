package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Caracteristica;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.CaracteristicaRepository;

@Service
public class CaracteristicaServiceImpl implements CaracteristicaService {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    @Override
    public List<Caracteristica> findAll() {
        return caracteristicaRepository.findAll();
    }

    @Override
    public Caracteristica findById(Long id) {
        return caracteristicaRepository.findById(id).orElse(null);
    }

    @Override
    public Caracteristica save(Caracteristica caracteristica) {
        return caracteristicaRepository.save(caracteristica);
    }
}
