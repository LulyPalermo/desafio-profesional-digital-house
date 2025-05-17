import PropTypes from 'prop-types';

export const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Si no debe mostrarse, no renderiza nada

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
                        ¡Inicia sesión para poder guardar artículos en tus favoritos, hacer un seguimiento de tus pedidos y pagar más rápido!
                    </p>
                </div>

                <form className="login-modal-form" onSubmit={(e) => e.preventDefault()}>	{/* Previene que el formulario recargue la página al enviar. (Luego agregamos la lógica de login). */}
                    {/* Cartel de error al ingresar mal los datos */}
                    {/* <div className='login-error login-helper-text'>
                        <p>Datos de acceso incorrectos. Por favor verifica que el correo electrónico y la contraseña ingresada son correctos.</p>
                    </div> */}
                    <div className='login-form-labels'>
                        <label>Correo electrónico</label>
                        <input type="email" name="email" required />
                        {/* <p className='login-helper-text'>Debes colocar una dirección de correo electrónico válida.</p>*/}
                    </div>

                    <div className='login-form-labels'>
                        <label>Contraseña</label>
                        <input type="password" name="password" required />
                    </div>

                    <div className='login-form-checkbox'>
                        <input type="checkbox" />
                        <label>Recordarme en este equipo</label>
                    </div>

                    <button type="submit" className="primary-button">Iniciar sesión</button>

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
    onClose: PropTypes.func.isRequired
};