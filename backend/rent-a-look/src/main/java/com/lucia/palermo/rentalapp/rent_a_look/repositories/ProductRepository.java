package com.lucia.palermo.rentalapp.rent_a_look.repositories;
import org.springframework.data.repository.CrudRepository;
import com.lucia.palermo.rentalapp.rent_a_look.models.entities.Product;

/* Esto es una interfaz declarativa que hereda de CRUD repositorio,
que es parte del framework de sprint data para implementar un CRUD.
Para todas las operaciones a la base de datos*/
public interface ProductRepository extends CrudRepository<Product, Long>{

}
