import { ShipmentForm } from '../components/Payment/ShipmentForm'
import { PaymentProducts } from '../components/Payment/Products'

import '../css/pages/payment.css'

export const PaymentPage = () => {
    return (
        <div className="paymentPage">
            <h2>Summary</h2>
            <PaymentProducts />
            <ShipmentForm />
            <h2>Pay with</h2>
            <img className="paymentOption" src="/assets/paypal.svg" />
            <img className="paymentOption" src="/assets/stripe.svg" />
            <img className="paymentOption" src="/assets/googlepay.svg" />
        </div>
    )
}
