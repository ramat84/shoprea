import { useContext } from 'react'
import { Link } from 'react-router'
import { BasketContext } from '../contexts/BasketContext'
import '../css/components/buttons.css'
import type { ProductInterface } from '../interfaces/ProductInterface'

export const ProductButtons = ({ renderView, renderAdd, product }: { renderView?: boolean, renderAdd?: boolean, product: ProductInterface }) => {


    const [basket, setBasket] = useContext(BasketContext)

    const AddToBasket = (productId: number, amount: number = 1) => {
        let new_basket = { ...basket };
        new_basket[productId] = (basket[productId] ?? 0) + amount;
        localStorage.setItem("basket", JSON.stringify(new_basket))
        setBasket(new_basket)
    }

    return <div className="cta">
        {(renderView ?? true) && <Link to={`/p/${product.id}/${product.title}`} className="btn-view"><i>󰈈</i> View</Link>}
        {(renderAdd ?? true) && <button className="btn-add" onClick={() => AddToBasket(product.id)}><i></i> Add to cart</button>}
    </div>
}

