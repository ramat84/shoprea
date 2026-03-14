import type { ProductType } from '../../types/ProductType'
import { useContext, useEffect } from 'react'
import { BasketContext } from '../../contexts/BasketContext'
import { Price } from '../Price'

export const PaymentProducts = () => {
    const basketContext = useContext(BasketContext)

    const [basketProducts, setBasketProducts] = basketContext.products
    const [basketAmounts, setBasketAmounts] = basketContext.amounts
    const [basketTotal, setBasketTotal] = basketContext.total

    return (<>
        <h4>Products: </h4>
        <div className="paymentProducts">
            {basketProducts.length > 0 && basketProducts.map((product: ProductType) => (
                <div key={product.id} >
                    {product.title}
                    <span>
                        <Price price={product.price} />
                        &nbsp;✕ {basketAmounts[product.id]}
                    </span></div>
            ))}
            <div className="paymentTotal">
                Total
                <span><Price price={basketTotal} /></span>
            </div>
        </div>
    </>)
}
