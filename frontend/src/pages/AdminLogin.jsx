import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext";

export const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(UserContext); // Se obtiene la función login

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/admin_users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.log("Login fallido:", errorMessage);
                setError(errorMessage || "Credenciales incorrectas");
                return;
            }

            const userData = await response.json();
            login(userData); // Se guarda en estado global y localStorage
            console.log("Bienvenido!", userData);
            navigate("/administración"); // Redirige al dashboard

        } catch (error) {
            setError("Error de conexión");
            console.error(error);
        }
    };

    return (

        <main className="main-admin-login">
            <section className="login-content">
                <div className="login-modal-header">
                    <h1>Inicia sesión</h1>
                    <p className="login-modal-description">Inicia sesión con tu email y contraseña para ingresar al administrador.</p>
                </div>

                <form className="login-modal-form" onSubmit={handleSubmit}>
                    <div className='login-form-labels'>
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='login-form-labels'>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button type="submit" className="primary-button"> Iniciar sesión</button>

                </form>
            </section>
        </main>
    )
}
