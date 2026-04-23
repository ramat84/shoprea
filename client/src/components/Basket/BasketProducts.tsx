import type { ProductType } from '../../types/ProductType.ts'
import { useContext } from 'react'
import { BasketContext } from '../../contexts/BasketContext.tsx'
import { Amount } from './Amount.tsx'
import { Price } from '../Price'

export const BasketProducts = ({ allowChange }: { allowChange: boolean }) => {
    const basketContext = useContext(BasketContext)

    const [basketProducts] = basketContext.products
    const [basketAmounts] = basketContext.amounts

    const BasketHeader = () => (
        <div key="basket-header" className="row">
            <div className="image">Product</div>
            <div className="title">&nbsp;</div>
            <div className="desc">&nbsp;</div>
            <div className="price">Price</div>
            <div className="amount">Amount</div>
        </div>
    )

    return <>
        <BasketHeader />
        {basketProducts.length > 0 && basketProducts.map((product: ProductType) => (
            <div key={product.id} className="row">
                <img className="image" src={product.image} />
                <div className="title">{product.title}</div>
                <div className="desc">{product.shortDesc}</div>
                <div className="price">
                    <Price price={product.price} />
                </div>
                {allowChange && <Amount e={event} product={product} />}
                {!allowChange && <div className="amount">✕ {basketAmounts[product.id]}</div>}
            </div>
        ))}
    </>
}
