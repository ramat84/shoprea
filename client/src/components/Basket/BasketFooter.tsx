import { Price } from "../Price";
import { useBasket } from "../../contexts/BasketContext";

export const BasketFooter = () => {
    const { basketTotal } = useBasket()

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

