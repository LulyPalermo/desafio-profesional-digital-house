import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCategoryById, getCategories } from "../services/productService";
import { SuccessModal } from "../components/SuccessModal";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

export const CategoryPage = () => {

    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [errorModal, setErrorModal] = useState(null);

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

    // Manejar click en eliminar
    const handleDeleteClick = (cat) => {
        setCategoryToDelete(cat);
        setShowModal(true);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        try {
            await deleteCategoryById(categoryToDelete.id);
            setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id));
            setShowModal(false);
            setCategoryToDelete(null);
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
            setErrorModal("No se pudo eliminar la categoría. Es posible que tenga productos asociados.");
        }
    };

    // Cancelar eliminación
    const handleCloseModal = () => {
        setShowModal(false);
        setCategoryToDelete(null);
    };

    return (
        <>
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
                                <div id="delete-category" onClick={() => handleDeleteClick(cat)}>
                                    <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="new-category-buttons">
                    <Link to='/administración/addCategory'>
                        <button className="primary-button">Añadir nueva</button>
                    </Link>
                </div>

            {/* Modal de confirmación */}
            {showModal && (
                <ConfirmDeleteModal
                    message={`¿Estás segura/o de que querés eliminar la categoría "${categoryToDelete.name}"?
                    Ten en cuenta que todos los productos asociados también podrían verse afectados.`}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}

            {/* Modal de error */}
            {errorModal && (
                <SuccessModal
                    message={errorModal}
                    onClose={() => setErrorModal(null)}
                />
            )}
        </>
    )
}
