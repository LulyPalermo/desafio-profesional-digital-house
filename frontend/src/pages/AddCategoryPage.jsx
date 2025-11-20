import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SuccessModal } from "../components/SuccessModal";

export const AddCategoryPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imageFile: null,
    });

    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false); //modal de confirmacion

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                imageFile: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.imageFile) {
            alert("Debes subir una imagen");
            return;
        }

        // Acá se obtiene el nombre de la imagen subida
        const imagePath = `/assets/img/${formData.imageFile.name}`;

        // Acá se copia manualmente ese archivo a public/assets/img antes de enviar
        try {
            const response = await fetch("http://localhost:8080/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    imageUrl: imagePath, // se envía la ruta
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al crear categoría");
            }
            setShowSuccessModal(true); //Aca se muestra el modal que reemplaza el alert de Categoría creada correctamente
            //alert("Categoría creada correctamente");
            //navigate("/administración");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <>
            <section className="section-title">
                <h1 className="page-title">Agregar nueva categoría</h1>
                <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
            </section>

            <form onSubmit={handleSubmit}>
                {/* Agregar icono y nombre de la categoría */}
                <div className="category-form-info-section">
                    {/* <div className="form-title">
                            <h1>Información básica de la categoría</h1>
                        </div> */}

                    <div className="form-info">
                        {/* Nombre categoría */}
                        <div className="new-product-info">
                            <label htmlFor="category-name">Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                id="category-name"
                                placeholder="Nombre de la categoría"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Descripción categoría */}
                    <div className="new-product-info">
                        <label htmlFor="category-description">Descripción:</label>
                        <textarea
                            name="description"
                            id="category-description"
                            placeholder="Descripción de la categoría"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>

                    {/* Imagen categoría */}
                    <div className="form-info">
                        <label htmlFor="category-image">
                            <div className="upload-picture">
                                <span><i className="ri-upload-cloud-2-line"></i></span>
                                <div className="upload-picture-info">
                                    <p>Click aquí para subir una imagen</p>
                                    {/* <p>(SVG, JPG, o PNG)</p> */}
                                </div>
                            </div>
                        </label>

                        {/* Input para las imágenes */}
                        <input
                            type="file"
                            name="imageFile"
                            id="category-image"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        {/*  {formData.imageFile && (
                                <p style={{ marginTop: "10px" }}>
                                    Imagen seleccionada: <strong>{formData.imageFile.name}</strong>
                                </p>
                            )} */}
                    </div>
                </div>
            </form>
            <div className="new-product-buttons">
                <Link to="/administración" className="nav-link secondary-button">Cancelar</Link>
                {/* <input type="button" value="Cancelar" className="secondary-button"></input> */}
                <input type="submit" value="Agregar categoría" className="primary-button" />
            </div>

            {showSuccessModal && (
                <SuccessModal
                    message="La categoría se ha creado correctamente."
                    onClose={() => {
                        setShowSuccessModal(false);
                        navigate("/administración");
                    }}
                />
            )}
        </>
    )
}
