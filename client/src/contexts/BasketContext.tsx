import { useContext, createContext, useEffect, useState } from "react"
import type { Dispatch, ReactNode, SetStateAction } from "react"
import type { Product } from "../generated/prisma/client"
import type { AmountsType } from '../types/Basket';

type BasketContextType = {
    amounts: [AmountsType, Dispatch<SetStateAction<AmountsType>>],
    products: [Product[], Dispatch<SetStateAction<Product[]>>],
    total: [number, Dispatch<SetStateAction<number>>]
}

const BasketContext = createContext<BasketContextType>({
    amounts: [[], () => { }],
    products: [[], () => { }],
    total: [0, () => { }]
})

export const GetAmounts = () => {
    const storageBasket = localStorage.getItem("basket")
    return storageBasket ? JSON.parse(storageBasket) : {};
}

export const BasketContextProvider = ({ children }: { children: ReactNode }) => {
    const basketStates = {
        amounts: useState<AmountsType>([]),
        products: useState<Product[]>([]),
        total: useState<number>(0)
    }

    const [, setBasketAmounts] = basketStates.amounts

    useEffect(() => { setBasketAmounts(GetAmounts()) }, [])

    return (
        <BasketContext.Provider value={basketStates}>
            {children}
        </BasketContext.Provider>
    )
}

export const useBasket = () => {
    const basketContext = useContext(BasketContext)
    const [basketAmounts, setBasketAmounts] = basketContext.amounts
    const [basketProducts, setBasketProducts] = basketContext.products
    const [basketTotal, setBasketTotal] = basketContext.total


    const GetTotal = () => {
        let total = 0

        basketProducts.forEach((prod: Product) => {
            total += prod.price * basketAmounts[prod.id]
        })

        return total
    }

    useEffect(() => { setBasketTotal(GetTotal()) }, [])
    useEffect(() => { setBasketTotal(GetTotal()) }, [basketContext.products, basketContext.amounts])

    const GetAmounts = () => {
        const storageBasket = localStorage.getItem("basket")
        return storageBasket ? JSON.parse(storageBasket) : {};
    }

    return { basketProducts, basketAmounts, basketTotal, setBasketAmounts, setBasketProducts, setBasketTotal, GetAmounts, GetTotal }
}
