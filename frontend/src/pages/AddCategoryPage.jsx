import { Link } from "react-router-dom";
import { AdminNavBar } from "../components/AdminNavBar";

export const AddCategoryPage = () => {
  
  
  
    return (
        <>
            <AdminNavBar />
                <main className="mainAdmin">
                    <section className="section-title">
                        <h1 className="page-title">Agregar nueva categoría</h1>
                        <Link to='/administración' className="nav-link secondary-button">Volver al dashboard</Link>
                    </section>
    
                    <form >
                        {/* Agregar icono y nombre de la categoría */}
                        <div className="form-info-section">
                            <div className="form-title">
                                <h1>Información básica de la categoría</h1>
                            </div>
    
                            <div className="form-info">
                                {/* Nombre categoría */}
                                <div className="new-product-info">
                                    <label htmlFor="category-name">Nombre:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="category-name"
                                        placeholder="Nombre de la categoría"/>
                                </div>
    

                                <div className="form-info">
                                <label htmlFor="category-image">
                                    <div className="upload-picture">
                                        <span><i className="ri-upload-cloud-2-line"></i></span>
                                        <div className="upload-picture-info">
                                            <p>Click aquí para subir una imagen</p>
                                            {/* <p>(SVG, JPG, o PNG)</p> */}
                                        </div>
                                    </div>
                                </label>
    
                                {/* Input para las imágenes */}
                                <input
                                    type="file"
                                    name="images"
                                    id="category-image"
                                    accept="image/*"
                                    multiple
                                    style={{ display: 'none' }} />
                            </div>
                            </div>
                        </div>

                        <div className="new-product-buttons">
                            <Link to="/categories" className="nav-link secondary-button">Cancelar</Link>
                            {/* <input type="button" value="Cancelar" className="secondary-button"></input> */}
                            <input type="submit" value="Agregar categoría" className="primary-button" />
                        </div>
                    </form>
                </main>
    
        </>
  )
}
