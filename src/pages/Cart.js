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

    const totalPrice = cartItems.reduce((acc, obj) => {
        return acc + obj.price * obj.quantity
    }, 0).toLocaleString("en-US", {style:"currency", currency:"USD"})

  return (
      <div className='bg-zinc-50 min-h-[85vh] h-full'>
        <h2 className='font-black text-4xl ml-6 p-4 text-left'>Check-out</h2>
        {totalCartItems > 0 ? 
        <div className='flex flex-col items-center w-10/12 mx-auto'>
          <CartItem />
          <h2 className='font-bold text-xl'>TOTAL: {totalPrice}</h2>
        </div> :
        <div>
          <p className='p-4 font-bold text-2xl'>No items in cart</p>
          <div className='link text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-auto ml-auto max-w-fit cursor-pointer' onClick={() => {navigate("/e-commerce/")}} >View Products</div>
          </div>}
    </div>
  )
}

// TODO - Add fake checkout form
