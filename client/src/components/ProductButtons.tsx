import type { Dispatch } from 'react'
import type { BasketProductType } from '../types/Basket'
import { Link } from 'react-router'
import { useBasket } from '../contexts/BasketContext'

type ProductButtonsParams = { renderView?: boolean, renderAdd?: boolean, product: BasketProductType, setEffect?: Dispatch<string> }

export const ProductButtons = ({ renderView, renderAdd, product, setEffect }: ProductButtonsParams) => {
    const { AddToBasket } = useBasket()

    if (!product) return <></>

    return <div className="btns center">
        {(renderView ?? true) && <Link className="view btn" to={`/p/${product.id}/${product.title}`}><i>󰈈</i> View</Link>}
        {(renderAdd ?? true) && <button className="action btn" onClick={() => AddToBasket(product.id, 1, setEffect)}><i></i> Add to cart</button>}
    </div>
}
