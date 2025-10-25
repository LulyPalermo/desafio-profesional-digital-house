import { useEffect, useState } from "react";
import { NavBarComponent } from "../components/navBarComponent"
import { ProductGallery } from "../components/ProductGallery";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { getReservationsByProductId } from "../services/productService";
import { eachDayOfInterval, parseISO } from "date-fns"; // para convertir rangos en días individuales
import { PoliciesBlock } from "../components/PoliciesBlock";
import { ReviewsBlock } from "../components/ReviewsBlock";
import { RiShare2Line } from "react-icons/ri";
import { ShareProductModal } from "../components/ShareProductModal";


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

  return (
    <>
      <NavBarComponent />
      <main className="mainDetailProduct">
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
            <ProductGallery images={product.images} />
          </div>

          {/* Detalle del producto: Descripción, precio, código, categoría, talle */}
          <div className="product-detail">
            <div className="product-detail-description">
              <p className="product-detail-description-title">Descripción</p>
              {/* Usamos la función formatDescription para convertir \n en <br /> */}
              <div>{formatDescription(product.description)}</div>
              {/* <p>{product.description}</p> */}
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
                {/* <p>{product.category}</p> */}
                <p>{product.category?.name || "Sin categoría"}</p>  {/* si product.category no existe aún, no se rompe, sino que simplemente no muestra nada. */}

              </div>

              <div className="product-detail-size">
                <p>Talle</p>
                <p>{product.size}</p>
              </div>
              {/* <div className="product-detail-status">
              <p>Ver disponibilidad</p>
              <span><i className="ri-arrow-down-s-line"></i></span>
            </div> */}
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
                <DateRange
                  ranges={dateRange}
                  onChange={(item) => setDateRange([item.selection])}
                  editableDateInputs={false}
                  moveRangeOnFirstSelection={false}
                  locale={es}
                  months={2}
                  direction="horizontal"
                  disabledDates={disabledDates}
                />
              )}
            </section>

            {/* Bloque de políticas */}
            <PoliciesBlock />

            {/* Bloque de Reviews */}
            <ReviewsBlock product={product} />

          </div>
        </div>
      </main>

      {/* Modal compartir producto*/}
      <ShareProductModal isOpen={showShareModal} onClose={closeShareModal} product={product} />

    </>
  );
}
