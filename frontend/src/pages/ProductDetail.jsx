import { useEffect, useState } from "react";
import { ProductGallery } from "../components/ProductGallery";
import { Link, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { getProductById, getReservationsByProductId } from "../services/productService";
import { eachDayOfInterval, parseISO } from "date-fns"; // para convertir rangos en días individuales
import { PoliciesBlock } from "../components/PoliciesBlock";
import { ReviewsBlock } from "../components/ReviewsBlock";
import { RiShare2Line } from "react-icons/ri";
import { ShareProductModal } from "../components/ShareProductModal";
import { LoginModal } from "../components/LoginModal";
import { useUser } from "../Context/UserContext";
import { WhatsappButton } from "../components/WhatsappButton";


export const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ]);
  const [reservations, setReservations] = useState([]); // Se guardan reservas desde backend
  const [disabledDates, setDisabledDates] = useState([]); // Fechas bloqueadas
  const [error, setError] = useState(null); // estado para el error
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);


  // Carga de producto y reservas
  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    if (!storedProduct) return;

    const parsedProduct = JSON.parse(storedProduct);
    setProduct(parsedProduct);

    const fetchReservations = async () => {
      try {
        setLoading(true);   // empieza a cargar
        setError(null);     // resetea el error
        const data = await getReservationsByProductId(parsedProduct.id);
        setReservations(data);
      } catch (err) {
        console.error("Error al cargar las reservas", err);
        setError("Hubo un problema al cargar la información de reservas. Por favor inténtalo nuevamente más tarde.");
      } finally {
        setLoading(false);  // termina de cargar
      }
    };

    fetchReservations();
  }, []);


  // Función para convertir los saltos de línea (\n) en <br />
  const formatDescription = (description) => {
    return description.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  // Función para convertir reservas en días individuales para el calendario
  useEffect(() => {
    if (reservations.length > 0) {
      const allDisabled = reservations.flatMap(res =>
        eachDayOfInterval({
          start: parseISO(res.startDate),
          end: parseISO(res.endDate)
        })
      );
      setDisabledDates(allDisabled);
    }
  }, [reservations]);


  if (!product) {
    return <p>No hay información del producto</p>;
  }

  //Modal para compartir producto
  const openShareModal = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  // Función para validar que no se incluyan fechas bloqueadas
  const isRangeValid = () => {
    const { startDate, endDate } = dateRange[0];
    const selectedDays = eachDayOfInterval({ start: startDate, end: endDate });
    return selectedDays.every(day => !disabledDates.some(disabled => disabled.getTime() === day.getTime()));
  };

  // Función para manejar el botón de reserva
  const handleReserveClick = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!isRangeValid()) {
      alert("El rango seleccionado incluye fechas no disponibles. Por favor selecciona otro rango.");
      return;
    }

    try {
      // Se obtiene el producto completo desde el backend
      const fullProduct = await getProductById(product.id);

      // Se guarda el producto en localStorage
      localStorage.setItem("selectedProduct", JSON.stringify(fullProduct));
      localStorage.setItem("selectedDates", JSON.stringify(dateRange[0]));

      // Redirige a la página de reserva
      navigate(`/reservas/${product.id}`);
    } catch (error) {
      console.error("Error al cargar el producto completo:", error);
      alert("No se pudo cargar el detalle completo del producto.");
    }
  };


  // Función para mostrar el rango de fecha que se esta seleccionando
  const getSelectedDateText = () => {
    const { startDate, endDate } = dateRange[0];
    if (!startDate || !endDate) return "";

    const options = { day: "numeric", month: "long" };
    const startText = startDate.toLocaleDateString("es-ES", options);
    const endText = endDate.toLocaleDateString("es-ES", options);

    return startText === endText
      ? `Reservar este producto para el día ${startText}`
      : `Reservar este producto del ${startText} al ${endText}`;
  };

  // Función para definir días ocupados
  const renderDay = (day) => {
    const isPast = day < new Date();
    const isOccupied = disabledDates.some(d => d.getTime() === day.getTime());

    let className = "calendar-day";
    if (isOccupied) className += " occupied";
    else if (isPast) className += " past";

    return <div className={className}>{day.getDate()}</div>;
  };


  return (
    <>
      <div className="app-container">
        <div className="mainDetailProduct">
          <section className="detailHeader">
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="header-links">
              <button className="nav-link secondary-button share-button" onClick={openShareModal}><span className="share-icon"><RiShare2Line /></span>Compartir</button>
              <Link to="/" className="nav-link secondary-button">Volver</Link>
            </div>
          </section>

          <div className="product-detail-container">
            {/* Fotos del producto */}
            <div className="product-detail-img">
              {/* <ProductGallery images={product.images.slice(0, 5)} /> */}
              <ProductGallery
                images={product.images.slice(0, 5)}      // solo 5 para mostrar en el detalle
                allImages={product.images}               // todas para la galería
              />

            </div>

            {/* Detalle del producto: Descripción, precio, código, categoría, talle */}
            <div className="product-detail">
              <div className="product-detail-description">
                <p className="product-detail-description-title">Descripción</p>
                {/* Se usa función formatDescription para convertir \n en <br /> */}
                <div>{formatDescription(product.description)}</div>
              </div>

              <div className="product-detail-list">
                <div className="product-detail-price">
                  <p>Precio:</p>
                  <p>${product.price}</p>
                </div>

                <div className="product-detail-code">
                  <p>Código</p>
                  <p>{product.code}</p>
                </div>

                <div className="product-detail-category">
                  <p>Categoría</p>
                  <p>{product.category?.name || "Sin categoría"}</p>  {/* si product.category no existe aún, no se rompe, sino que simplemente no muestra nada. */}

                </div>

                <div className="product-detail-size">
                  <p>Talle</p>
                  <p>{product.size}</p>
                </div>
              </div>

              {/* Característsicas del producto */}
              <div className="product-highlights">
                <h2 className="product-highlights-subtitle">Características</h2>

                <div className="product-highlights-items">
                  {product.caracteristicas && product.caracteristicas.length > 0 ? (
                    product.caracteristicas.map((caract) => (
                      <div className="product-highlight-detail" key={caract.id}>
                        <img src={caract.iconUrl} alt={caract.name} className="highlights-img" />
                        <p>{caract.name}</p>
                      </div>
                    ))
                  ) : (
                    <p>No hay características para este producto</p>
                  )}
                </div>
              </div>

              {/* Calendario con disponibilidad */}
              <section className="product-availability">
                <h2 className="product-availability-subtitle">Disponibilidad</h2>

                {loading && <p>Cargando disponibilidad...</p>}

                {error && (
                  <div className="availability-error">
                    <p>{error}</p>
                    <button className="secondary-button"
                      onClick={() => {
                        setError(null);
                        setLoading(true);
                        getReservationsByProductId(product.id)
                          .then((data) => setReservations(data))
                          .catch((err) => {
                            console.error(err);
                            setError();
                          })
                          .finally(() => setLoading(false));
                      }}>Reintentar</button>
                  </div>
                )}

                {!error && !loading && (
                  <div className="calendar-container">
                    <DateRange
                      ranges={dateRange}
                      onChange={(item) => setDateRange([item.selection])}
                      editableDateInputs={false}
                      moveRangeOnFirstSelection={false}
                      locale={es}
                      months={2}
                      direction="horizontal"
                      disabledDates={disabledDates}
                      minDate={new Date()}
                      dayContentRenderer={renderDay}
                    />
                  </div>
                )}
                <div className="product-availability-button">
                  <p className="selected-date-text">{getSelectedDateText()}</p>
                  <button className="primary-button" onClick={handleReserveClick}>Reservar este producto</button>
                </div>
              </section>

              {/* Bloque de políticas */}
              <PoliciesBlock />

              {/* Bloque de Reviews */}
              <ReviewsBlock product={product} />

            </div>
          </div>
        </div>

        {/* Botón Whatsapp */}
        <WhatsappButton />

        {/* Modal compartir producto*/}
        <ShareProductModal isOpen={showShareModal} onClose={closeShareModal} product={product} />
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} isMandatory={true} />
      </div>
    </>
  );
}
