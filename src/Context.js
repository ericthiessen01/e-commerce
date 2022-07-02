import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [storeItems, setStoreItems] = useState([])
    const [storeCategories, setStoreCategories] = useState([])
    const [cartItems, setCartItems] = useState(() => {
        const cart = localStorage.getItem('cart')
        return cart !== null || undefined
            ? JSON.parse(cart)
            : []
      })

    function getData() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setStoreItems(data)
                setStoreCategories(data.map(item => item.category))
            })
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(cartItems)

    function addToCart(selectedItem) {
        setCartItems(prevItems => {
            if(prevItems.find(item => item.id === selectedItem.id) == null) {
                return [...prevItems, {...selectedItem, quantity: 1}]
            } else {
                return prevItems.map(item => {
                    if(item.id === selectedItem.id) {
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(selectedItem) {
        setCartItems(prevItems => {
                return prevItems.map(item => {
                    if(item.id === selectedItem.id) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        )
    }

    return (
        <Context.Provider value={{
            storeItems: storeItems,
            storeCategories: storeCategories,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            cartItems: cartItems
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}