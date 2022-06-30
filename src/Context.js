import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {

    function getData() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => console.log(data))
    }


    return (
        <Context.Provider value={{

        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}