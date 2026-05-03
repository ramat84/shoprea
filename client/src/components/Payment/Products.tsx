import type { BasketProductType } from '../../types/Basket'
import { Price } from '../Price'
import { useBasket } from '../../contexts/BasketContext'

export const PaymentProducts = () => {
    const { basketProducts, basketAmounts, basketTotal } = useBasket()

    return (<>
        <h4>Products: </h4>
        <div className="paymentProducts">
            {basketProducts.length > 0 && basketProducts.map((product: BasketProductType) => {
                if (!product) return <></>;

                return <div key={'payprod' + product.id} >
                    {product.title}
                    <span>
                        <Price price={product.price} />
                        &nbsp;✕ {basketAmounts[product.id]}
                    </span></div>
            })}
            <div className="paymentTotal">
                Total
                <span><Price price={basketTotal} /></span>
            </div>
        </div>
    </>)
}
