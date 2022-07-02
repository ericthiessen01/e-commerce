import React from 'react'
import { Context } from '../Context'

export default function Item() {
  const {storeItems, storeCategories, addToCart, removeFromCart, cartItems, sort} = React.useContext(Context)
  const [filterCategory, setFilterCategory] = React.useState('all')

  const categoryOptions = storeCategories.reduce((count, currentValue) => {
    return (
      count[currentValue] ? ++count[currentValue] : (count[currentValue] = 1), count
    )
  }, {})

  const selectValues = Object.keys(categoryOptions)
  const selectHtml = selectValues.map((obj, i) => {
    return(
      <option key={obj} value={obj}>{obj[0].toUpperCase() + obj.slice(1)} ({Object.values(categoryOptions)[i]})</option>
  )})

  function handleChange(e) {
    setFilterCategory(e.target.value)
  }

  const productsHtml = storeItems.map(obj => {
    if(filterCategory === obj.category) {
      return(
        <div key={obj.id}>
          <img src={obj.image} alt={obj.title} className='w-36'/>
          <h2>{obj.title}</h2>
          <h3>${obj.price}</h3>
          <p>{obj.rating.rate}/5 ({obj.rating.count})</p>
          <p>{obj.description}</p>
          {cartItems.some(e => e.id === obj.id && e.quantity > 0) ?
            <div>
              <button onClick={() => removeFromCart(obj)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >-</button>
              <p>{cartItems[cartItems.findIndex(e => e.id === obj.id)].quantity} in cart</p>
              <button onClick={() => addToCart(obj)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >+</button>
            </div> :
            <button onClick={() => addToCart(obj)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >+ Add to Cart</button>
          }
        </div>
      )
    } if(filterCategory === 'all') {
      return(
        <div key={obj.id}>
          <img src={obj.image} alt={obj.title} className='w-36'/>
          <h2>{obj.title}</h2>
          <h3>${obj.price}</h3>
          <p>{obj.rating.rate}/5 ({obj.rating.count})</p>
          <p>{obj.description}</p>
          {cartItems.some(e => e.id === obj.id && e.quantity > 0) ?
            <div>
              <button onClick={() => removeFromCart(obj)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >-</button>
              <p>{cartItems[cartItems.findIndex(e => e.id === obj.id)].quantity} in cart</p>
              <button onClick={() => addToCart(obj)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >+</button>
            </div> :
            <button onClick={() => addToCart(obj)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >+ Add to Cart</button>
          }
        </div>
      )
    }
  })

  return (
    <div>
      <select onChange={(e) => sort(e)} defaultValue='' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        <option value='' disabled hidden>Sort By</option>
        <option value='lowToHigh'>Price: Low to High</option>
        <option value='highToLow'>Price: High to Low</option>
        <option value='a-z'>Alphabetical (A-Z)</option>
        <option value='z-a'>Alphabetical (Z-A)</option>
      </select>
      <select onChange={(e) => handleChange(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >
        <option value='all'>All categories ({storeItems.length})</option>
        {selectHtml}
      </select>
      {productsHtml}
    </div>
  )
}
