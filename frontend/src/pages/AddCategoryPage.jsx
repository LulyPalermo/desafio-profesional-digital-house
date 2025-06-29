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
            </main>
        </>
  )
}
