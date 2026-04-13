import { useState, useEffect, useContext } from "react";
import type { ProductType } from "../interfaces/ProductType";
import { BasketContext } from "../contexts/BasketContext";

export const BasketFooter = ({ button }: { button: any }) => {
    const basketContext = useContext(BasketContext)
    const [basketAmounts, setBasketAmounts] = basketContext.amounts
    const [basketTotal, setBasketTotal] = basketContext.total
    const [basketProducts, setBasketProducts] = basketContext.products

    const GetTotal = () => {
        let total = 0

        basketProducts.forEach((prod: ProductType) => {
            total += prod.price * basketAmounts[prod.id]
        })

        return total
    }

    useEffect(() => { setBasketTotal(GetTotal()) }, [])
    useEffect(() => { setBasketTotal(GetTotal()) }, [basketContext.products, basketContext.amounts])

    return <div className="row basket-footer" >
        <div className="image">&nbsp;</div>
        <div className="title">&nbsp;</div>
        <div className="desc">
            {button}
        </div>
        <div className="price">Total:</div>
        <div className="amount">${basketTotal}</div>
    </div>
}

