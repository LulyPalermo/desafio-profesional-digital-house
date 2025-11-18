import { Link, useNavigate } from "react-router-dom"
import { AdminNavBar } from "../components/AdminNavBar"
import { useContext, useEffect, useState } from "react";
import { deleteProductById, getCategories, getProducts, updateProductCategory } from "../services/productService";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";
import { SuccessModal } from "../components/SuccessModal";
import { UserContext } from "../Context/UserContext";

export const AdminProducts = () => {

    const { user } = useContext(UserContext); // Se obtiene el usuario logueado

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // Guardar categorías
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showPermissionModal, setShowPermissionModal] = useState(false);

    const navigate = useNavigate();

    // Se cargan productos
    const showAllProducts = async () => {
        const allProducts = await getProducts();
        setProducts(allProducts);
    };

    // Se cargan las categorías
    const loadCategories = async () => {
        try {
            const cats = await getCategories();
            setCategories(cats);
        } catch (error) {
            console.error("Error cargando categorías", error);
        }
    };

    useEffect(() => {
        showAllProducts();
        loadCategories();
    }, []);

    // Función para manejar click en editar
    const handleEditClick = (productId) => {
        if (user?.editarProducto || user?.isAdmin) {
            navigate(`/editProduct/${productId}`);
        } else {
            setShowPermissionModal(true); // si no tiene permisos, se muestra modal
        }
    };

    // Función para manejar click en eliminar
    // Lógica de confirmación y eliminación dentro del componente:
    const handleDeleteClick = (productId) => {
        if (user?.eliminarProducto || user?.isAdmin) {
            setSelectedProductId(productId);
            setShowDeleteModal(true);
        } else {
            setShowPermissionModal(true); // si no tiene permisos, se muestra modal
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteProductById(selectedProductId);
            showAllProducts();
            setShowDeleteModal(false);
            setSelectedProductId(null);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("Hubo un problema al eliminar el producto.");
        }
    };

    // Función que maneja asignar categoría a producto
    const handleCategoryChange = async (productId, newCategoryId) => {
        try {
            await updateProductCategory(productId, newCategoryId);
            await showAllProducts(); // refrescar lista
        } catch (error) {
            console.error("Error actualizando categoría", error);
        }
    };

    return (
        <>
            <AdminNavBar />
            <main className="mainAdmin">
                <section className="section-title">
                    <h1 className="page-title">Productos</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                </section>

                <section className="section-table">
                    <div className="table-header">
                        <p className="header-row-cell id-cell">ID</p>
                        <p className="header-row-cell img-cell">IMÁGEN</p>
                        <p className="header-row-cell name-cell">NOMBRE</p>
                        <p className="header-row-cell category-cell">CATEGORÍA</p>
                        <p className="header-row-cell size-cell">TALLE</p>
                        <p className="header-row-cell code-cell">CÓDIGO</p>
                        <p className="header-row-cell price-cell">PRECIO</p>
                        <p className="header-row-cell accions-cell">ACCIONES</p>
                    </div>

                    {products.map(product => (
                        <div className="table-info" key={product.id}>
                            <p className="header-row-cell id-cell">{product.id}</p>

                            <div className="header-row-cell img-cell">
                                {product.images && product.images.length > 0 && product.images[0].imageUrl ? (
                                    <img
                                        src={product.images[0].imageUrl}
                                        alt="imagen del producto"
                                        className="product-image"
                                    />
                                ) : (
                                    <span className="no-image">Sin imagen</span>
                                )}
                            </div>
                            <p className="header-row-cell name-cell">{product.name}</p>
                            <p className="header-row-cell category-cell">
                                {product.category ? (
                                    product.category.name
                                ) : (
                                    <select
                                        onChange={(e) => handleCategoryChange(product.id, e.target.value)}
                                        defaultValue="">
                                        <option value="" disabled>Asignar</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </p>
                            <p className="header-row-cell size-cell">{product.size}</p>
                            <p className="header-row-cell code-cell">{product.code}</p>
                            <p className="header-row-cell price-cell">{product.price}</p>
                            <div className="header-row-cell accions-cell">
                                <div id="edit-product" onClick={() => handleEditClick(product.id)}>
                                    <span className="accions"><i className="ri-pencil-fill"></i></span>
                                </div>
                                <div id="delete-product" onClick={() => handleDeleteClick(product.id)}>
                                    <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

            </main>
            {/* Modal de confirmación */}
            {showDeleteModal && (
                <ConfirmDeleteModal
                    message="¿Estás segura/o de que queres eliminar este producto?"
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                />
            )}

            {/* Modal si no tiene permisos para editar o eliminar */}
            {showPermissionModal && (
                <SuccessModal
                    message="No tienes permisos para realizar esta acción"
                    onClose={() => setShowPermissionModal(false)}
                />
            )}
        </>
    )
}