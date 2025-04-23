import { Link } from "react-router-dom"

export const AdminNavBar = () => {
  return (
    <header className="header">
            {/* Logo y Lema */}
            <div className="account-container">
                <span><i className="ri-home-4-fill"></i></span>
                <Link to='/' className="nav-link secondary-button">Ir al sitio público</Link>
            </div>

            <div className="account-container">
                <span><i className="ri-logout-box-r-fill"></i></span>
                <Link className="secondary-button">Cerrar sesión</Link>
            </div>
           
        </header>
  )
}
