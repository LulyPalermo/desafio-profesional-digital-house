import { Link } from "react-router-dom"
import { AdminNavBar } from "../components/AdminNavBar"
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";


export const AdminProducts = () => {

    const [products, setProducts] = useState([]);


    const showAllProducts = async () => {
        const allProducts = await getProducts();
        setProducts(allProducts);
    }
    useEffect(
        () => {
            showAllProducts();
        }, []);


    return (

        <>
            <AdminNavBar />
            <main className="mainAdmin">
                <section className="section-title">
                    <h1 className="page-title">Productos</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>

                </section>

                {/* <Link to='/addProduct'>
                    <button className="primary-button">Nuevo producto</button>
                </Link> */}

                <section className="section-table">
                    <div className="table-header">
                        <p className="header-row-cell id-cell">ID</p>
                        <p className="header-row-cell img-cell">IMÁGEN</p>
                        <p className="header-row-cell name-cell">NOMBRE</p>
                        <p className="header-row-cell category-cell">CATEGORÍA</p>
                        <p className="header-row-cell size-cell">TALLE</p>
                        <p className="header-row-cell code-cell">CÓDIGO</p>
                        <p className="header-row-cell price-cell">PRECIO</p>
                        <p className="header-row-cell status-cell">DISPONIBILIDAD</p>
                        <p className="header-row-cell accions-cell">ACCIONES</p>
                    </div>

                    {products.map(product => (
                        <div className="table-info" key={product.id}>
                            <p className="header-row-cell id-cell">{product.id}</p>

                            {console.log("Imagen URL:", product.images[0])}
                            <img
                                src={product.images[0].imageUrl}
                                // src={product.images[0]}
                                alt="imagen del producto"
                                className="header-row-cell img-cell"
                            />

                            {/* <img src={product.images[0]} alt="imagen del producto" className="header-row-cell img-cell" /> */}
                            <p className="header-row-cell name-cell">{product.name}</p>
                            <p className="header-row-cell category-cell">{product.category}</p>
                            <p className="header-row-cell size-cell">{product.size}</p>
                            <p className="header-row-cell code-cell">{product.code}</p>
                            <p className="header-row-cell price-cell">{product.price}</p>
                            {/* <p className="header-row-cell status-cell available-label">{product.status}</p> */}
                            <p className={`header-row-cell status-cell ${product.status === "Disponible" ? "available-label" : "unavailable-label"}`}>
                                {product.status} </p>
                            <div className="header-row-cell accions-cell">
                                <div id="edit-product" >
                                    <span className="accions"><i className="ri-pencil-fill"></i></span>
                                </div>
                                <div id="delete-product">
                                    <span className="accions"><i className="ri-delete-bin-fill"></i></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
          
        </>
    )
}