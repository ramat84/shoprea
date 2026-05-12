import type { BasketProductType } from '../../types/Basket.ts'
import { useBasket } from '../../contexts/BasketContext.tsx'
import { Price } from '../Price'
import { Button } from '../Elements/Button.tsx'
import type { Product } from '../../generated/prisma/client.ts'
import type { ChangeEvent } from 'react'

export const BasketProducts = ({ allowChange }: { allowChange: boolean }) => {
    const { basketAmounts, basketProducts, UpdateBasket, Trash } = useBasket()

    if(basketProducts.length == 0) return <></>;

    const Increment = (product: Product) => {
        UpdateBasket(product.id, basketAmounts[product.id] + 1)
    }

    const Decrement = (product: Product) => {
        UpdateBasket(product.id, basketAmounts[product.id] - 1)
    }

    const ChangeNumber = (e : ChangeEvent<HTMLInputElement>, product : Product) => {
         UpdateBasket(product.id, parseInt(e.target.value))
    }

    return <>
        {
            basketProducts.map((product: BasketProductType) => {
                if (!product) return <></>;

                return <div key={product.id} className="row">
                    <img className="image" src={product.image} />
                    <div className="title">{product.title}</div>
                    <div className="desc">{product.shortDesc}</div>
                    <div className="price">
                        <Price price={product.price} />
                    </div>
                    {allowChange && (
                        <div className="amount">
                            <Button icon='' type='trash' onClick={() => Trash(product.id)}/>
                            <input onChange={(e) => ChangeNumber(e, product)} value={basketAmounts[product.id]} />
                            <Button icon='-' type='action' onClick={() => Decrement(product)}/>
                            <Button icon='+' type='action' onClick={() => Increment(product)}/>
                        </div>
                    )}
                    {!allowChange && <div className="amount">✕ {basketAmounts[product.id]}</div>}
                </div>
            })}
    </>
}
