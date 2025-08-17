import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

// Se crea el context para poder compartir la info del usuario en toda la app
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    /*    El estado user guarda la info del usuario logueado. Al iniciar, se lee "user" desde localStorage.
    Si no hay nada, será null (nadie está logueado)*/

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user"); // Se busca en localStorage
        return storedUser ? JSON.parse(storedUser) : null; // Si existe, devuelve el objeto
    });

     // Para asegurar sincronización si otro tab cambia el localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

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
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
export { UserContext };

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
