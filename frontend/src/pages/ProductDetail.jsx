import { useEffect, useState } from "react";
import { NavBarComponent } from "../components/navBarComponent"
import { ProductGallery } from "../components/ProductGallery";
import { Link } from "react-router-dom";

export const ProductDetail = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Intentamos obtener el producto desde localStorage
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
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

  if (!product) {
    return <p>No hay información del producto</p>;
  }

  return (
    <>
      <NavBarComponent />
      <main className="mainDetailProduct">
        <section className="detailHeader">
          <h1 className="product-detail-title">{product.name}</h1>
          <Link to="/" className="nav-link secondary-button">Volver</Link>
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

            {/*  <div className="product-detail-price">
              <p>${product.price}</p>
            </div> */}

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
              {/* <h1>Características</h1> */}
              <h2 className="product-highlights-subtitle">Características</h2>
              <div className="product-highlights-items">
                <div className="product-highlight-detail">
                  <img src="/assets/img/prodHigh-size.png" alt="" className="highlights-img" />
                  <p>Talle M</p>
                </div>

                <div className="product-highlight-detail">
                <img src="/assets/img/prodHigh-fabric.png" alt="" className="highlights-img" />
                <p>Tela de lino</p>
                </div>

                <div className="product-highlight-detail">
                <img src="/assets/img/prodHigh-fit.png" alt="" className="highlights-img" />
                <p>Largo de la prenda: Corto</p>
                </div>

                <div className="product-highlight-detail">
                <img src="/assets/img/prodHigh-print.png" alt="" className="highlights-img" />
                <p>Tela con lentejuelas</p>
                </div>
              </div>
            </div>
            </div>
          </div>
      </main>

    </>
  );
}
