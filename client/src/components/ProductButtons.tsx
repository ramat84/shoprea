import type { Dispatch } from 'react'
import { Link } from 'react-router'

import { useBasket } from '../contexts/BasketContext'
import type { AmountsType } from '../types/Basket'

import '../css/components/buttons.css'
import type { BasketProductType } from '../types/Basket'

type ProductButtonsParams = { renderView?: boolean, renderAdd?: boolean, product: BasketProductType, setEffect?: Dispatch<string> }

export const ProductButtons = ({ renderView, renderAdd, product, setEffect }: ProductButtonsParams) => {
    const { setBasketAmounts } = useBasket()

    const AddToBasket = (productId: number, amount: number = 1) => {
        if (setEffect) {
            setEffect('addToBasket')
            setTimeout(() => setEffect(''), 2000)
        }

        setBasketAmounts((prev: AmountsType) => {
            let new_amounts = { ...prev };
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
