
// Acá se obtienen los productos
export const getProducts = async () => {

    const response = await fetch('http://localhost:8080/products');
    const products = await response.json();

    return products;
}