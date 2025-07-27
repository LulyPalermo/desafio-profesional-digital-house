import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminNavBar } from "../components/AdminNavBar";
import { useEffect, useState } from "react";
import { getCaracteristicaById, updateCaracteristica } from "../services/productService";
import { SuccessModal } from "../components/SuccessModal";


export const EditHighlightPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [caracteristica, setCaracteristica] = useState({
        name: "",
        iconUrl: ""
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false); // Para mostrar el modal de exito

    useEffect(() => {
        const fetchCaracteristica = async () => {
            try {
                const data = await getCaracteristicaById(id);
                setCaracteristica({
                    name: data.name,
                    iconUrl: data.iconUrl || ""
                });
            } catch (error) {
                console.error("Error al obtener característica", error);
            }
        };
        fetchCaracteristica();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCaracteristica({ ...caracteristica, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        // const file = e.target.files[0];
        // console.log('Archivo seleccionado:', file.name);
        // setSelectedFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let iconUrl = caracteristica.iconUrl;

        // Si se seleccionó una nueva imagen, se simula una subida
        if (selectedFile) {
            // console.log('Selected file:', selectedFile.name);
            iconUrl = `/assets/img/${selectedFile.name}`;
        }

        // console.log('Icon URL que se enviará:', iconUrl);

        try {
            await updateCaracteristica(id, {
                name: caracteristica.name,
                iconUrl: iconUrl
            });
            setShowSuccessModal(true); // Se muestra el modal al actualizar con éxito

        } catch (error) {
            console.error("Error al actualizar característica", error);
            alert("Ocurrió un error al editar la característica.");
        }
    };
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate("/administración"); // Se redirige al dashboard al cerrar el modal
    };

    return (
        <>
            <AdminNavBar />
            <main className="mainAdmin">
                <section className="section-title">
                    <h1 className="page-title">Editar característica</h1>
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
                                    value={caracteristica.name}
                                    onChange={handleInputChange}
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
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="new-product-buttons">
                        <Link to="/administración" className="nav-link secondary-button">Cancelar</Link>
                        {/* <input type="button" value="Cancelar" className="secondary-button"></input> */}
                        <input type="submit" value="Editar característica" className="primary-button" />
                    </div>
                </form>
            </main>
            {showSuccessModal && (
                <SuccessModal
                    message="Característica actualizada con éxito"
                    onClose={handleCloseModal}
                />
            )}
        </>

    )
}
