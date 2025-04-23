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

        <div className="product-detail">
          {/* Fotos del producto */}
          <div className="product-detail-img">
            <ProductGallery images={product.images} />
          </div>

          {/* Detalle del producto */}
          <div className="product-detail-info">
            <div className="product-detail-description">
            <p className="product-detail-description-title">Descripción</p>
              {/* Usamos la función formatDescription para convertir \n en <br /> */}
              <div>{formatDescription(product.description)}</div>
              {/* <p>{product.description}</p> */}
            </div>

            <div className="product-detail-price">
              <p>${product.price}</p>
            </div>

            <div className="product-detail-code">
              <p>Código</p>
              <p>{product.code}</p>
            </div>

            <div className="product-detail-category">
              <p>Categoría</p>
              <p>{product.category}</p>
            </div>

            <div className="product-detail-size">
              <p>Talle</p>
              <p>{product.size}</p>
            </div>

            <div className="product-detail-status">
              <p>Ver disponibilidad</p>
              <span><i className="ri-arrow-down-s-line"></i></span>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
