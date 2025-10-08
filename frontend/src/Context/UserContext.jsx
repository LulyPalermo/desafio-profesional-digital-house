import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { getFavorites, addFavorite, removeFavorite } from "../services/userService";


// Se crea el context para poder compartir la info del usuario en toda la app
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    /*    El estado user guarda la info del usuario logueado. Al iniciar, se lee "user" desde localStorage.
    Si no hay nada, será null (nadie está logueado)*/

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user"); // Se busca en localStorage
        return storedUser ? JSON.parse(storedUser) : null; // Si existe, devuelve el objeto
    });

    const [userFavorites, setUserFavorites] = useState([]);

    // Si hay usuario logueado se cargan sus favoritos
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) {
                setUserFavorites([]);
                return;
            }
            try {
                const favs = await getFavorites(user.id);
                setUserFavorites(favs);
            } catch (error) {
                console.error("Error cargando favoritos:", error);
            }
        };
        fetchFavorites();
    }, [user]);

    /*    Función de login: Guarda los datos en el estado(setUser).
    También los guarda en localStorage para que no se pierdan al refrescar*/
    const login = (userData) => {
        setUser(userData); // Se guarda en el estado
        localStorage.setItem("user", JSON.stringify(userData)); // Se guarda en localStorage
    };

    /*     Función de logout: Limpia el estado (user vuelve a null).
    Elimina los datos de localStorage.*/
    const logout = () => {
        setUser(null); // Borra el usuario del estado
        localStorage.removeItem("user"); // Borra del localStorage
        setUserFavorites([]); // se limpian favoritos al desloguear
    };

    // Toggle favoritos (agregar/quitar)
    const toggleFavorite = async (product) => {
        if (!user) return; // acá podrías abrir modal de login si querés

        try {
            const isFavorite = userFavorites.some((p) => p.id === product.id);

            if (isFavorite) {
                await removeFavorite(user.id, product.id);
            } else {
                await addFavorite(user.id, product.id);
            }

            // se refresca la lista desde el backend
            const updatedFavorites = await getFavorites(user.id);
            setUserFavorites(updatedFavorites);
        } catch (error) {
            console.error("Error al actualizar favorito:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, userFavorites, toggleFavorite }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
export { UserContext };

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
