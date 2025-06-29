import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminNavBar } from "../components/AdminNavBar";
import { getCategories, getProductById, updateProduct } from "../services/productService";

export const EditProductPage = () => {
    const { id } = useParams(); // id producto desde URL
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        categoryId: "",
        size: "",
        code: "",
        price: "",
        status: "",
        images: [],
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carga producto y categorías al inicio
    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await getProductById(id);
                const cats = await getCategories();

                setProductData({
                    ...product,
                    categoryId: product.category?.id || "",
                });

                setCategories(cats);
            } catch (error) {
                console.error(error);
                alert("Error cargando producto o categorías");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Manejo de inputs y selects
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // Manejo de carga de imágenes (igual que en AddProductPage)
   /*  const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map((file) => ({
            imageUrl: URL.createObjectURL(file),
        }));

        setProductData({
            ...productData,
            images: imagePreviews,
        });
    }; */

    // Envío del formulario para actualizar
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProduct(id, productData);
            alert("Producto actualizado correctamente");
            navigate("/administración");
        } catch (error) {
            alert(error.message || "Error al actualizar el producto");
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <>
            <AdminNavBar />
            <main className="mainAdmin">
                <section className="section-title">
                    <h1 className="page-title">Editar producto</h1>
                    <Link to="/adminProducts" className="nav-link secondary-button">Volver</Link>
                </section>

                {/* Se reutiliza el mismo formulario que en AddProductPage con los valores de productData */}
                <form onSubmit={handleSubmit}>

                    {/* Sección nombre, detalle y precio producto */}
                    <div className="form-info-section">
                        <div className="form-title">
                            <h1>Información básica del producto</h1>
                        </div>

                        <div className="form-info">
                            {/*  Nombre producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-name">Nombre del producto:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="product-name"
                                    value={productData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Descripción producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-detail">Descripción:</label>
                                <textarea
                                    name="description"
                                    id="product-detail"
                                    placeholder="Aquí va la descripción"
                                    value={productData.description}
                                    onChange={handleChange} />
                            </div>

                            {/* Precio */}
                            <div className="new-product-info">
                                <label htmlFor="product-price">Precio del producto:</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="product-price"
                                    // placeholder="Escribe solo los números sin puntos ni decimales"
                                    value={productData.price}
                                    onChange={handleChange} />
                            </div>

                            {/* Talle producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-size">Talle producto:</label>
                                <select
                                    name="size"
                                    id="product-size"
                                    value={productData.size}
                                    onChange={handleChange}>
                                    <option value="">Elegir una opción</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                                <i className="ri-arrow-down-s-line chevron-select"></i>
                            </div>
                        </div>
                    </div>

                    {/* Sección categoría, código y status */}
                    <div className="form-info-section">
                        <div className="form-title">
                            <h1>Categoría, código y disponibilidad</h1>
                        </div>

                        <div className="form-info">
                            {/* Categoría producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-category">Categoría:</label>
                                <select
                                    name="categoryId"
                                    id="product-category"
                                    value={productData.categoryId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Elegir una opción</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <i className="ri-arrow-down-s-line chevron-select"></i>
                                {/* <i className="ri-arrow-down-s-line chevron-select"></i> */}
                            </div>

                            {/* Código producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-code">Código:</label>
                                <input
                                    type="text"
                                    name="code"
                                    id="product-code"
                                    placeholder="El código solo contiene números"
                                    value={productData.code}
                                    onChange={handleChange} />
                            </div>

                            {/* Status producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-status">Disponibilidad:</label>
                                <select
                                    name="status"
                                    id="product-status"
                                    value={productData.status}
                                    onChange={handleChange}>
                                    <option value="">Elegir una opción</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="No disponible">No disponible</option>
                                </select>
                                <i className="ri-arrow-down-s-line chevron-select"></i>
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
    );
};
