import type { BasketProductType } from '../../types/Basket.ts'
import { useBasket } from '../../contexts/BasketContext.tsx'
import { Amount } from './Amount.tsx'
import { Price } from '../Price'

export const BasketProducts = ({ allowChange }: { allowChange: boolean }) => {
    const { basketAmounts, basketProducts } = useBasket()

    return <>
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
