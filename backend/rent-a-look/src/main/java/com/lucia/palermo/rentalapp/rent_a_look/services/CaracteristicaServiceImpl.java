package com.lucia.palermo.rentalapp.rent_a_look.services;

import java.util.List;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Caracteristica;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.CaracteristicaRepository;

@Service
public class CaracteristicaServiceImpl implements CaracteristicaService {

    private final ProductRepository productRepository;

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    CaracteristicaServiceImpl(
            ProductRepository productRepository,
            CaracteristicaRepository caracteristicaRepository) {
        this.productRepository = productRepository;
        this.caracteristicaRepository = caracteristicaRepository;
    }

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

    @Override
    @Transactional
    public void deleteById(Long id) {
        Caracteristica caracteristica = caracteristicaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Característica no encontrada"));

        // Se quita la característica de cada producto en el que esté
        for (Product product : caracteristica.getProducts()) {
            product.getCaracteristicas().remove(caracteristica);
            productRepository.save(product);
        }

        // Se elimina la característica
        caracteristicaRepository.deleteById(id);
    }

    // Editar la característica
    @Override
    public Caracteristica update(Long id, Caracteristica caracteristicaActualizada) {
        Caracteristica existente = caracteristicaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Característica no encontrada con id: " + id));

        existente.setName(caracteristicaActualizada.getName()); //Esto actualiza el nombre
        existente.setIconUrl(caracteristicaActualizada.getIconUrl()); //Esto actualiza la ruta de la imagen

        return caracteristicaRepository.save(existente);
    }

}
