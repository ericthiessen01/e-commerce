import React from 'react'
import { Context } from '../Context'

export default function CartItem() {
    const {addToCart, removeFromCart, cartItems} = React.useContext(Context)

    const cartItemsHtml = cartItems.map(obj => {
        if(obj.quantity > 0) {
            return(
                <div key={obj.id} className=' bg-white p-4 m-4 grid grid-cols-5' >
                    <img src={obj.image} alt={obj.title} className='p-3 max-h-48 self-center justify-self-center col-span-1'/>
                    <div className='col-start-2 flex flex-col justify-between items-start'>
                        <h2 className='font-bold text-left text-lg'>{obj.title}</h2>
                        <div className='flex justify-center items-center'>
                            <button onClick={() => removeFromCart(obj)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-black rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >-</button>
                            <p>{cartItems[cartItems.findIndex(e => e.id === obj.id)].quantity} in cart </p>
                            <button onClick={() => addToCart(obj)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-black rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >+</button>
                        </div>
                    </div>
                    <div className='col-start-5 mt-auto'>
                        <h3>Item price: <span className='font-medium'>{obj.price.toLocaleString("en-US", {style:"currency", currency:"USD"})} ({obj.quantity})</span></h3>
                        <h3>Subtotal: <span className='font-bold m-1'>{(obj.price * obj.quantity).toLocaleString("en-US", {style:"currency", currency:"USD"})}</span></h3>
                    </div>
                </div>
            )
        }
    })

  return (
    <div>
        {cartItemsHtml}
    </div>
  )
}
