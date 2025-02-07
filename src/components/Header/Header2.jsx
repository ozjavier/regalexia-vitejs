import React, { useEffect, useState } from 'react';

const Header2 = () => {
    const [carrito, setCarrito] = useState(0)
    const [price, setPrice] = useState(0.00.toFixed(2))
    let count = 0;
    let isLocalStorage = false;

    try {
        count = JSON.parse(localStorage.getItem('Product')).length;
        isLocalStorage = true;
    } catch (error) {
        count = 0;
    }

    useEffect(() => {
        if (isLocalStorage) {
            setCarrito(count);
            let total = 0;
            let cart = JSON.parse(localStorage.getItem('Product'));
            cart.forEach(product => {
                total += product.price * product.quantity;
            });
            setPrice(total.toFixed(2));
        }
    }, [count, isLocalStorage]);
    


    return (
        <header className='bg-rgx-blue flex items-center h-12 font-nunito'>
            <nav className='container mx-auto flex justify-between'>
                <ul className='flex text-white gap-4 text-base'>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/consejos-para-padres">Consejos para padres</a></li>
                    <li><a href="/experiencias">Productos</a></li>                    
                </ul>                
                <ul className='flex gap-3'>
                    <li className='text-base text-white'>{price} €</li>
                    <div className='relative pr-2'>
                        <li className=''>
                            <a href="/carrito" className="text-rgx-yellow">
                                <svg width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg>
                            </a>
                        </li>
                        <span className="bg-rgx-text px-2 rounded-4xl text-white text-xs absolute bottom-0 left-3">{carrito}</span>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header2;
