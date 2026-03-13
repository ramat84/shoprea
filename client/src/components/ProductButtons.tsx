import { useContext } from 'react'
import { Link } from 'react-router'
import { BasketContext } from '../contexts/BasketContext'
import '../css/components/buttons.css'
import type { ProductType } from '../types/ProductType'

export const ProductButtons = ({ renderView, renderAdd, product }: { renderView?: boolean, renderAdd?: boolean, product: ProductType }) => {
    const basketContext = useContext(BasketContext)
    const [basketAmounts, setBasketAmounts] = basketContext.amounts

    const AddToBasket = (productId: number, amount: number = 1) => {
        setBasketAmounts(prev => {
            let new_amounts = { ...prev };
            new_amounts[productId] = (new_amounts[productId] ?? 0) + amount;
            localStorage.setItem("basket", JSON.stringify(new_amounts))
            return new_amounts
        })
    }

    return <div className="cta">
        {(renderView ?? true) && <Link to={`/p/${product.id}/${product.title}`} className="btn-view"><i>󰈈</i> View</Link>}
        {(renderAdd ?? true) && <button className="btn-add" onClick={() => AddToBasket(product.id)}><i></i> Add to cart</button>}
    </div>
}

