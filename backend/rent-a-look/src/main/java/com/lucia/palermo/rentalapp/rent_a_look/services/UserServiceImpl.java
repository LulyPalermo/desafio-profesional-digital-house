package com.lucia.palermo.rentalapp.rent_a_look.services;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.User;
import com.lucia.palermo.rentalapp.rent_a_look.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll(); //Retorna una lista con todos los usuarios almacenados en la base de datos.
    }

    @Override
    public User save(User user) { //Guarda un nuevo usuario o actualiza uno existente en la base de datos. Retorna el usuario guardado (con ID asignado si es nuevo).
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) { //Busca un usuario por su correo electrónico.
        return userRepository.findByEmail(email);
    }
}
