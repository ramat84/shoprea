import { createContext } from 'react';

export type AmountsType = { [key: number]: number }

export const BasketContext = createContext(null)

export const GetAmounts = () => {
    const storageBasket = localStorage.getItem("basket")
    return storageBasket ? JSON.parse(storageBasket) : {};
}

