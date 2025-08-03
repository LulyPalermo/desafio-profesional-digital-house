import { Link, useParams } from "react-router-dom"
import { AdminNavBar } from "../components/AdminNavBar"
import { useEffect, useState } from "react";
import { getUserById } from "../services/productService";
import { IconToggle } from "../components/ToggleSwitch";

export const EditUserPage = () => {

    const { id } = useParams();
    const [user, setUser] = useState(null);


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

    return (
        <>
            <AdminNavBar />
            <main className="main-users">
                <section className="section-title">
                    <h1 className="page-title">Administrar usuario:</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                </section>

                <form>
                    <div className="admin-user-section">
                        <div className="admin-user-title">
                            <h2>Nombre del usuario:</h2>
                            <p>{user ? `${user.nombre} ${user.apellido}` : "Cargando..."}</p>
                            {/* <p>Administra a qué secciones del administrador podrá acceder este usuario. </p> */}
                        </div>
                        <div>
                            <div className="toggle-user-group">

                                <IconToggle
                                    label="Editar productos"
                                    initialOn={true}
                                    onToggle={(val) => console.log("¿Activo?", val)} />

                                    <IconToggle
                                    label="Eliminar productos"
                                    initialOn={true}
                                    onToggle={(val) => console.log("¿Activo?", val)} />

                                <IconToggle
                                    label="Editar caracteristicas de productos"
                                    initialOn={true}
                                    onToggle={(val) => console.log("¿Activo?", val)} />

                                    <IconToggle
                                    label="Eliminar caracteristicas de productos"
                                    initialOn={true}
                                    onToggle={(val) => console.log("¿Activo?", val)} />

                                <IconToggle
                                    label="Editar categorías"
                                    initialOn={true}
                                    onToggle={(val) => console.log("¿Activo?", val)} />

                                    <IconToggle
                                    label="Eliminar categorías"
                                    initialOn={true}
                                    onToggle={(val) => console.log("¿Activo?", val)} />
                            

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
