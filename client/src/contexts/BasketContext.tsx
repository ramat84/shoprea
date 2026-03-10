import { createContext, useContext } from 'react';

export const BasketContext = createContext({
    amounts: {},
    products: {}
})

export const GetAmounts = () => {
    const storageBasket = localStorage.getItem("basket")
    return storageBasket ? JSON.parse(storageBasket) : {};
}

