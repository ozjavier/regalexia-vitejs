import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const { orderId } = location.state || {};
    const [idOper, setIdOper] = useState('');
    const scriptLoaded = useRef(false); // Ref para controlar la carga del script

    useEffect(() => {
        if (scriptLoaded.current) return; // Evita la carga doble del script

        // Cargar el script de Redsys dinámicamente
        const script = document.createElement('script');
        script.src = "https://sis-t.redsys.es:25443/sis/NC/sandbox/redsysV3.js";
        script.async = true;
        document.body.appendChild(script);
        scriptLoaded.current = true; // Marcar el script como cargado

        script.onload = () => {
            console.log("✅ Redsys script cargado correctamente.");

            // Inicializar el formulario de Redsys con estilos personalizados
            getInSiteForm(
                "card-form",
                "background-color: #0074D9; color: white; font-weight: bold;", 
                "background-color: #F8F9FA;",  
                "background-color: #E9ECEF; border-radius: 8px;",  
                "font-family: Arial, sans-serif; color: #333;", 
                "Pagar con Redsys",   
                "999008881",          
                "1",                  
                `pedido${Math.floor((Math.random() * 1000) + 1)}`, 
                "ES",                 
                false                 
            );
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const handlePaymentMessage = (event) => {
            const trustedOrigins = [
                "http://localhost:3000",
                "https://sis-t.redsys.es:25443"
            ];

            if (!trustedOrigins.includes(event.origin)) {
                console.warn("Mensaje recibido de un origen no válido:", event.origin);
                return;
            }

            storeIdOper(event, "token", "errorCode", () => {
                alert("Validaciones personalizadas antes del pago.");
                return true;
            });

            const tokenElement = document.getElementById("token");
            if (tokenElement) {
                setIdOper(tokenElement.value);
            }
        };

        window.addEventListener("message", handlePaymentMessage);
        return () => {
            window.removeEventListener("message", handlePaymentMessage);
        };
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-rgx-blue text-[42px] font-semibold mb-8 font-montserrat">Pago Seguro con Redsys</h1>
            
            <div id="card-form" className="bg-white p-6 shadow-md rounded-lg text-center"></div>

            <form name="datos">
                <input type="hidden" id="token" value={idOper} />
                <input type="hidden" id="errorCode" />
                <button 
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    onClick={() => alert(`ID Operación: ${idOper}`)}
                >
                    Ver ID Operación
                </button>
            </form>
        </div>
    );
};

export default Checkout;
