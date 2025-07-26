import { Link, useNavigate } from "react-router-dom";
import { AdminNavBar } from "../components/AdminNavBar";
import { useState } from "react";
import { SuccessModal } from "../components/SuccessModal";
// import { useNavigate } from "react-router-dom";



export const AddHighlightPage = () => {

    const [highlightData, setHighlightData] = useState({
        name: "",
        image: null,
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!highlightData.name || !highlightData.image) {
            alert("Debes agregar un nombre e imagen");
            return;
        }

        const imagePath = `/assets/img/${highlightData.image.name}`;

        const newHighlight = {
            name: highlightData.name,
            iconUrl: imagePath,
        };

        try {
            const response = await fetch("http://localhost:8080/caracteristicas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newHighlight),
            });

            if (response.ok) {
                setShowSuccessModal(true);
                // alert("Característica agregada con éxito");
            } else {
                alert("Error al agregar la característica");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al guardar la característica");
        }
    };


    return (
        <>
            <AdminNavBar />
            <main className="mainAdmin">
                <section className="section-title">
                    <h1 className="page-title">Agregar nueva característica</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                </section>

                <form onSubmit={handleSubmit}>
                    {/* Agregar icono y nombre de la característica */}
                    <div className="form-info-section">
                        <div className="form-title">
                            <h1>Información básica de la característica</h1>
                        </div>

                        <div className="form-info">
                            {/* Nombre producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-name">Nombre:</label>

                                <input
                                    type="text"
                                    name="name"
                                    id="product-name"
                                    placeholder="Nombre de la característica"
                                    value={highlightData.name}
                                    onChange={(e) => setHighlightData({ ...highlightData, name: e.target.value })}
                                />
                            </div>


                            <div className="form-info">
                                <label htmlFor="product-image">
                                    <div className="upload-picture">
                                        <span><i className="ri-upload-cloud-2-line"></i></span>
                                        <div className="upload-picture-info">
                                            <p>Click aquí para subir el ícono</p>
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
                                    style={{ display: 'none' }}
                                    onChange={(e) => setHighlightData({ ...highlightData, image: e.target.files[0] })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="new-product-buttons">
                        <Link to="/administración" className="nav-link secondary-button">Cancelar</Link>
                        {/* <input type="button" value="Cancelar" className="secondary-button"></input> */}
                        <input type="submit" value="Agregar característica" className="primary-button" />
                    </div>
                </form>
            </main>
            {showSuccessModal && (
                <SuccessModal
                    message="La característica se ha creado correctamente."
                    onClose={() => {
                        setShowSuccessModal(false);
                        navigate("/administración");
                    }}
                />
            )}

        </>

    )
}
