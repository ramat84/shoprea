import type { BasketProductType } from '../../types/Basket.ts'
import { useBasket } from '../../contexts/BasketContext.tsx'
import { Price } from '../Price'
import { Button } from '../Elements/Button.tsx'

export const BasketProducts = ({ allowChange, e }: { allowChange: boolean, e: Event }) => {
    const { basketAmounts, basketProducts, UpdateBasket, Trash } = useBasket()

    if(basketProducts.length == 0) return <></>;

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
                            <input onChange={(e) => UpdateBasket(product.id, parseInt(e.target.value))} value={basketAmounts[product.id]} />
                            <Button icon='-' type='action' onClick={() => UpdateBasket(product.id, basketAmounts[product.id] - 1)}/>
                            <Button icon='+' type='action' onClick={() => UpdateBasket(product.id, basketAmounts[product.id] + 1)}/>
                        </div>
                    )}
                    {!allowChange && <div className="amount">✕ {basketAmounts[product.id]}</div>}
                </div>
            })}
    </>
}
