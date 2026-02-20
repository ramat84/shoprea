import { useContext } from 'react'
import { BasketContext } from '../contexts/BasketContext'
import '../css/components/buttons.css'

export const ProductButtons = ({ renderView, renderAdd, productID }: { renderView?: boolean, renderAdd?: boolean, productID: number }) => {


    const [basket, setBasket] = useContext(BasketContext)

    const AddToBasket = (productId: number, amount: number = 1) => {
        let new_basket = { ...basket };
        new_basket[productId] = (basket[productId] ?? 0) + amount;
        localStorage.setItem("basket", JSON.stringify(new_basket))
        setBasket(new_basket)
    }

    return <div className="cta">
        {(renderView ?? true) && <button className="btn-view"><i>󰈈</i> View</button>}
        {(renderAdd ?? true) && <button className="btn-add" onClick={() => AddToBasket(productID)}><i></i> Add to cart</button>}
    </div>
}

