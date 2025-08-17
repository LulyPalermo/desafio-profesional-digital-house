import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext";

export const AdminNavBar = () => {

  const { user, logout } = useContext(UserContext); // Se usa el context para tomar el dato del usuario
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia estado y localStorage
    navigate("/administraciónLogin");
  };

  return (
    <header className="header">
      {/* Logo y Lema */}
      <div className="account-container">
        <span><i className="ri-home-4-fill"></i></span>
        <Link to='/' className="nav-link secondary-button">Ir al sitio público</Link>
      </div>

      <div>
        {user && (
          <span className="welcome-user">Hola {user.nombre} 👋🏼</span>
        )}
      </div>

      <div className="account-container">
        <span><i className="ri-logout-box-r-fill"></i></span>
        <button className="secondary-button logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>

    </header>
  )
}
