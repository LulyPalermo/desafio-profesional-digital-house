import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { AdminNavBar } from "../components/AdminNavBar";
import { SuccessModal } from "../components/SuccessModal";

export const AdminLayout = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [permissionMessage, setPermissionMessage] = useState("");

    // Detecta si es mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Redirige si no hay usuario logueado
    useEffect(() => {
        if (!user) {
            navigate("/administraciónLogin");
        }
    }, [user, navigate]);

    // Mientras carga el usuario desde localStorage
    if (!user) return <p>Cargando usuario...</p>;

    // Mobile: se bloquea el acceso
    if (isMobile) {
        return (
            <>
                <AdminNavBar />

                <main className="mainAdmin">
                    <section className="section-title">
                        <h1 className="page-title">Panel de administración</h1>
                    </section>

                    <section className="section-admin-mobile">
                        <img src="/assets/img/empty-state.svg" alt="" />
                        <p>El panel de administración no está disponible en móviles.</p>
                    </section>
                </main>
            </>
        );
    }

    // Desktop: layout del panel admin
    return (
        <>
            <AdminNavBar />

            <main className="mainAdmin">
                <Outlet
                    context={{
                        user,
                        setPermissionMessage,
                        setShowPermissionModal,
                    }}
                />
            </main>

            {showPermissionModal && (
                <SuccessModal
                    message={permissionMessage}
                    onClose={() => setShowPermissionModal(false)}
                />
            )}
        </>
    );
};
