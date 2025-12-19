import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const BookingConfirmationPage = () => {
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        const storedReservation = localStorage.getItem("pendingReservation");
        if (storedReservation) {
            setReservation(JSON.parse(storedReservation));
            localStorage.removeItem("pendingReservation");
        }
    }, []);

    return (
        <>
            <div className="app-container">

                <div className="main-booking">
                    <section className="booking-header">
                        <h1>¡Reserva confirmada con éxito!</h1>
                        <Link to="/" className="secondary-button">Volver al inicio</Link>
                    </section>

                    <section className="booking-succes">
                        {reservation ? (
                            <>
                                <p className="booking-succes-subtitle">Detalle de la reserva:</p>
                                <p className="booking-succes-info"><span>Producto: </span>{reservation.product.name}</p>
                                <p className="booking-succes-info"><span>Código: </span>{reservation.product.code}</p>
                                <p className="booking-succes-info">
                                    <span>Fecha de retiro: </span>
                                    {reservation.startDate.split("-").reverse().join("/")}
                                </p>

                                <p className="booking-succes-info">
                                    <span>Fecha de devolución: </span>
                                    {reservation.endDate.split("-").reverse().join("/")}
                                </p>
                                <p className="booking-succes-info">
                                    <span>Teléfono de contacto: </span>
                                    {reservation.phone ? reservation.phone : "(No hay teléfono de contacto)"}
                                </p>
                                <p className="booking-succes-info">
                                    <span>Nota: </span>
                                    {reservation.note ? reservation.note : "(Sin notas adicionales)"}
                                </p>
                            </>
                        ) : (
                            <p>No hay información de reserva disponible.</p>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};
