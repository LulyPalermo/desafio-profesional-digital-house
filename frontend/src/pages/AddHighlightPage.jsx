import { Link } from "react-router-dom";
import { AdminNavBar } from "../components/AdminNavBar";
// import { useNavigate } from "react-router-dom";



export const AddHighlightPage = () => {
  return (
            <>
                <AdminNavBar />
                <main className="mainAdmin">
                    <section className="section-title">
                        <h1 className="page-title">Agregar nueva característica</h1>
                        <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                    </section>
    
                    <form >
                        {/* Agregar icono y nombre de la característica */}
                        <div className="form-info-section">
                            <div className="form-title">
                                <h1>Información básica de la característica</h1>
                            </div>
    
                            <div className="form-info">
                                {/* Nombre producto */}
                                <div className="new-product-info">
                                    <label htmlFor="product-name">Nombre:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="product-name"
                                        placeholder="Nombre de la característica"/>
                                </div>
    

                                <div className="form-info">
                                <label htmlFor="product-image">
                                    <div className="upload-picture">
                                        <span><i className="ri-upload-cloud-2-line"></i></span>
                                        <div className="upload-picture-info">
                                            <p>Click aquí para subir el ícono</p>
                                            {/* <p>(SVG, JPG, o PNG)</p> */}
                                        </div>
                                    </div>
                                </label>
    
                                {/* Input para las imágenes */}
                                <input
                                    type="file"
                                    name="images"
                                    id="product-image"
                                    accept="image/*"
                                    multiple
                                    style={{ display: 'none' }} />
                            </div>
                            </div>
                        </div>

                        <div className="new-product-buttons">
                            <Link to="/administración" className="nav-link secondary-button">Cancelar</Link>
                            {/* <input type="button" value="Cancelar" className="secondary-button"></input> */}
                            <input type="submit" value="Agregar característica" className="primary-button" />
                        </div>
                    </form>
                </main>
    
            </>
    
  )
}
