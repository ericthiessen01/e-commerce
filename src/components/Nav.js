import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import CartSide from '../components/CartSide';

export default function Nav() {
    const [showCart, setShowCart] = React.useState(false)
    let navigate = useNavigate()

    function toggleCart() {
        setShowCart(prev => !prev)
    }

    return (
        <>
        <div className='nav-container flex justify-between items-center p-3 shadow-lg bg-slate-50 w-full sticky top-0 h-[10vh]'>
            <div className='nav-links flex'>
                <div className='link text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2' onClick={() => {navigate("/e-commerce/")}} >Products</div>
                <div className='link text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2' onClick={() => {navigate("/e-commerce/About")}} >About</div>
                <div className='link text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2' onClick={() => {navigate("/e-commerce/Cart")}} >Check-out</div>
            </div>
            <FontAwesomeIcon icon={faCartShopping} size="5x" className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center mr-2 mb-2' onClick={toggleCart}/>
        </div>
        {showCart && <CartSide />}
        </>
    )
}
