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
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map((file) => ({
            imageUrl: URL.createObjectURL(file),
        }));

        setProductData({
            ...productData,
            images: imagePreviews,
        });
    };

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

                <form onSubmit={handleSubmit}>
                    {/* Aquí puedes reutilizar el mismo formulario que en AddProductPage con los valores de productData */}

                    {/* Ejemplo: nombre */}
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

                    {/* Resto de inputs igual que AddProductPage, usando productData y handleChange */}

                    {/* Categoría */}
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
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Input imágenes */}
                    <div className="new-product-info">
                        <label htmlFor="product-image">Imágenes:</label>
                        <input
                            type="file"
                            id="product-image"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        {/* Vista previa imágenes */}
                        <div className="preview-images">
                            {productData.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.imageUrl}
                                    alt={`preview-${idx}`}
                                    className="preview-image"
                                />
                            ))}
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
