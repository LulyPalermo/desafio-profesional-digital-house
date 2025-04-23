
// Acá se obtienen los productos
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