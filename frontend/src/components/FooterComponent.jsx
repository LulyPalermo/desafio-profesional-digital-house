import { Link } from 'react-router-dom'
import isologotipo from '../assets/img/isologotipo.png'

export const FooterComponent = () => {
    return (
        <footer>
            <div className="copyright">
                <img src={isologotipo} alt="Isologotipo" className="isologotipo" />
                <p>Copyright © 2024 - Rent a Look</p>
            </div>

            <div className="social-media">
                <Link className="nav-link"><i className="ri-instagram-fill"></i></Link>
                <Link className="nav-link"><i className="ri-tiktok-fill"></i></Link>
                <Link className="nav-link"><i className="ri-facebook-fill"></i></Link>
            </div>
        </footer>
    )
}