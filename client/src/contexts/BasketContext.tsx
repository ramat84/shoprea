import { createContext, useContext } from 'react';
import type { ProductType } from '../interfaces/ProductType.ts'

export const BasketContext = createContext<any>({
    amounts: [{}, () => { }],
    products: [[], () => { }],
    total: [0, () => { }]
})

export const GetAmounts = () => {
    const storageBasket = localStorage.getItem("basket")
    return storageBasket ? JSON.parse(storageBasket) : {};
}

