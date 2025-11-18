import { Link } from 'react-router-dom'
import isologotipo from '../assets/img/isologotipo.png'

export const FooterComponent = () => {
    return (
        <footer>
            <div className="copyright">
                <img src={isologotipo} alt="Isologotipo" className="isologotipo" />
                <p>Copyright © 2024 - Rent a Look</p>
            </div>

            <Link to="/legales" className='legal-link'>Políticas de Privacidad</Link>

            <div className="social-media">
                <a href="#" rel="noopener noreferrer" className="nav-link">
                    <i className="ri-instagram-fill"></i>
                </a>

                <a href="#" rel="noopener noreferrer" className="nav-link" >
                    <i className="ri-tiktok-fill"></i>
                </a>

                <a href="#" rel="noopener noreferrer" className="nav-link">
                    <i className="ri-facebook-fill"></i>
                </a>
            </div>
        </footer>
    )
}



