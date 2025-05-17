package com.lucia.palermo.rentalapp.rent_a_look.models.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "users") // la tabla se llamará "users" en la base de datos
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) //No puede quedar vacío (es obligatorio).
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false, unique = true) //unique = true significa que no puede repetirse en la base de datos (no pueden registrarse dos usuarios con el mismo mail).
    private String email;

    @Column(nullable = false)
    private String password;

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
