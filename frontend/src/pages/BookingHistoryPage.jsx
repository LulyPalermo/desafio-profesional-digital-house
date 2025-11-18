import { useEffect, useState } from "react";
import { NavBarComponent } from "../components/navBarComponent";
import { useUser } from "../Context/UserContext";
import { getProducts, getReservationsByUser } from "../services/productService";
import { FooterComponent } from "../components/FooterComponent";

export const BookingHistoryPage = () => {
    const { user } = useUser();
    const [reservations, setReservations] = useState([]);
    const [productsMap, setProductsMap] = useState({});

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const reservationsData = await getReservationsByUser(user.id);
                const products = await getProducts();
                const map = {};
                products.forEach(p => { map[p.id] = p.name });
                setProductsMap(map);

                const sorted = reservationsData.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                setReservations(sorted);
            } catch (error) {
                console.error("Error cargando reservas:", error);
            }
        };

        fetchData();
    }, [user]);

    return (
        <>
            <div className="app-container">
                <NavBarComponent />

                <main className="main-booking main-content">
                    <section className="booking-header">
                        <h1>Historial de reservas</h1>
                        <p>Tienes {reservations.length} {reservations.length === 1 ? "reserva" : "reservas"} pasadas</p>

                    </section>

                    <section className="booking-history-list">
                        {reservations.length === 0 ? (
                            <p>No tienes reservas aún.</p>
                        ) : (
                            reservations.map(res => (
                                <div key={res.id} className="booking-history-item">
                                    <p className="booking-history-subtitle">{productsMap[res.product?.id]}</p>
                                    <p className="booking-history-info"><span>Fecha de recogida: </span>{new Date(res.startDate).toLocaleDateString("es-ES")}</p>
                                    <p className="booking-history-info"><span>Fecha de entrega: </span>{new Date(res.endDate).toLocaleDateString("es-ES")}</p>
                                    {res.phone && <p className="booking-history-info"><span>Teléfono asociado a la reserva: </span>{res.phone}</p>}
                                    {/* {res.note && <p><span>Nota: </span>{res.note}</p>} */}
                                </div>
                            ))
                        )}
                    </section>
                </main>

                <FooterComponent />
            </div>
        </>
    );
};
