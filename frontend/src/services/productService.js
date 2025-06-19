
// Acá se obtienen todos los productos
export const getProducts = async () => {

    const response = await fetch('http://localhost:8080/products');
    const products = await response.json();

    return products;
}

// Acá se elimina producto por ID
export const deleteProductById = async (id) => {
    const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar el producto");
    }
};

// Acá se crea un nuevo producto
export const createProduct = async (productData) => {
    const response = await fetch(`http://localhost:8080/products`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData), // Ya que el servidor espera datos en formato JSON, se usa JSON.stringify() para convertir el objeto JavaScript a un string JSON.
    });

    if(!response.ok){ // Revisa si la respuesta del servidor no es exitosa
        const errorData = await response.json(); // En caso de error, trata de leer la respuesta del servidor como JSON, para tener más detalles del error (por ejemplo, un mensaje de error).
        throw new Error(errorData.message || 'Error al agregar producto'); //Lanza el error con el mensaje correspondiente, y esto se captura en el front para que lo vea el usuario
    }

    return await response.json();

};

// Método para obtener categorías desde el backend
export const getCategories = async () => {
    const response = await fetch('http://localhost:8080/categories');
    if (!response.ok) {
        throw new Error('No se pudieron obtener las categorías');
    }
    return await response.json();
};