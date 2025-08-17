package com.lucia.palermo.rentalapp.rent_a_look.models.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "admin_users")
public class AdminUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String apellido;

    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "is_admin", nullable = false)
    private boolean isAdmin = false;

    @Column(name = "editar_producto", nullable = false)
    private boolean editarProducto = false;

    @Column(name = "eliminar_producto", nullable = false)
    private boolean eliminarProducto = false;

    @Column(name = "agregar_producto", nullable = false)
    private boolean agregarProducto = false;

    @Column(name = "editar_caracteristica", nullable = false)
    private boolean editarCaracteristica = false;

    @Column(name = "eliminar_caracteristica", nullable = false)
    private boolean eliminarCaracteristica = false;

    @Column(name = "agregar_categoria", nullable = false)
    private boolean agregarCategoria = false;

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

    @JsonProperty("isAdmin")
    public boolean isAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public boolean isEditarProducto() {
        return editarProducto;
    }

    public void setEditarProducto(boolean editarProducto) {
        this.editarProducto = editarProducto;
    }

    public boolean isEliminarProducto() {
        return eliminarProducto;
    }

    public void setEliminarProducto(boolean eliminarProducto) {
        this.eliminarProducto = eliminarProducto;
    }

    public boolean isAgregarProducto() {
        return agregarProducto;
    }

    public void setAgregarProducto(boolean agregarProducto) {
        this.agregarProducto = agregarProducto;
    }

     public boolean isEditarCaracteristica() {
        return editarCaracteristica;
    }

    public void setEditarCaracteristica(boolean editarCaracteristica) {
        this.editarCaracteristica = editarCaracteristica;
    }

     public boolean isEliminarCaracteristica() {
        return eliminarCaracteristica;
    }

    public void setEliminarCaracteristica(boolean eliminarCaracteristica) {
        this.eliminarCaracteristica = eliminarCaracteristica;
    }

     public boolean isAgregarCategoria() {
        return agregarCategoria;
    }

    public void setAgregarCategoria(boolean agregarCategoria) {
        this.agregarCategoria = agregarCategoria;
    }

}
