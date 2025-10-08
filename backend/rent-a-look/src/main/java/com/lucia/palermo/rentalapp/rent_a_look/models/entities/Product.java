package com.lucia.palermo.rentalapp.rent_a_look.models.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * @Column(name = "name-product") Si el nombre fuera name-product deberiamos
     * agregar esta anotacion. Si se llama igual podemos omitirla
     */
    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("products")
    private Category category;

    private Long code;

    private Long price;

    private String size;

    private String status;

    @ManyToMany
    @JoinTable(name = "product_caracteristicas", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "caracteristica_id"))
    @JsonIgnoreProperties("products")
    private List<Caracteristica> caracteristicas;

    /*
     * @ManyToOne
     * 
     * @JoinColumn(name = "caracteristica")
     * 
     * @JsonIgnoreProperties("products")
     * private Caracteristica caracteristica;
     */
    // @OneToMany mappedBy = "product": Un producto puede tener varias imágenes.
    // mappedBy = "product": dice que ProductImage ya maneja la relación con
    // Product.
    // cascade = CascadeType.ALL: Si elimino un producto, también se eliminan sus
    // imágenes asociadas.
    // orphanRemoval = true: Si una imagen ya no pertenece a ningún producto, se
    // elimina de la base de datos.
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true) // "product" hace referencia al
                                                                                      // nombre del atributo en la clase
                                                                                      // ProductImage que establece la
                                                                                      // relación con Product.
    private List<ProductImage> images;

    public List<ProductImage> getImages() {
        return images;
    }

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("product") // evita el bucle infinito
    private List<Review> reviews;

    public void setImages(List<ProductImage> images) {
        this.images = images;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getCode() {
        return code;
    }

    public void setCode(Long code) {
        this.code = code;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Caracteristica> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(List<Caracteristica> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    /*
     * public Caracteristica getCaracteristica() {
     * return caracteristica;
     * }
     * 
     * public void setCaracteristica(Caracteristica caracteristica) {
     * this.caracteristica = caracteristica;
     * }
     */

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
