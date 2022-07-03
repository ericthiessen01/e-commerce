import React from 'react'
import { Context } from '../Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Item() {
  const {storeItems, storeCategories, addToCart, removeFromCart, cartItems, sort, loading} = React.useContext(Context)
  const [filterCategory, setFilterCategory] = React.useState('')

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
        <div key={obj.id} className='w-5/6 bg-white p-4 m-4 grid grid-cols-5 ' >
          <img src={obj.image} alt={obj.title} className='p-3 max-h-64 self-center justify-self-center col-span-1'/>
          <div className='col-start-2 flex flex-col justify-between m-1' >
            <div>
              <h2 className='font-bold text-left text-lg'>{obj.title}</h2>
              <p className='text-left'>⭐{obj.rating.rate}/5 ({obj.rating.count})</p>
          </div>
            <div>
              <h3 className='font-medium text-xl m-2'>{obj.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</h3>
              {cartItems.some(e => e.id === obj.id && e.quantity > 0) ?
                <div className='flex justify-center items-center'>
                  <button onClick={() => removeFromCart(obj)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-black rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >-</button>
                  <p>{cartItems[cartItems.findIndex(e => e.id === obj.id)].quantity} in cart </p>
                  <button onClick={() => addToCart(obj)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-black rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >+</button>
                </div> :
                <button onClick={() => addToCart(obj)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2" >+ Add to Cart</button>
              }
            </div>
          </div>
          <p className='col-start-3 col-span-3 m-1'>{obj.description}</p>
        </div>
      )} if(!filterCategory) {
        return(
          <div key={obj.id} className='w-5/6 bg-white p-4 m-4 grid grid-cols-5 ' >
            <img src={obj.image} alt={obj.title} className='p-3 max-h-64 self-center justify-self-center col-span-1'/>
            <div className='col-start-2 flex flex-col justify-between m-1' >
              <div>
                <h2 className='font-bold text-left text-lg'>{obj.title}</h2>
                <p className='text-left'>⭐{obj.rating.rate}/5 ({obj.rating.count})</p>
              </div>
              <div>
                <h3 className='font-medium text-xl m-2'>{obj.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</h3>
                {cartItems.some(e => e.id === obj.id && e.quantity > 0) ?
                  <div className='flex justify-center items-center'>
                    <button onClick={() => removeFromCart(obj)} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-black rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >-</button>
                    <p>{cartItems[cartItems.findIndex(e => e.id === obj.id)].quantity} in cart </p>
                    <button onClick={() => addToCart(obj)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-black rounded-full text-lg px-5 py-2.5 text-center m-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >+</button>
                  </div> :
                  <button onClick={() => addToCart(obj)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2" >+ Add to Cart</button>
                }
              </div>
            </div>
            <p className='col-start-3 col-span-3 m-1'>{obj.description}</p>
          </div>
        )
      }
  })

  return (
    <div className='bg-slate-50 p-4'>
      <div className='flex justify-between items-center pl-4 pr-4'>
        <h2 className='font-black text-4xl '>Things & Stuff Store</h2>
        <div>
          <select onChange={(e) => sort(e)} defaultValue='' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <option value='' disabled hidden>Sort By</option>
            <option value='lowToHigh'>Price: Low to High</option>
            <option value='highToLow'>Price: High to Low</option>
            <option value='a-z'>Alphabetical (A-Z)</option>
            <option value='z-a'>Alphabetical (Z-A)</option>
          </select>
          <select onChange={(e) => handleChange(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >
            <option value=''>All categories ({storeItems.length})</option>
            {selectHtml}
          </select>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        {loading ?
        <div>
          <h2 className='text-2xl font-medium'><FontAwesomeIcon icon={faSpinner} className='animate-spin'/> Retrieving store data</h2>
        </div> :
        productsHtml
      }
      </div>
    </div>
  )
}