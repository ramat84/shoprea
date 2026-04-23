import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { Product } from "../generated/prisma/client.ts"

export type AmountsType = { [key: number]: number }

export const BasketContext = createContext({
    amounts: [{}, () => { }] as [AmountsType, Dispatch<SetStateAction<AmountsType>>],
    products: [[], () => { }] as [Product[], Dispatch<SetStateAction<Product[]>>],
    total: [0, () => { }] as [number, Dispatch<SetStateAction<number>>]
})

export const GetAmounts = () => {
    const storageBasket = localStorage.getItem("basket")
    return storageBasket ? JSON.parse(storageBasket) : {};
}

