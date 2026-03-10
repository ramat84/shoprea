import type { ProductType } from '../interfaces/ProductType'
import { useContext, useEffect } from 'react'
import { BasketContext, GetBasket } from '../contexts/BasketContext'
import { Amount } from './Basket/Amount.tsx'

export const BasketProducts = ({ basketProducts, allowChange }: { basketProducts: ProductType[], allowChange: boolean }) => {
    const [basket, setBasket] = useContext(BasketContext)

    const BasketHeader = () => (
        <div className="row">
            <div className="image">Product</div>
            <div className="title">&nbsp;</div>
            <div className="desc">&nbsp;</div>
            <div className="price">Price</div>
            <div className="amount">Amount</div>
        </div>
    )

    return <>
        <BasketHeader />
        {basketProducts.map((product: ProductInterface) => (
            <div key={product.id} className="row">
                <img className="image" src={product.image} />
                <div className="title">{product.title}</div>
                <div className="desc">{product.shortDesc}</div>
                <div className="price">${product.price}</div>
                {allowChange && <Amount event={event} product={product} />}
                {!allowChange && <div className="amount">✕ {basket[product.id]}</div>}
            </div>
        ))}
    </>
}
