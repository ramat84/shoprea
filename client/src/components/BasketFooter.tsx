import { useState, useEffect, useContext } from "react";
import type { ProductType } from "../interfaces/ProductType";
import { BasketContext } from "../contexts/BasketContext";

export const BasketFooter = ({ button, basketProducts }: { button: any, basketProducts: ProductType[] }) => {
    const [total, setTotal] = useState<number>(0)
    const [basket, setBasket] = useContext(BasketContext)

    useEffect(() => {
        let total = 0;
        basketProducts.forEach((prod: ProductType) => {
            total += prod.price * basket[prod.id]
        })
        setTotal(total)
    }, [basket, basketProducts])

    return <div className="row basket-footer" >
        <div className="image">&nbsp;</div>
        <div className="title">&nbsp;</div>
        <div className="desc">
            {button}
        </div>
        <div className="price">Total:</div>
        <div className="amount">${total}</div>
    </div>
}

