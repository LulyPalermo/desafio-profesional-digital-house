import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { SuccessModal } from "../components/SuccessModal";


export const WhatsappButton = () => {
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const phoneNumber = "+59899296169";
    // const phoneNumber = "123";
    const message = "¡Hola! Quisiera consultar sobre un producto de Rent-a-Look.";

    const handleWhatsappClick = () => {
        try {
            // Se verifica conexión
            if (!navigator.onLine) {
                // Si no hay conexión
                setModalMessage("Parece que no tienes conexión a internet. Intenta nuevamente.");
                setShowModal(true);
                return;
            }

            // Validación del número (nuevo)
            const cleaned = phoneNumber.replace(/\D/g, ""); // quita + y símbolos
            if (cleaned.length < 8 || cleaned.length > 15) {
                setModalMessage("No podemos enviar tu mensaje. El número de teléfono no existe en WhatsApp.");
                setShowModal(true);
                return;
            }

            // > > > Para probar el error genérico, cambiar a true < < <
            const simulateError = false;
            if (simulateError) throw new Error("Simulación error genérico");

            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            const newWindow = window.open(url, "_blank"); // abre WhatsApp Web o la app

            // Si por alguna razón no se abre la ventana
            if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
                throw new Error("No se pudo abrir WhatsApp.");
            }

            // Si todo sale bien se muestra modal de éxito
            setModalMessage("El mensaje fue enviado correctamente, te contestaremos lo antes posible.");
            setShowModal(true);

        } catch (error) {
            // Error genérico (falla del navegador, popup bloqueado, etc.)
            setModalMessage("Ocurrió un error al intentar abrir WhatsApp. Por favor, inténtalo más tarde.");
            setShowModal(true);
            console.error("Error al abrir WhatsApp:", error);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };



    return (
        <>
            <div
                className="whatsapp-button"
                onClick={handleWhatsappClick}
                style={{ cursor: "pointer" }}
                title="Chatear por WhatsApp"
            >
                <span>
                    <IoLogoWhatsapp />
                </span>
            </div>

            {showModal && (
                <SuccessModal message={modalMessage} onClose={handleCloseModal} />
            )}
        </>
    );

};
