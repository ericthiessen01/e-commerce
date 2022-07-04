import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Context'

export default function CartSide(props) {
  const {addToCart, removeFromCart, cartItems} = React.useContext(Context)
  let navigate = useNavigate()

  const totalCartItems = cartItems.reduce((acc, obj) => {
      return acc + obj.quantity
  }, 0)

  const sideCartItemsHtml = cartItems.map(obj => {
      if(obj.quantity > 0) {
          return(
              <div key={obj.id} className='w-11/12 my-2 flex bg-white p-2 mx-auto shadow' >
                  <div className='flex flex-col justify-between items-center w-full'>
                      <img src={obj.image} alt={obj.title} className='w-2/5'/>
                      <div className='flex justify-center items-center mb-2'>
                          <button onClick={() => removeFromCart(obj)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-black rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >-</button>
                          <p>{cartItems[cartItems.findIndex(e => e.id === obj.id)].quantity} in cart </p>
                          <button onClick={() => addToCart(obj)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-black rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >+</button>
                      </div>
                  </div>
                  <div className='flex flex-col justify-between m-2'>
                      <h2 className='font-bold text-left'>{obj.title}</h2>
                      <div>
                          <h3>Item price: <span className='font-bold'>{obj.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</span></h3>
                          <h3>Subtotal: <span className='font-bold'>{(obj.price * obj.quantity).toLocaleString("en-US", {style:"currency", currency:"USD"})}</span></h3>
                      </div>
                  </div>
              </div>
          )
      }
  })

  return (
      <div className='w-full sm:w-2/4 lg:w-2/6 2xl:w-1/4 bg-gray-50 h-[90vh] fixed right-0 shadow-lg overflow-y-auto p-2 border-t-2 border-gray-200'>
        {sideCartItemsHtml}
        {totalCartItems > 0 ? 
        <div className='link text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mx-auto my-2 w-3/5 cursor-pointer' onClick={() => {navigate("/e-commerce/Cart"); props.toggleCart()}} >Check-out</div> :
        <p className='p-4 font-bold text-2xl'>No items in cart</p>}
    </div>
  )
}
