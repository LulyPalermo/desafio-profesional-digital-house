package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
