import React from 'react'
import { Context } from '../Context'

export default function CartItem() {
    const {addToCart, removeFromCart, cartItems} = React.useContext(Context)

    const cartItemsHtml = cartItems.map(obj => {
        if(obj.quantity > 0) {
            return(
                <div key={obj.id}>
                    <img src={obj.image} alt={obj.title} className='w-36'/>
                    <h2>{obj.title}</h2>
                    <button onClick={() => removeFromCart(obj)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >-</button>
                    <p>{obj.quantity} in cart</p>
                    <button onClick={() => addToCart(obj)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >+</button>
                    <h3>${obj.price}</h3>
                    <h3>${obj.price * obj.quantity}</h3>
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
