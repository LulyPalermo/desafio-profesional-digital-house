import PropTypes from 'prop-types';
import { useState } from 'react';
import { useUser } from '../Context/UserContext';

export const LoginModal = ({ isOpen, onClose, isMandatory = false }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useUser();// Hook useUser para obtener login, logout y user


    if (!isOpen) return null; // Si no debe mostrarse, no renderiza nada

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                login(user); // Acá se usa el login del contexto para setear el usuario
                console.log('Login exitoso:', user);
                onClose(); // Cerrar modal tras login exitoso
            } else {
                setApiError('Datos de acceso incorrectos. Por favor verifica que el correo electrónico y la contraseña ingresada son correctos');
            }
        } catch (error) {
            console.error(error);
            setApiError('Error al iniciar sesión. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            {/* Fondo oscuro detrás del modal */}
            <div className="login-modal-overlay" onClick={onClose}></div>

            {/* Contenedor del modal */}
            <div className="login-modal-content">
                {/* Botón para cerrar el modal y titulo */}
                <div className='login-modal-header'>
                    <button className="login-close-button" onClick={onClose}><i className="ri-close-large-line"></i></button>
                    <h1>Inicia sesión</h1>
                    <p className="login-modal-description">
                        {isMandatory
                            ? "El inicio de sesión es obligatorio para continuar. Si aún no tienes una cuenta, debes registrarte para poder realizar tu reserva."
                            : "¡Inicia sesión para poder guardar artículos en tus favoritos, hacer un seguimiento de tus pedidos y pagar más rápido!"
                        }
                    </p>
                </div>

                <form className="login-modal-form" onSubmit={handleSubmit}>
                    {/* <form className="login-modal-form" onSubmit={(e) => e.preventDefault()}> */}	{/* Previene que el formulario recargue la página al enviar. (Luego agregamos la lógica de login). */}
                    {/* Cartel de error al ingresar mal los datos */}
                    {/* <div className='login-error login-helper-text'>
                        <p>Datos de acceso incorrectos. Por favor verifica que el correo electrónico y la contraseña ingresada son correctos.</p>
                    </div> */}

                    {apiError && <p className="login-error login-helper-text">{apiError}</p>}

                    <div className='login-form-labels'>
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        {/* <p className='login-helper-text'>Debes colocar una dirección de correo electrónico válida.</p>*/}
                    </div>

                    <div className='login-form-labels'>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/*  <div className='login-form-checkbox'>
                        <input type="checkbox" />
                        <label>Recordarme en este equipo</label>
                    </div> */}

                    <button type="submit" className="primary-button" disabled={loading}>
                        {loading ? 'Iniciando...' : 'Iniciar sesión'}
                    </button>
                    {/* <button type="submit" className="primary-button">Iniciar sesión</button> */}

                    <div className="login-modal-links">
                        <a href="#" className='link-button'>Olvidé mi contraseña</a>
                        {/* <p>No soy usuario registrado y quiero <a href="#" className='link-button'>crear una cuenta</a></p> */}
                    </div>
                </form>
            </div>
        </>
    );
};

//Validación de props:
LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isMandatory: PropTypes.bool
};