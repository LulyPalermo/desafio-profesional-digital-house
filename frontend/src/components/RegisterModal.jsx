import PropTypes from 'prop-types';
import { useState } from 'react';

export const RegisterModal = ({ isOpen, onClose }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    apellido: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!nameRegex.test(formData.name)) {
      newErrors.name = 'El nombre solo debe contener letras y espacios.';
    }

    if (!nameRegex.test(formData.apellido)) {
      newErrors.apellido = 'El apellido solo debe contener letras y espacios.';
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Debes ingresar un correo electrónico válido.';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'La contraseña no cumple con los requisitos';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log('Datos válidos para registrar:', formData);
      // Aquí va el POST al backend o llamada a la API.
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="register-modal-overlay" onClick={onClose}></div>

      <div className="register-modal-content">
        <div className='register-modal-header'>
          <button className="register-close-button" onClick={onClose}>
            <i className="ri-close-large-line"></i>
          </button>
          <h1>Crea una cuenta</h1>
          <p className="register-modal-description">
            ¡Bienvenido a Rent a Look! <br />
            Crear una cuenta es rápido y sencillo.
          </p>
        </div>

        <form className="register-modal-form" onSubmit={handleSubmit}>
          <div className='register-form-labels'>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="login-helper-text">{errors.name}</p>}
          </div>

          <div className='register-form-labels'>
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
            {errors.apellido && <p className="login-helper-text">{errors.apellido}</p>}
          </div>

          <div className='register-form-labels'>
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="login-helper-text">{errors.email}</p>}
          </div>

          <div className='register-form-labels'>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="login-helper-text">{errors.password}</p>}

            <div className='password-requirement'>
              <p>La contraseña debe tener un largo mínimo de 8 caracteres y contener al menos:</p>
              <p>- 1 letra</p>
              <p>- 1 número</p>
              <p>- 1 símbolo o caracter especial (ej: # _ @ - $ . / )</p>
            </div>
          </div>

          <button type="submit" className="primary-button">Crear cuenta</button>

          <div className="register-modal-links">
            <p>Ya tengo una cuenta y quiero <a href="#" className="link-button">iniciar sesión</a></p>
          </div>
        </form>
      </div>
    </>
  );
};

// Validación de props
RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
