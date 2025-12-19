import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context/Context";

export const FavoritesPage = () => {

    const { userFavorites, toggleFavorite } = useUser();
    const { setDetail } = useContext(Context);

    const showProductDetail = (product) => {
        setDetail([product]);
        localStorage.setItem("selectedProduct", JSON.stringify(product));
    };

    return (
        <>
            <div className="app-container">

                <div className="mainFavorites">
                    <section className="favorites-section-top">
                        <h1>Tus favoritos</h1>
                        <p>Mostrando {userFavorites.length} {userFavorites.length === 1 ? "producto" : "productos"}</p>
                    </section>

                    <ul id="products-grid">
                        {userFavorites.map((product) => (
                            <li key={product.id} className="product-description">
                                <button className="like-button" onClick={() => toggleFavorite(product)}>
                                    {userFavorites.some((p) => p.id === product.id) ? <IoMdHeart /> : <IoMdHeartEmpty />}
                                </button>
                                <img
                                    src={product.images?.[0]?.imageUrl || "URL_DE_IMAGEN_POR_DEFECTO"}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price">$ {product.price}</p>
                                </div>
                                <Link to="/detail">
                                    <button className="primary-button" onClick={() => showProductDetail(product)}>Ver producto</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
