const API_URL_PRODUCTS = "http://localhost:8080/products";
const API_URL_CATEGORIES = "http://localhost:8080/categories";
const API_URL_CARACTERISTICAS = "http://localhost:8080/caracteristicas";


// Obtener todos los productos
export const getProducts = async () => {
    const response = await fetch(API_URL_PRODUCTS);
    if (!response.ok) {
        throw new Error("No se pudieron obtener los productos");
    }
    return await response.json();
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    const response = await fetch(`${API_URL_PRODUCTS}/${id}`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el producto");
    }
    return await response.json();
};

// Acá se elimina producto por ID
export const deleteProductById = async (id) => {
    const response = await fetch(`${API_URL_PRODUCTS}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("No se pudo eliminar el producto");
    }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
    const response = await fetch(API_URL_PRODUCTS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...productData,
            category: {
                id: parseInt(productData.categoryId),
            },
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar producto");
    }

    return await response.json();
};


// Actualizar un producto completo
export const updateProduct = async (id, productData) => {
    const dataToSend = {
        ...productData,
        category: {
            id: parseInt(productData.categoryId),
        },
        // Agregamos la propiedad caracteristicas con solo los IDs
        caracteristicas: productData.caracteristicas
            ? productData.caracteristicas.map(c => ({ id: c.id }))
            : [],
    };
    delete dataToSend.images;

    const response = await fetch(`${API_URL_PRODUCTS}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error actualizando producto");
    }

    return await response.json();
};



// Método para obtener las categorías desde el backend
export const getCategories = async () => {
    const response = await fetch(API_URL_CATEGORIES);
    if (!response.ok) {
        throw new Error("No se pudieron obtener las categorías");
    }
    return await response.json();
};

//Función para actualizar solo la categoría desde el listado de productos
export const updateProductCategory = async (productId, categoryId) => {
    const response = await fetch(`${API_URL_PRODUCTS}/${productId}/category?categoryId=${categoryId}`, {
        method: "PUT",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error actualizando categoría");
    }

    return await response.json();
};

// Crear una nueva categoría
export const createCategory = async (categoryData) => {
    const response = await fetch(API_URL_CATEGORIES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar categoría");
    }

    return await response.json();
};

// Método para obtener las características desde el backend
export const getCaracteristicas = async () => {
    const response = await fetch(API_URL_CARACTERISTICAS);
    if (!response.ok) {
        throw new Error("No se pudieron obtener las características");
    }
    return await response.json();
};

//Función para eliminar características
export const deleteCaracteristica = async (id) => {
    const response = await fetch(`${API_URL_CARACTERISTICAS}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar la característica');
    }
};

// Función para obtener una característica por ID
export const getCaracteristicaById = async (id) => {
    const response = await fetch(`${API_URL_CARACTERISTICAS}/${id}`);
    if (!response.ok) {
        throw new Error("No se pudo obtener la característica");
    }
    return await response.json();
};


// Función para actualizar una característica existente
export const updateCaracteristica = async (id, caracteristicaData) => {
    const response = await fetch(`${API_URL_CARACTERISTICAS}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(caracteristicaData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar característica");
    }

    return await response.json();
};
