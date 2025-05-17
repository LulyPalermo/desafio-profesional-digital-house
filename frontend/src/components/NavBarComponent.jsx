import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';


export const NavBarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    //Modal Inicio sesión
    const openModalLogin = () => {
        setShowLoginModal(true);
        setIsMenuOpen(false); // Cierra el menú mobile si está abierto
    };

    const closeModalLogin = () => {
        setShowLoginModal(false);
    };

    //Modal registro usuario
    const openModalRegister = () => {
        setShowRegisterModal(true);
        setIsMenuOpen(false); // Cierra el menú mobile si está abierto
    };

    const closeModalRegister = () => {
        setShowRegisterModal(false);
    };


    return (
        <>
            <header className="header">
                {/* Logo y lema */}
                <div className="logo-container">
                    <Link to="/" className="logo-link">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                    <span className="slogan">Wear it. Love it. Return it</span>
                </div>

                {/* Botones - desktop */}
                <div className="account-container desktop">
                    <span><i className="ri-user-3-line"></i></span>
                    {/* <Link className="nav-link secondary-button">Crear Cuenta</Link> */}
                    <button className="nav-link secondary-button" onClick={openModalLogin}>Iniciar sesión</button>
                    <span>/</span>
                    <button className="nav-link secondary-button" onClick={openModalRegister}>Crear cuenta</button>

                    {/* <Link className="nav-link secondary-button">Iniciar sesión</Link> */}
                </div>

                {/* Menú hamburguesa - mobile */}
                <div className="menu-icon mobile" onClick={toggleMenu}>
                    <i className="ri-menu-line"></i>
                </div>
            </header>

            {/* Overlay */}
            {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

            {/* Menú mobile con ícono para cerrar */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="close-icon" onClick={toggleMenu}>
                    <i className="ri-close-large-line"></i>
                </div>
                <div className='account-container-mobile'>
                    <span><i className="ri-user-3-line"></i></span>
                    <button className="nav-link secondary-button" onClick={openModalLogin}>Iniciar sesión</button>
                    <span>/</span>
                    <button className="nav-link secondary-button" onClick={openModalRegister}>Crear cuenta</button>
                </div>
            </div>

            {/* Modal Inicio de sesión y Registro*/}
            <LoginModal isOpen={showLoginModal} onClose={closeModalLogin} />
            <RegisterModal isOpen={showRegisterModal} onClose={closeModalRegister} />
        </>
    );
};
