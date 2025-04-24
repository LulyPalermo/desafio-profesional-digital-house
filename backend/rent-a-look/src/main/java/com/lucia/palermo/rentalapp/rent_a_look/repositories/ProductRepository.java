package com.lucia.palermo.rentalapp.rent_a_look.repositories;
import org.springframework.data.repository.CrudRepository;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;

/* Esto es una interfaz declarativa que hereda de CRUD repositorio,
que es parte del framework de sprint data para implementar un CRUD.
Para todas las operaciones a la base de datos*/
public interface ProductRepository extends CrudRepository<Product, Long>{

    Product findByName(String name); // Este método nos permite buscar un producto por su nombre, para validar que no esté duplicado antes de guardarlo.

}
