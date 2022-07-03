import React from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { Context } from '../Context'


export default function Checkout() {
    const {cartItems} = React.useContext(Context)
    let navigate = useNavigate()

    const totalCartItems = cartItems.reduce((acc, obj) => {
        return acc + obj.quantity
    }, 0)

  return (
      <div className='bg-stone-50'>
        {totalCartItems > 0 ? 
        <CartItem /> :
        <div>
          <p className='p-4 font-bold'>No items in cart</p>
          <div className='link text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2' onClick={() => {navigate("/e-commerce/")}} >View Products</div>
          </div>}
    </div>
  )
}
