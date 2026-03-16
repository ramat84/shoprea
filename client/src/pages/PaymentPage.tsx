import { ShipmentForm } from '../components/Payment/ShipmentForm'
import { PaymentProducts } from '../components/Payment/Products'

import '../css/pages/payment.css'

export const PaymentPage = () => {
    return (
        <div className="paymentPage">
            <h2>Summary</h2>
            <PaymentProducts />
            <ShipmentForm />
        </div>
    )
}
