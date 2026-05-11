import { Price } from "../Price";
import { useBasket } from "../../contexts/BasketContext";

export const BasketTotal = () => {
    const { basketTotal, basketAmounts } = useBasket()

    return <div className="row basket-total" >
        <div className="image">&nbsp;</div>
        <div className="title">&nbsp;</div>
        <div className="desc ta-right">Total:</div>
        <div className="price">
            <Price price={basketTotal} />
        </div>
        <div className="amount">{Object.values(basketAmounts).reduce((sum,val) => sum + val)} products</div>
    </div>
}

