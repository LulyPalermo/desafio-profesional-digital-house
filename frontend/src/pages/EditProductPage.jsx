import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCaracteristicas, getCategories, getProductById, updateProduct } from "../services/productService";
import { SuccessModal } from "../components/SuccessModal";

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
        caracteristicas: [],
    });


    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false); //modal de confirmacion
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]); // nuevas imágenes

    // Carga producto, categorías y características
    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await getProductById(id);
                const cats = await getCategories();
                const caract = await getCaracteristicas();

                setProductData({
                    ...product,
                    categoryId: product.category?.id || "",
                    images: product.images.map(img => img.imageUrl),
                    caracteristicas: product.caracteristicas || [],
                });

                setCategories(cats);
                setCaracteristicas(caract);  // Guarda características en estado

            } catch (error) {
                console.error(error);
                alert("Hubo un error al modificar el producto");
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

    // Manejo de imágenes nuevas
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    // Envío del formulario para actualizar
    const handleSubmit = async (e) => {
        e.preventDefault();

        let finalImages = productData.images; // si no se eligen imágenes nuevas, quedan las actuales

        if (selectedFiles.length > 0) {
            // Si hay nuevas imágenes, se reemplazan todas con sus nombres
            finalImages = selectedFiles.map(f => `/assets/img/${f.name}`);
        }

        try {
            // Se llama al updateProduct para actualizar el producto en el backend
            await updateProduct(id, {
                ...productData,
                images: finalImages.map(url => ({ imageUrl: url }))
            });


            setShowSuccessModal(true);

            // Se guarda el producto actualizado en localStorage para que en el detalle de producto se actualicen los cambios
            // localStorage.setItem("selectedProduct", JSON.stringify(updatedProduct));

        } catch (error) {
            alert(error.message || "Error al actualizar el producto");
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <>
            <section className="section-title">
                <h1 className="page-title">Editar producto</h1>
                <Link to="/administración/adminProducts" className="nav-link secondary-button">Volver</Link>
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

                {/* Sección imágenes  */}
                <div className="form-info-section">
                    <div className="form-title">
                        <h1>Imágenes</h1>
                        <p>Para mantener el orden nombra a tus imágenes seguidas de un número. Ejemplo: <br />nombre1.png <br />nombre.png</p>
                    </div>
                    <div className="form-info">
                        <label htmlFor="product-image">
                            <div className="upload-picture">
                                <span><i className="ri-upload-cloud-2-line"></i></span>
                                <div className="upload-picture-info">
                                    <p>Click aquí para subir tus fotos</p>
                                </div>
                            </div>
                        </label>

                        {/* Input para las imágenes */}
                        <input
                            type="file"
                            // name="images"
                            id="product-image"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            style={{ display: 'none' }} />

                        <div>
                            {selectedFiles.length > 0 && (
                                <p className="image-count">
                                    {selectedFiles.length} imágen{selectedFiles.length > 1 ? "es" : ""} seleccionad{selectedFiles.length > 1 ? "as" : "a"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sección categoría y código  */}
                <div className="form-info-section">
                    <div className="form-title">
                        <h1>Categoría, código </h1>
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
                    </div>
                </div>

                {/* Sección características producto */}
                <div className="form-highlights-section">
                    <div className="form-title">
                        <h1>Editar las características del producto:</h1>
                    </div>
                    <div className="new-product-info">
                        <div className="highlights-checkbox-group">
                            {caracteristicas.map((caract) => {
                                const isChecked = productData.caracteristicas.some(c => c.id === caract.id);

                                const handleCheckboxChange = (e) => {
                                    if (e.target.checked) {
                                        // Agregar característica
                                        setProductData(prev => ({
                                            ...prev,
                                            caracteristicas: [...prev.caracteristicas, caract]
                                        }));
                                    } else {
                                        // Quitar característica
                                        setProductData(prev => ({
                                            ...prev,
                                            caracteristicas: prev.caracteristicas.filter(c => c.id !== caract.id)
                                        }));
                                    }
                                };

                                return (
                                    <label key={caract.id} style={{ display: "block", marginBottom: "5px" }}>
                                        <input
                                            type="checkbox"
                                            value={caract.id}
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        {" "}{caract.name}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="new-product-buttons">
                    <Link to="/administración/adminProducts" className="nav-link secondary-button">
                        Cancelar
                    </Link>
                    <input type="submit" value="Guardar cambios" className="primary-button" />
                </div>
            </form>


            {showSuccessModal && (
                <SuccessModal
                    message="El producto se ha actualizado correctamente."
                    onClose={() => {
                        setShowSuccessModal(false);
                        navigate("/administración");
                    }}
                />
            )
            }
        </>
    );
};
