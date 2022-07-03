import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Context'
import CartItem from './CartItem'

export default function CartSide() {
    const {cartItems} = React.useContext(Context)
    let navigate = useNavigate()

    const totalCartItems = cartItems.reduce((acc, obj) => {
        return acc + obj.quantity
    }, 0)

  return (
      <div className='w-1/4 bg-stone-50 h-[90vh] fixed right-0 shadow-lg overflow-y-auto p-2'>
        <CartItem />
        {totalCartItems > 0 ? 
        <div className='link text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2' onClick={() => {navigate("/e-commerce/Cart")}} >Check-out</div> :
        <p className='p-4 font-bold'>No items in cart</p>}
    </div>
  )
}
