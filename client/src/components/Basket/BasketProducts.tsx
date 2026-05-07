import type { BasketProductType } from '../../types/Basket.ts'
import { useBasket } from '../../contexts/BasketContext.tsx'
import { Amount } from './Amount.tsx'
import { Price } from '../Price'

export const BasketProducts = ({ allowChange }: { allowChange: boolean }) => {
    const { basketAmounts, basketProducts } = useBasket()

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
        {
            basketProducts.length > 0 &&
                basketProducts.map((product: BasketProductType) => {
                if (!product) return <></>;

                return <div key={product.id} className="row">
                <img className="image" src={product.image} />
                <div className="title">{product.title}</div>
                    <div className="desc">{product.shortDesc}</div>
                    <div className="price">
                        <Price price={product.price} />
                    </div>
                    {allowChange && <Amount e={event} product={product} />}
                    {!allowChange && <div className="amount">✕ {basketAmounts[product.id]}</div>}
                </div>
            })}
    </>
}
