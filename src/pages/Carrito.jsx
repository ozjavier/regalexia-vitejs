import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        const productos = JSON.parse(localStorage.getItem('Product')) || [];
        const reservas = JSON.parse(localStorage.getItem('appointments')) || [];
        return [...productos, ...reservas];
    });

    const redirectToCheckoutPage = () => {
        navigate('/checkout', { state: { cart } });
    };

    const handleDelete = (id) => {
        const updatedCart = cart.filter(product => product.id !== id);
        setCart(updatedCart);
        localStorage.setItem('Product', JSON.stringify(updatedCart.filter(p => !p.fecha))); // Guarda solo productos
        localStorage.setItem('appointments', JSON.stringify(updatedCart.filter(p => p.fecha))); // Guarda solo reservas
    };

    const handleQuantityChange = (value, id) => {
        const updatedCart = cart.map(product => {
            if (product.id === id) {
                return { ...product, quantity: value };
            }
            return product;
        });
        setCart(updatedCart);
        localStorage.setItem('Product', JSON.stringify(updatedCart.filter(p => !p.fecha)));
        localStorage.setItem('appointments', JSON.stringify(updatedCart.filter(p => p.fecha)));
    };

    return (
        <div className="container mx-auto px-6">
            <h1 className="text-rgx-blue text-[42px] font-semibold mb-8 font-montserrat">Carrito de Compras</h1>

            {cart.length > 0 ? (
                <>
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-100 text-rgx-text">
                            <tr>
                                <th className="p-3 text-left">Nombre</th>
                                <th className="p-3 text-center">Precio</th>
                                <th className="p-3 text-center">Cantidad</th>
                                <th className="p-3 text-center">Total</th>
                                <th className="p-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id} className="border-t text-rgx-text">
                                    <td className="p-3">{product.name}</td>
                                    <td className="p-3 text-center">{product.price}€</td>
                                    <td className="p-3 text-center">
                                        <input
                                            type="number"
                                            className="border border-gray-300 rounded-md px-2 py-1 w-16 text-center"
                                            min="1"
                                            max="100"
                                            value={product.quantity}
                                            onChange={(e) => handleQuantityChange(Number(e.target.value), product.id)}
                                        />
                                    </td>
                                    <td className="p-3 text-center">{(product.price * product.quantity).toFixed(2)}€</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-10">
                        <p className="text-xl font-semibold">Total: <span className="text-rgx-blue">{cart.reduce((total, p) => total + p.price * p.quantity, 0).toFixed(2)}€</span></p>
                        <button
                            onClick={redirectToCheckoutPage}
                            className="bg-rgx-yellow text-rgx-text px-6 py-3 rounded-md flex items-center gap-2 hover:bg-yellow-600 transition"
                        >
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" /><path d="M3 10h18" /><path d="M16 19h6" /><path d="M19 16l3 3l-3 3" /><path d="M7.005 15h.005" /><path d="M11 15h2" /></svg>
                            Finalizar compra
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-600 mt-12">
                    <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
                    <p>Agrega productos o reservas para continuar.</p>
                </div>
            )}
        </div>
    );
};

export default Carrito;
