import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { SuccessModal } from "../components/SuccessModal";

export const AdminPanel = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Estado para modal de permisos
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [permissionMessage, setPermissionMessage] = useState("");

    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    // Se detecta si es mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Redirige al login si no hay usuario
    useEffect(() => {
        if (!user) {
            navigate("/administraciónLogin");
        }
    }, [user, navigate]);

    // Se muestra esto mientras se carga user desde localStorage
    if (!user) return <p>Cargando usuario...</p>;

    // Si está en mobile no se muestra el panel
    if (isMobile) {
        return (
            <>
                <section className="section-title">
                    <h1 className="page-title">Panel de administración</h1>
                </section>
                <section className="section-admin-mobile">
                    <div className="admin-panel-image" >
                        <img src="/assets/img/empty-state.svg" alt="Panel de administración no disponible en mobile" />
                    </div>
                    <p>El panel de administración no está disponible en dispositivos móviles.</p>
                </section>
            </>
        );
    }

    // Función para manejar CTA con permisos
    const handleRestrictedNav = (e, hasPermission, message, path) => {
        e.preventDefault();
        if (hasPermission) {
            navigate(path);
        } else {
            setPermissionMessage(message);
            setShowPermissionModal(true);
        }
    };


    return (
        <>
            <section className="section-title">
                <h1 className="page-title">Panel de administración</h1>
            </section>

            <section className="admin-panel">
                <nav className="admin-menu">

                    {/* El acceso al listado de productos siempre está visible */}
                    <Link to="adminProducts">
                        <button className="admin-panel-button">
                            <i className="ri-file-list-line"></i>
                            Lista de productos
                        </button>
                    </Link>


                    {/* Agregar producto, solo puede acceder si tiene permiso */}
                    <Link
                        to="addProduct"
                        onClick={(e) =>
                            handleRestrictedNav(
                                e,
                                user.isAdmin || user.agregarProducto,
                                "No tienes permisos para agregar productos",
                                "addProduct"
                            )
                        }>
                        <button className="admin-panel-button">
                            <i className="ri-add-fill"></i>
                            Agregar producto
                        </button>
                    </Link>


                    {/* El acceso a administrar características siempre está visible */}
                    <Link to="caracteristicas">
                        <button className="admin-panel-button">
                            <i className="ri-menu-search-line"></i>
                            Administrar características
                        </button>
                    </Link>

                    {/* Agregar categoría, solo puede acceder si tiene permiso */}
                    <Link
                        to="categories"
                        onClick={(e) =>
                            handleRestrictedNav(
                                e,
                                user.isAdmin || user.agregarCategoria,
                                "No tienes permisos para administrar las categorías",
                                "categories"
                            )
                        }
                    >
                        <button className="admin-panel-button">
                            <i className="ri-t-shirt-line"></i>
                            Categorías de productos
                        </button>
                    </Link>

                    {/* Administrar usuarios → solo admin completo */}
                    {user.isAdmin && (
                        <Link to="users">
                            <button className="admin-panel-button">
                                <i className="ri-user-3-line"></i>
                                Usuarios
                            </button>
                        </Link>
                    )}

                </nav>
            </section>

            {/* Modal de permisos */}
            {showPermissionModal && (
                <SuccessModal
                    message={permissionMessage}
                    onClose={() => setShowPermissionModal(false)}
                />
            )}
        </>
    );
};
