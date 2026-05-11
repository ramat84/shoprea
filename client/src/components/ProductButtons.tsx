import type { Dispatch } from 'react'
import type { BasketProductType } from '../types/Basket'
import { Link } from 'react-router'
import { useBasket } from '../contexts/BasketContext'
import { Button } from './Elements/Button'

type ProductButtonsParams = { renderView?: boolean, renderAdd?: boolean, product: BasketProductType, setEffect?: Dispatch<string> }

export const ProductButtons = ({ renderView, renderAdd, product, setEffect }: ProductButtonsParams) => {
    const { AddToBasket } = useBasket()

    if (!product) return <></>

    return <div className="btns center">
        {(renderView ?? true) && <Link className="view btn" to={`/p/${product.id}/${product.title}`}><i>󰈈</i> View</Link>}
        {(renderAdd ?? true) && <Button icon="" type="action" onClick={() => AddToBasket(product.id, 1, setEffect)}>Add to cart</Button>}
    </div>
}
