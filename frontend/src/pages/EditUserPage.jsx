import { Link, useNavigate, useParams } from "react-router-dom"
import { AdminNavBar } from "../components/AdminNavBar"
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/productService";
import { IconToggle } from "../components/ToggleSwitch";

export const EditUserPage = () => {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data);

            } catch (error) {
                console.error("Error al obtener usuario", error);
            }
        };
        fetchUser();
    }, [id]);

    if (!user) return <p>Cargando...</p>; //Mientras no haya user, solo se renderiza el "Cargando..." El resto del componente no se renderiza hasta que el user esté disponible.

    // Función para actualizar un permiso específico en el estado user
    const handleToggle = (key, value) => {
        setUser(prevUser => ({
            ...prevUser,   // se copia todo lo que había antes en user
            [key]: value // se actualiza solo editarProducto con el nuevo valor
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const permisosActualizados = {
                editarProducto: user.editarProducto,
                eliminarProducto: user.eliminarProducto,
                agregarProducto: user.agregarProducto,
                editarCaracteristica: user.editarCaracteristica,
                eliminarCaracteristica: user.eliminarCaracteristica,
                agregarCategoria: user.agregarCategoria,
            };

            await updateUser(user.id, permisosActualizados);
            alert("Cambios guardados correctamente");
            navigate("/administración");

        } catch (error) {
            console.error("Error al guardar cambios", error);
            alert("Hubo un error al guardar los cambios");
        }
    };

    return (
        <>
            <AdminNavBar />
            <main className="main-users">
                <section className="section-title">
                    <h1 className="page-title">Administrar usuario:</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <div className="admin-user-section">
                        <div className="admin-user-title">
                            <h2>Nombre del usuario:</h2>
                            <p>{`${user.nombre} ${user.apellido}`}</p>                            {/* <p>Administra a qué secciones del administrador podrá acceder este usuario. </p> */}
                        </div>
                        <div>
                            <div className="toggle-user-group">

                                <IconToggle
                                    label="Editar productos"
                                    initialOn={user.editarProducto} // initialOn: El toggle arranca ON u OFF según si editarProducto es true o false.
                                    onToggle={(val) => handleToggle("editarProducto", val)} // onToggle: llama a la función handleToggle para actualizar solo esa propiedad dentro del objeto user
                                />

                                <IconToggle
                                    label="Eliminar productos"
                                    initialOn={user.eliminarProducto}
                                    onToggle={(val) => handleToggle("eliminarProducto", val)}
                                />

                                 <IconToggle
                                    label="Agregar productos"
                                    initialOn={user.agregarProducto}
                                    onToggle={(val) => handleToggle("agregarProducto", val)}
                                />

                                 <IconToggle
                                    label="Editar caracteristicas"
                                    initialOn={user.editarCaracteristica}
                                    onToggle={(val) => handleToggle("editarCaracteristica", val)}
                                />

                                 <IconToggle
                                    label="Eliminar caracteristicas"
                                    initialOn={user.eliminarCaracteristica}
                                    onToggle={(val) => handleToggle("eliminarCaracteristica", val)}
                                />

                                 <IconToggle
                                    label="Agregar categorías"
                                    initialOn={user.agregarCategoria}
                                    onToggle={(val) => handleToggle("agregarCategoria", val)}
                                />


                                {/*  <IconToggle
                                    label="Editar caracteristicas de productos"
                                    initialOn={false}
                                    onToggle={(val) => console.log("¿Activo?", val)} />

                                <IconToggle
                                    label="Eliminar caracteristicas de productos"
                                    initialOn={false}
                                    onToggle={(val) => console.log("¿Activo?", val)} />

                                <IconToggle
                                    label="Editar categorías"
                                    initialOn={false}
                                    onToggle={(val) => console.log("¿Activo?", val)} />

                                <IconToggle
                                    label="Eliminar categorías"
                                    initialOn={false}
                                    onToggle={(val) => console.log("¿Activo?", val)} /> */}
                            </div>
                        </div>
                    </div>

                    <div className="new-product-buttons">
                        <Link to="/administración" className="nav-link secondary-button">
                            Cancelar
                        </Link>
                        <input type="submit" value="Guardar cambios" className="primary-button" />
                    </div>
                </form>

            </main>
        </>
    )
}