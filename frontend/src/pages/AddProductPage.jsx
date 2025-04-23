import { Link } from "react-router-dom";
import { AdminNavBar } from "../components/AdminNavBar";

export const AddProductPage = () => {

    return (

        <>
            <AdminNavBar />
            <main className="mainAdmin">
                <section className="section-title">
                    <h1 className="page-title">Agregar nuevo producto</h1>
                    <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                </section>

                <form>
                    {/* Sección nombre, detalle y precio producto */}
                    <div className="form-info-section">
                        <div className="form-title">
                            <h1>Información básica del producto</h1>
                        </div>

                        <div className="form-info">
                            {/* Nombre producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-name">Nombre del producto:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="product-name"
                                    placeholder="Nombre"
                                />
                            </div>

                            {/* Descripción producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-detail">Descripción:</label>
                                <textarea
                                    name="description"
                                    id="product-detail"
                                    placeholder="Aquí va la descripción" />
                            </div>

                            {/* Precio producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-price">Precio del producto:</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="product-price"/>
                            </div>

                            {/* Talle producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-size">Talle producto:</label>
                                <select
                                    name="size"
                                    id="product-size" >
                                    <option value="">Elegir una opción</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                                <i className="ri-arrow-down-s-line chevron-select"></i>
                            </div>
                        </div>
                    </div>

                    {/* Sección carga de fotos*/}
                    <div className="form-info-section">
                        <div className="form-title">
                            <h1>Imágenes</h1>
                            <p>Para mantener el orden nombra a tus imagenes seguidas de un número. Ejemplo: <br/>nombre1.png <br />nombre.png</p>
                        </div>

                        <div className="form-info">
                            <label htmlFor="product-image">
                                <div className="upload-picture">
                                    <span><i className="ri-upload-cloud-2-line"></i></span>
                                    <div className="upload-picture-info">
                                        <p>Click aquí para subir tus fotos</p>
                                        {/* <p>(SVG, JPG, o PNG)</p> */}
                                    </div>
                                </div>
                            </label>

                            {/* Input para las imágenes */}
                            <input
                                type="file"
                                name="images"
                                id="product-image"/>

                        </div>
                    </div>

                    {/* Sección categoría, código y status */}
                    <div className="form-info-section">
                        <div className="form-title">
                            <h1>Categoría, código y disponibilidad</h1>
                        </div>

                        <div className="form-info">
                            {/* Categoría producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-category">Categoría:</label>
                                <select
                                    name="category"
                                    id="product-category">
                                    <option value="">Elegir una opción</option>
                                    <option value="vestimenta">Vestimenta</option>
                                    <option value="calzado">Calzado</option>
                                    <option value="accesorios">Accesorios</option>
                                </select>
                                <i className="ri-arrow-down-s-line chevron-select"></i>
                            </div>

                            {/* Código producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-code">SKU:</label>
                                <input
                                    type="text"
                                    name="code"
                                    id="product-code"
                                    placeholder="Ejemplo de código: V-8745"/>
                            </div>

                            {/* Status producto */}
                            <div className="new-product-info">
                                <label htmlFor="product-status">Disponibilidad:</label>
                                <select
                                    name="status"
                                    id="product-status">
                                    <option value="">Elegir una opción</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="No disponible">No disponible</option>
                                </select>
                                <i className="ri-arrow-down-s-line chevron-select"></i>
                            </div>
                        </div>
                    </div>

                    <div className="new-product-buttons">
                        <Link to="/administración" className="nav-link secondary-button">Cancelar</Link>
                        {/* <input type="button" value="Cancelar" className="secondary-button"></input> */}
                        <input type="submit" value="Agregar producto" className="primary-button" />
                    </div>
                </form>
            </main>

        </>

    )
}
