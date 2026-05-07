import { useContext, createContext, useEffect, useState, useCallback } from "react"
import type { Dispatch, ReactNode, SetStateAction } from "react"
import type { Product } from "../generated/prisma/client"
import type { AmountsType } from '../types/Basket';
import { GetAmounts, SetTotalFor, AddToBasketFor, FetchProducts, GetProductIDs } from "../lib/Basket";

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

    const SetTotal = () => SetTotalFor(basketContext)

    const AddToBasket = (productId: number, amount: number = 1, setEffect?: Dispatch<string>) => (
        AddToBasketFor(basketContext, productId, amount, setEffect)
    )

    const GetBasketProducts = useCallback(() => {
        console.log(basketAmounts)
        FetchProducts(basketContext)
    }, [basketAmounts])

    useEffect(SetTotal, [basketContext.products, basketContext.amounts])

    return {
        GetBasketProducts,
        basketProducts,
        basketAmounts,
        basketTotal,
        setBasketAmounts,
        setBasketProducts,
        setBasketTotal,
        GetAmounts,
        GetProductIDs,
        AddToBasket
    }
}
