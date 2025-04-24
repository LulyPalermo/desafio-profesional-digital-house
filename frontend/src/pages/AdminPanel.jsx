import { useEffect, useState } from "react";
import { AdminNavBar } from "../components/AdminNavBar";
import { Link } from "react-router-dom";

export const AdminPanel = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile) {
        return (
            <>
            <AdminNavBar />
                <main className="mainAdmin">
                    <section className="section-title">
                        <h1 className="page-title">Panel de administración</h1>
                    </section>
                    <section className="section-admin-mobile">
                        <div className="admin-panel-image" >
                            <img src="/assets/img/empty-state.svg" alt="Panel de administración no disponible en mobile"/>
                        </div>
                        <p>El panel de administración no está disponible en dispositivos móviles.</p>
                    </section>
                </main>

                {/* <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <h2>El panel de administración no está disponible en dispositivos móviles.</h2>
                </div> */}
            </>

        );

    }

    return (
        <>
            <AdminNavBar />

            <main className="mainAdmin">
                <section className="section-title">
                    <h1 className="page-title">Panel de administración</h1>
                </section>

                <section className="admin-panel">
                    <nav className="admin-menu">
                        <Link to='/adminProducts'>
                            <button className="admin-panel-button">
                                <i className="ri-file-list-line"></i>
                                Lista de productos
                            </button>
                        </Link>

                        <Link to='/addProduct'>
                            <button className="admin-panel-button">
                                <i className="ri-add-fill"></i>
                                {/* <i className="ri-add-large-fill"></i> */}
                                Agregar producto
                            </button>
                        </Link>

                        <Link>
                            <button className="admin-panel-button">
                                <i className="ri-tools-fill"></i>
                                Configuración
                            </button>
                        </Link>
                    </nav>
                </section>
            </main>
        </>
    );
};
