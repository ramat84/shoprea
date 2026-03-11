import type { ProductType } from '../../interfaces/ProductType'
import { useContext, useEffect } from 'react'
import { BasketContext } from '../../contexts/BasketContext'

export const PaymentProducts = () => {
    const basketContext = useContext(BasketContext)

    const [basketProducts, setBasketProducts] = basketContext.products
    const [basketAmounts, setBasketAmounts] = basketContext.amounts
    const [basketTotal, setBasketTotal] = basketContext.total

    return <div className="paymentProducts">
        {basketProducts.length > 0 && basketProducts.map((product: ProductType) => (
            <div>{product.title} <span>${product.price} ✕ {basketAmounts[product.id]}</span></div>
        ))}
        <div className="paymentTotal">Total <span>${basketTotal}</span></div>
    </div>
}
