import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { getCaracteristicas } from "../services/productService";
import { deleteCaracteristica } from "../services/productService";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";
import { SuccessModal } from "../components/SuccessModal";
import { UserContext } from "../Context/UserContext";

export const ProductHighlights = () => {

    const { user } = useContext(UserContext); // Usuario logueado

    const [caracteristicas, setCaracteristicas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [caracteristicaAEliminar, setCaracteristicaAEliminar] = useState(null);
    const [showPermissionModal, setShowPermissionModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Se cargan las características
    useEffect(() => {
        const fetchCaracteristicas = async () => {
            try {
                const caract = await getCaracteristicas();
                setCaracteristicas(caract);
            } catch (error) {
                console.error("Error cargando categorías", error);
            }
        };
        fetchCaracteristicas();
    }, [location]);

    // Función para manejar click en editar
    const handleEditClick = (caract) => {
        if (user?.editarCaracteristica || user?.isAdmin) {
            navigate(`/administración/editHighlight/${caract.id}`);
        } else {
            setShowPermissionModal(true);
        }
    };

    // Función para manejar click en eliminar
    const handleDeleteClick = (caract) => {
        if (user?.eliminarCaracteristica || user?.isAdmin) {
            setCaracteristicaAEliminar(caract);
            setShowModal(true);
        } else {
            setShowPermissionModal(true);
        }
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        try {
            await deleteCaracteristica(caracteristicaAEliminar.id);
            setCaracteristicas(prev => prev.filter(c => c.id !== caracteristicaAEliminar.id));
            setShowModal(false);
            setCaracteristicaAEliminar(null);
        } catch (error) {
            console.error("Error al eliminar la característica:", error);
        }
    };

    // Función para cerrar modal sin eliminar
    const handleCloseModal = () => {
        setShowModal(false);
        setCaracteristicaAEliminar(null);
    };

    // Función para manejar click en "Añadir nueva" con control de permisos
    const handleAddNew = () => {
        if (user?.agregarCaracteristica || user?.isAdmin) {
            navigate("/administración/addHighlights");
        } else {
            setShowPermissionModal(true);
        }
    };


    return (
        <>
            <section className="section-title">
                <h1 className="page-title">Características</h1>
                <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
            </section>

            <section className="highlights-section-table">
                <div className="highlights-table-header">
                    <p className="header-row-cell highlight-id-cell">ID</p>
                    <p className="header-row-cell highlight-icon-cell">ICONO</p>
                    <p className="header-row-cell highlight-name-cell">CARACTERÍSTICA</p>
                    <p className="header-row-cell highlight-accions-cell">ACCIONES</p>
                </div>

                {caracteristicas.map((caract) => (
                    <div className="highlights-table-info" key={caract.id}>
                        <p className="header-row-cell highlight-id-cell">{caract.id}</p>
                        <div className="header-row-cell highlight-icon-cell">
                            {/* <img src={caract.iconUrl} alt={caract.name} className="highlight-img" /> */}
                            <img src={`${caract.iconUrl}?t=${new Date().getTime()}`} alt={caract.name} className="highlight-img" />

                        </div>
                        <p className="header-row-cell highlight-name-cell">{caract.name}</p>
                        <div className="header-row-cell highlight-accions-cell">
                            <div id="edit-highlight" onClick={() => handleEditClick(caract)}>
                                <span className="accions"><i className="ri-pencil-fill"></i></span>
                            </div>
                            <div id="delete-highlight" onClick={() => handleDeleteClick(caract)}>
                                <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                            </div>
                            {/*  <div id="edit-highlight" onClick={() => navigate(`/editHighlight/${caract.id}`)}>
                                    <span className="accions"><i className="ri-pencil-fill"></i></span>
                                </div> */}
                            {/* <div id="delete-highlight" onClick={() => handleDeleteClick(caract)}>
                                    <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                                </div> */}
                        </div>
                    </div>
                ))}
            </section>

            <div className="new-highlights-buttons">
                <button className="primary-button" onClick={handleAddNew}>Añadir nueva</button>
            </div>

            {/* Modal de confirmación de eliminación */}
            {showModal && (
                <ConfirmDeleteModal
                    message="¿Estás segura/o de que querés eliminar esta característica?"
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                />
            )}

            {/* Modal de permisos insuficientes */}
            {showPermissionModal && (
                <SuccessModal
                    message="No tienes permisos para realizar esta acción"
                    onClose={handleCloseModal}
                />
            )}

            {showPermissionModal && (
                <SuccessModal
                    message="No tienes permisos para realizar esta acción"
                    onClose={() => setShowPermissionModal(false)}
                />
            )}
        </>
    )
}
