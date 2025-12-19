import { Link, useNavigate } from "react-router-dom";
import { GoPlusCircle } from "react-icons/go";
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useUser } from "../Context/UserContext";
import { createReservation } from "../services/productService";



export const BookingPage = () => {
    const [product, setProduct] = useState(null);
    const [isProductAccordionOpen, setIsProductAccordionOpen] = useState(false);
    const [isUserAccordionOpen, setIsUserAccordionOpen] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();
    const [reservationError, setReservationError] = useState(null);

    const [extraData, setExtraData] = useState({
        phone: "",
        note: ""
    });

    useEffect(() => {
        const storedProduct = localStorage.getItem("selectedProduct");
        if (storedProduct) {
            const parsedProduct = JSON.parse(storedProduct);
            setProduct(parsedProduct);
        }
    }, []);

    const [selectedDates] = useState(() => {
        const storedDates = localStorage.getItem("selectedDates");
        return storedDates ? JSON.parse(storedDates) : null;
    });

    // Función para confirmar la reserva
    const handleConfirmReservation = async () => {
        setReservationError(null); // se limpian errores anteriores

        if (!product || !user || !selectedDates) {
            setReservationError("Faltan datos para realizar la reserva.");
            return;
        }

        // el objeto que se envía al backend
        const reservation = {
            product: { id: product.id },
            user: { id: user.id },
            startDate: selectedDates.startDate,
            endDate: selectedDates.endDate,
            phone: extraData.phone,
            note: extraData.note,
        };

        try {
            const savedReservation = await createReservation(reservation);

            const storedReservation = {
                ...savedReservation,
                product: product,
            };

            // se guarda la reserva para mostrarla en la confirmación
            localStorage.setItem("pendingReservation", JSON.stringify(storedReservation));

            // Redirige a la página de confirmación
            navigate("/confirmation");
        } catch (error) {
            console.error("Error al confirmar la reserva:", error);
            setReservationError(
                error.message || "Ocurrió un error al confirmar la reserva. Intenta nuevamente."
            );
        }
    };

    // Función para validar teléfono
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Permite solo dígitos, espacios y el signo +
        if (/^[0-9+\s]*$/.test(value)) {
            setExtraData((prev) => ({ ...prev, phone: value }));
        }
    };


    return (
        <>
            <div className="app-container">

                <div className="main-booking">
                    <section className="booking-header">
                        <h1>Reserva: {product?.name || "Cargando..."}</h1>
                        <Link to="/" className="secondary-button">Salir</Link>
                    </section>

                    <section className="booking-detail">
                        <div className="booking-image">
                            {product?.images?.length > 0 ? (
                                product.images.map((img, index) => (
                                    <img key={index} src={img.imageUrl} alt={product.name} />
                                ))
                            ) : (
                                <p>No hay imágenes disponibles</p>
                            )}
                        </div>

                        {/* Fechas seleccionadas */}
                        <div className="booking-date">
                            <div className="booking-date-start">
                                <p>Retira</p>
                                <p>
                                    {selectedDates?.startDate
                                        ? new Date(selectedDates.startDate).toLocaleDateString("es-ES", { day: 'numeric', month: 'long' })
                                        : ""}
                                </p>
                            </div>
                            <div className="booking-date-end">
                                <p>Devuelve</p>
                                <p>
                                    {selectedDates?.endDate
                                        ? new Date(selectedDates.endDate).toLocaleDateString("es-ES", { day: 'numeric', month: 'long' })
                                        : ""}
                                </p>
                            </div>
                        </div>

                        {/* Detalle del producto */}
                        <div className="booking-product-detail">
                            <button onClick={() => setIsProductAccordionOpen(prev => !prev)}>
                                Detalle del producto
                                <span>{isProductAccordionOpen ? <AiOutlineMinusCircle /> : <GoPlusCircle />}</span>
                            </button>

                            <div className={`booking-accordion-panel ${isProductAccordionOpen ? "open" : ""}`}>                            <div className="accordion-panel-top">
                                <p>Precio: ${product?.price}</p>
                                <p>Código: {product?.code}</p>
                                <p>Talle: {product?.size}</p>
                            </div>

                                <div className="accordion-panel-center">
                                    <p>Descripción: {product?.description}</p>
                                </div>

                                <div className="accordion-panel-bottom">
                                    {product?.caracteristicas?.length > 0 ? (
                                        product.caracteristicas.map((h) => (
                                            <div key={h.id}>
                                                <img src={h.iconUrl} alt={h.name} />
                                                <p>{h.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>El producto no tiene características</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quien hace la reserva */}
                        <div className="booking-product-detail">
                            <button onClick={() => setIsUserAccordionOpen(prev => !prev)}>
                                Quién reserva
                                <span>{isUserAccordionOpen ? <AiOutlineMinusCircle /> : <GoPlusCircle />}</span>
                            </button>
                            <div className={`booking-accordion-panel ${isUserAccordionOpen ? "open" : ""}`}>
                                <div className="accordion-panel-user">
                                    <p><span>Nombre: </span>{user?.nombre || "Sin nombre"} {user?.apellido || "Sin apellido"}</p>
                                    <p><span>Correo: </span>{user?.email || "Sin correo"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Datos adicionales */}
                        <div className="booking-extra-data">
                            <h4>Datos adicionales (opcional)</h4>
                            <div className="booking-extra-data">
                                <div className="extra-data-info">
                                    <label>Teléfono:</label>
                                    <input type="text"
                                        value={extraData.phone}
                                        onChange={handlePhoneChange}
                                        placeholder="Ej: 099 123 456" />
                                </div>
                                <div className="extra-data-info">
                                    <label>Nota o comentario:</label>
                                    <textarea value={extraData.note}
                                        onChange={(e) => setExtraData({ ...extraData, note: e.target.value })}
                                        placeholder="Ej: Retiro por la tarde, o agrega algún detalle que consideres importante..." />
                                </div>
                            </div>
                        </div>

                        {/* Ubicación de la tienda */}
                        <div className="booking-location">
                            <h4>Ubicación de la tienda:</h4>
                            <p>Gregorio Suárez 2244 | Montevideo, Uruguay</p>
                        </div>

                        <div className="confirm-booking">
                            <button className="primary-button" onClick={handleConfirmReservation}>Confirmar reserva</button>
                            {reservationError && (
                                <p className="booking-error">{reservationError}</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
