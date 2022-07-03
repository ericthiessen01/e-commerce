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

    function sort(e) {
        if(e.target.value === 'lowToHigh') {
            setStoreItems(prev => {
                return ([...prev].sort((a, b) => {return a.price - b.price}))
            })
        } if(e.target.value === 'highToLow') {
            setStoreItems(prev => {
                return ([...prev].sort((a, b) => {return b.price - a.price}))
            })
        } if(e.target.value === 'a-z') {
            setStoreItems(prev => {
                return ([...prev].sort((a, b) => {
                    const sa = a.title.toLowerCase()
                    const sb = b.title.toLowerCase()
                    return (sa < sb) ? -1 : (sa > sb) ? 1 : 0
                }))
            })
        } if(e.target.value === 'z-a') {
            setStoreItems(prev => {
                return ([...prev].sort((a, b) => {
                    const sa = a.title.toLowerCase()
                    const sb = b.title.toLowerCase()
                    return (sa > sb) ? -1 : (sa < sb) ? 1 : 0
                }))
            })
        } 
    }

    return (
        <Context.Provider value={{
            storeItems: storeItems,
            storeCategories: storeCategories,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            cartItems: cartItems,
            sort: sort
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}