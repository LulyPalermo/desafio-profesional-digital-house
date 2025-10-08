
const API_URL_ADMIN_USERS = "http://localhost:8080/admin_users"; // endpoint usuarios admin
const API_URL = "http://localhost:8080/api/users"; // endpoint usuarios normales


// Método para obtener los usuarios del admin 
export const getUsers = async () => {
    const response = await fetch(API_URL_ADMIN_USERS);
    if (!response.ok) {
        throw new Error("No se pudieron obtener los usuarios");
    }
    return await response.json();
};

// Función para obtener usuario por ID
export const getUserById = async (id) => {
    const response = await fetch(`${API_URL_ADMIN_USERS}/${id}`);
    if (!response.ok) {
        throw new Error("No se pudo obtener el usuario");
    }
    return await response.json();
};

// Función para actualizar el usuario admin por id
export const updateUser = async (id, userData) => {
    const response = await fetch(`${API_URL_ADMIN_USERS}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar usuario");
    }

    return await response.json();
};


// Métodos para los favoritos
// Obtener favoritos de un usuario
export const getFavorites = async (userId) => {
    const res = await fetch(`${API_URL}/${userId}/favorites`);
    if (!res.ok) throw new Error("Error al obtener favoritos");
    return res.json();
};

// Agregar un producto a favoritos
export const addFavorite = async (userId, productId) => {
    const response = await fetch(`${API_URL}/${userId}/favorites/${productId}`, {
        method: "POST"
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al actualizar favorito");
    }

    return true;
};


// Quitar un producto de favoritos
export const removeFavorite = async (userId, productId) => {
    const res = await fetch(`${API_URL}/${userId}/favorites/${productId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al quitar favorito");
    return true;
};