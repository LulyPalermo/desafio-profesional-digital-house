import { Link, useNavigate } from "react-router-dom"
import { AdminNavBar } from "../components/AdminNavBar"
import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

export const UserPage = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Se cargan los usuarios
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const user = await getUsers();
                setUsers(user);
            } catch (error) {
                console.error("Error al cargar los usuarios", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            <AdminNavBar />
            <main className="main-users">
                <section className="section-title">
                    <h1 className="page-title">Usuarios registrados</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                </section>

                <section className="users-section-table">
                    <div className="users-table-header">
                        <p className="header-row-cell users-id-cell">ID</p>
                        <p className="header-row-cell users-name-cell">NOMBRE</p>
                        <p className="header-row-cell users-email-cell">MAIL</p>
                        <p className="header-row-cell users-accions-cell">ACCIONES</p>
                    </div>

                    {users.map((user) => (
                        <div className="users-table-info" key={user.id}>
                            <p className="header-row-cell users-id-cell">{user.id}</p>
                            <p className="header-row-cell users-name-cell">{user.nombre +" "+ user.apellido}</p>
                            <p className="header-row-cell users-email-cell">{user.email}</p>
                            <div className="header-row-cell users-accions-cell">
                                <div id="edit-user" onClick={() => navigate(`/editUser/${user.id}`)}>
                                    <span className="accions"><i className="ri-pencil-fill"></i></span>
                                    <p>Administrar</p>
                                </div>
                            </div>
                        </div>
                          ))}
                </section>

            </main>
        </>
    )
}
