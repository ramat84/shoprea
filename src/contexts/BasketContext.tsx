import { createContext, useContext } from 'react';

export const BasketContext = createContext([])

export const GetBasket = () => {
    const storageBasket = localStorage.getItem("basket")
    return storageBasket ? JSON.parse(storageBasket) : {};
}

