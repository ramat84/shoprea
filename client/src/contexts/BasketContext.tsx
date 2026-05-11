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
        FetchProducts(basketContext)
    }, [basketAmounts])

    const IsBasketEmpty = () => basketProducts.length == 0

    const UpdateBasket = (productId: number, amount: number) => {
        if (amount === 0) {
            alert('Click on Trash icon to delete')
            return;
        }

        if (amount < 0 || isNaN(amount)) {
            console.error(`Number can't be ${amount}`)
            return;
        }

        setBasketAmounts((prev: AmountsType) => {
            let new_amounts = { ...prev };
            new_amounts[productId] = amount;

            localStorage.setItem("basket", JSON.stringify(new_amounts))
            return new_amounts
        })

    }

    const Trash = (productID: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return false;

        setBasketAmounts(prev => {
            let new_amounts = { ...prev };
            delete new_amounts[productID]

            localStorage.setItem("basket", JSON.stringify(new_amounts))
            return new_amounts
        })

        setBasketProducts(prev => {
            return prev.filter((product) => { return productID != product.id })
        })
    }

    useEffect(SetTotal, [basketContext.products, basketContext.amounts])

    return {
        basketProducts,
        basketAmounts,
        basketTotal,
        setBasketAmounts,
        setBasketProducts,
        setBasketTotal,
        AddToBasket,
        GetBasketProducts,
        GetAmounts,
        GetProductIDs,
        IsBasketEmpty,
        UpdateBasket,
        Trash
    }
}
