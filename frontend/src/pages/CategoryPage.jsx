import { Link } from "react-router-dom";
import { AdminNavBar } from "../components/AdminNavBar"
import { useEffect, useState } from "react";
import { getCategories } from "../services/productService";

export const CategoryPage = () => {

    const [categories, setCategories] = useState([]);

    // Se cargan las categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await getCategories();
                setCategories(cats);
            } catch (error) {
                console.error("Error cargando categorías", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            <AdminNavBar />
            <main className="main-categories">
                <section className="section-title">
                    <h1 className="page-title">Categorías</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                </section>

                <section className="category-section-table">
                    <div className="category-table-header">
                        <p className="header-row-cell category-id-cell">ID</p>
                        <p className="header-row-cell category-img-cell">IMAGEN</p>
                        <p className="header-row-cell category-name-cell">CATEGORÍA</p>
                        <p className="header-row-cell category-description-cell">DESCRIPCIÓN</p>
                        <p className="header-row-cell category-accions-cell">ACCIONES</p>
                    </div>

                    {categories.map((cat) => (
                        <div className="category-table-info" key={cat.id}>
                            <p className="header-row-cell category-id-cell">{cat.id}</p>
                            <div className="header-row-cell category-img-cell">
                                <img src={cat.imageUrl} alt={cat.name} className="category-img" />
                            </div>
                            <p className="header-row-cell category-name-cell">{cat.name}</p>
                            <p className="header-row-cell category-description-cell">{cat.description}</p>
                            <div className="header-row-cell category-accions-cell">
                                {/*  <div id="edit-product" > <span className="accions"><i className="ri-pencil-fill"></i></span></div> */}
                                <div id="delete-product">
                                    <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="new-category-buttons">
                    <Link to='/addCategory'>
                        <button className="primary-button">Añadir nueva</button>
                    </Link>
                </div>
            </main>
        </>
    )
}
