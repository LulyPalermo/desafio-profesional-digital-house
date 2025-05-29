import { Link } from "react-router-dom"
import { AdminNavBar } from "../components/AdminNavBar"

export const ProductHighlights = () => {
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

                    <div className="highlights-table-info">
                        <p className="header-row-cell highlight-id-cell">1</p>
                        <div className="header-row-cell highlight-icon-cell">
                            <img src="/assets/img/prodHigh-fabric.png" alt="" className="highlights-img" />
                        </div>
                        <p className="header-row-cell highlight-name-cell">Tela de lino</p>
                        <div className="header-row-cell highlight-accions-cell">
                            <div id="edit-product" >
                                <span className="accions"><i className="ri-pencil-fill"></i></span>
                            </div>
                            <div id="delete-product">
                                <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                            </div>
                        </div>
                    </div>

                    <div className="highlights-table-info">
                        <p className="header-row-cell highlight-id-cell">1</p>
                        <div className="header-row-cell highlight-icon-cell">
                            <img src="/assets/img/prodHigh-fabric.png" alt="" className="highlights-img" />
                        </div>
                        <p className="header-row-cell highlight-name-cell">Tela de lino</p>
                        <div className="header-row-cell highlight-accions-cell">
                            <div id="edit-product" >
                                <span className="accions"><i className="ri-pencil-fill"></i></span>
                            </div>
                            <div id="delete-product">
                                <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                            </div>
                        </div>
                    </div>
                    
                </section>
                <div className="new-highlights-buttons">
                        <input type="submit" value="Añadir nueva" className="primary-button" />
                    </div>
            </main>
        </>
    )
}
