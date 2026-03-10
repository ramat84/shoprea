import { useContext } from 'react'
import { BasketContext } from '../contexts/BasketContext'
import { Shipment } from '../components/Payment/Shipment'
import '../css/pages/payment.css'

export const PaymentPage = () => {
    const basketContext = useContext(BasketContext)
    const [basketTotal, setBasketTotal] = basketContext.total

    return (
        <div className="paymentPage">
            <h2>Summary</h2>
            <h3>Total of: ${basketTotal}</h3>
            <h2>Shippment</h2>
            <Shipment />
            <h2>Payment</h2>
            <img className="paymentOption" src="/assets/paypal.svg" />
        </div>
    )
}
