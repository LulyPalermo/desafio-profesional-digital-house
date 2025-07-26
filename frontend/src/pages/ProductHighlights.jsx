import { Link } from "react-router-dom"
import { AdminNavBar } from "../components/AdminNavBar"
import { useEffect, useState } from "react";
import { getCaracteristicas } from "../services/productService";

export const ProductHighlights = () => {

    const [caracteristicas, setCaracteristicas] = useState([]);

    // Se cargan las características
    useEffect(() => {
        const fetchCaracteristicas = async () => {
            try {
                const caract = await getCaracteristicas();
                setCaracteristicas(caract);
            } catch (error) {
                console.error("Error cargando categorías", error);
            }
        };
        fetchCaracteristicas();
    }, []);
    return (
        <>
            <AdminNavBar />
            <main className="main-highlights">
                <section className="section-title">
                    <h1 className="page-title">Características</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                </section>

                <section className="highlights-section-table">
                    <div className="highlights-table-header">
                        <p className="header-row-cell highlight-id-cell">ID</p>
                        <p className="header-row-cell highlight-icon-cell">ICONO</p>
                        <p className="header-row-cell highlight-name-cell">CARACTERÍSTICA</p>
                        <p className="header-row-cell highlight-accions-cell">ACCIONES</p>
                    </div>

                    {caracteristicas.map((caract) => (
                        <div className="highlights-table-info" key={caract.id}>
                            <p className="header-row-cell highlight-id-cell">{caract.id}</p>
                            <div className="header-row-cell highlight-icon-cell">
                                <img src={caract.iconUrl} alt={caract.name} className="highlight-img" />
                            </div>
                            <p className="header-row-cell highlight-name-cell">{caract.name}</p>
                            <div className="header-row-cell highlight-accions-cell">
                                <div id="edit-product" >
                                    <span className="accions"><i className="ri-pencil-fill"></i></span>
                                </div>
                                <div id="delete-product">
                                    <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="new-highlights-buttons">
                    <Link to='/addHighlights'>
                        <button className="primary-button">Añadir nueva</button>
                    </Link>
                </div>
            </main>
        </>
    )
}
