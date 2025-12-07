import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductNameExistsModal } from "../components/ProductNameExistsModal";
import { createProduct, getCategories } from "../services/productService";

export const AddProductPage = () => {

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        categoryId: '',
        size: '',
        code: '',
        price: '',
        status: '',
        images: []
    });

    const navigate = useNavigate(); // Esto es para que cuando agregue un producto me devuelva al dashboard

    const [showNameExistsModal, setShowNameExistsModal] = useState(false);

    const [categories, setCategories] = useState([]); // estado para categorías dinámicas

    useEffect(() => {
        getCategories()
            .then(data => setCategories(data))
            .catch(() => alert("No se pudieron cargar las categorías"));
    }, []);

    // Manejo de inputs de texto y selects
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    // Manejo de carga de imágenes
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map(file => ({
            imageUrl: URL.createObjectURL(file), // Esto me da una URL para la vista previa
        }));

        setProductData({
            ...productData,
            images: imagePreviews
        });
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProduct(productData);
            navigate('/administración');
        } catch (error) {
            if (error.message === "El nombre de este producto ya está en uso.") {
                setShowNameExistsModal(true);
                setProductData({ ...productData, name: '' }); // Esto limpia el nombre del formulario
            } else {
                alert(error.message || 'Error al agregar el producto');
            }
        }
    };

    return (

        <>
            <section className="section-title">
                <h1 className="page-title">Agregar nuevo producto</h1>
                <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
            </section>

            <form onSubmit={handleSubmit}>
                {/* Sección nombre, detalle y precio producto */}
                <div className="form-info-section">
                    <div className="form-title">
                        <h1>Información básica del producto</h1>
                    </div>

                    <div className="form-info">

                        {/* Nombre producto */}
                        <div className="new-product-info">
                            <label htmlFor="product-name">Nombre del producto:</label>
                            <input
                                type="text"
                                name="name"
                                id="product-name"
                                placeholder="Nombre"
                                value={productData.name}
                                onChange={handleChange} />
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

                        {/* Precio producto */}
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

                {/* Sección carga de fotos*/}
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
                                    {/* <p>(SVG, JPG, o PNG)</p> */}
                                </div>
                            </div>
                        </label>

                        {/* Input para las imágenes */}
                        <input
                            type="file"
                            name="images"
                            id="product-image"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            style={{ display: 'none' }} />

                        <div>
                            {/* Cantidad de imágenes seleccionadas */}
                            {productData.images.length > 0 && (
                                <>
                                    <p className="image-count">
                                        {productData.images.length} imagen{productData.images.length > 1 ? "es" : ""} seleccionada{productData.images.length > 1 ? "s:" : ""}
                                    </p>

                                    {/* Vista previa de las imágenes */}
                                    <div className="preview-images">
                                        {productData.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.imageUrl}
                                                alt={`preview-${index}`}
                                                className="preview-image"
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
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
                    </div>
                </div>

                <div className="new-product-buttons">
                    <Link to="/administración" className="nav-link secondary-button">Cancelar</Link>
                    <input type="submit" value="Agregar producto" className="primary-button" />
                </div>
            </form>


            {showNameExistsModal && (
                <ProductNameExistsModal onClose={() => setShowNameExistsModal(false)} />
            )}
        </>
    )
}
