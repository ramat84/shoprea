import { useEffect, useContext } from "react";
import type { BasketProductType } from "../../types/BasketProductType";
import { BasketContext } from "../../contexts/BasketContext";
import { Price } from "../Price";

export const BasketFooter = () => {
    const basketContext = useContext(BasketContext)
    const [basketAmounts] = basketContext.amounts
    const [basketTotal, setBasketTotal] = basketContext.total
    const [basketProducts] = basketContext.products

    const GetTotal = () => {
        let total = 0

        basketProducts.forEach((prod: BasketProductType) => {
            total += prod.price * basketAmounts[prod.id]
        })

        return total
    }

    useEffect(() => { setBasketTotal(GetTotal()) }, [])
    useEffect(() => { setBasketTotal(GetTotal()) }, [basketContext.products, basketContext.amounts])

    return <div className="row basket-footer" >
        <div className="image">&nbsp;</div>
        <div className="title">&nbsp;</div>
        <div className="desc">&nbsp;</div>
        <div className="price">Total:</div>
        <div className="amount">
            <Price price={basketTotal} />
        </div>
    </div>
}

