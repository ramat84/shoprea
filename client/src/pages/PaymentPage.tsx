import { useContext } from 'react'
import { BasketContext } from '../contexts/BasketContext'
import { Shipment } from '../components/Payment/Shipment'
import { PaymentProducts } from '../components/Payment/Products'

import '../css/pages/payment.css'

export const PaymentPage = () => {

    return (
        <div className="paymentPage">
            <h2>Summary</h2>
            <h4>Products: </h4>
            <PaymentProducts />
            <h2>Shippment details</h2>
            <Shipment />
            <h2>Pay with</h2>
            <img className="paymentOption" src="/assets/paypal.svg" />
            <img className="paymentOption" src="/assets/stripe.svg" />
            <img className="paymentOption" src="/assets/googlepay.svg" />
        </div>
    )
}
