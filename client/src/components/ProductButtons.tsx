import { useContext } from 'react'
import { Link } from 'react-router'
import { BasketContext, type AmountsType } from '../contexts/BasketContext'
import '../css/components/buttons.css'
import type { BasketProductType } from '../types/BasketProductType'

export const ProductButtons = ({ renderView, renderAdd, product }: { renderView?: boolean, renderAdd?: boolean, product: BasketProductType }) => {
    const basketContext = useContext(BasketContext)
    const [, setBasketAmounts] = basketContext.amounts

    const AddToBasket = (productId: number, amount: number = 1) => {
        setBasketAmounts((prev: BasketProductType) => {
            let new_amounts: AmountsType = { ...prev };
            new_amounts[productId] = (new_amounts[productId] ?? 0) + amount;
            localStorage.setItem("basket", JSON.stringify(new_amounts))
            return new_amounts
        })
    }

    if (!product) return <></>

    return <div className="cta">
        {(renderView ?? true) && <Link to={`/p/${product.id}/${product.title}`} className="btn-view"><i>󰈈</i> View</Link>}
        {(renderAdd ?? true) && <button className="btn-add" onClick={() => AddToBasket(product.id)}><i></i> Add to cart</button>}
    </div>
}

