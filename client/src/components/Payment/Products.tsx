import type { BasketProductType } from '../../types/BasketProductType'
import { useContext } from 'react'
import { BasketContext } from '../../contexts/BasketContext'
import { Price } from '../Price'

export const PaymentProducts = () => {
    const basketContext = useContext(BasketContext)

    const [basketProducts] = basketContext.products
    const [basketAmounts] = basketContext.amounts
    const [basketTotal] = basketContext.total

    return (<>
        <h4>Products: </h4>
        <div className="paymentProducts">
            {basketProducts.length > 0 && basketProducts.map((product: BasketProductType) => (
                <div key={'payprod' + product.id} >
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
