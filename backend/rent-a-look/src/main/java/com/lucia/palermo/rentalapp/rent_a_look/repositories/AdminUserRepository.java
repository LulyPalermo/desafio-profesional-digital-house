package com.lucia.palermo.rentalapp.rent_a_look.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucia.palermo.rentalapp.rent_a_look.models.entities.AdminUser;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {

}
