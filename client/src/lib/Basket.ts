import axios from "axios"
import type { AmountsType } from "../types/Basket"
import type { Dispatch } from "react"
import type { Product } from "../generated/prisma/client"

export const SetTotalFor = (basketContext) => {
    const [basketProducts] = basketContext.products
    const [basketTotal, setBasketTotal] = basketContext.total
    const [basketAmounts] = basketContext.amounts

    let total = 0

    basketProducts.forEach((prod: Product) => {
        total += prod.price * basketAmounts[prod.id]
    })

    if (total != basketTotal)
        setBasketTotal(total)
}

export const GetAmounts = () => {
    const storageBasket = localStorage.getItem("basket")
    return storageBasket ? JSON.parse(storageBasket) : {};
}

export const GetProductIDs = () => {
    const basketAmounts = Object.entries(GetAmounts())
    return Object.values(basketAmounts).map(([id]) => id)
}

export const AddToBasketFor = (basketContext : any, productId: number, amount: number = 1, setEffect?: Dispatch<string>) => {
    const [, setBasketAmounts] = basketContext.amounts

    if (setEffect) {
        setEffect('addToBasket')
        setTimeout(() => setEffect(''), 2000)
    }

    setBasketAmounts((prev: AmountsType) => {
        let new_amounts = { ...prev };
        new_amounts[productId] = (new_amounts[productId] ?? 0) + amount;
        localStorage.setItem("basket", JSON.stringify(new_amounts))
        return new_amounts
    })
}

export const FetchProducts = (basketContext) => {
    const [basketProducts, setBasketProducts] = basketContext.products
    const basketAmounts = Object.entries(GetAmounts())
    const productIDs = Object.values(basketAmounts).map(([id]) => id)

    // console.log(productIDs, basketAmounts)

    if (productIDs.length > 0 )
        axios
    .get('http://localhost:4000/api/products/multi/' + productIDs.join(','))
    .then((res) => {
        console.log(res.data)
        setBasketProducts(res.data)
    })
}
