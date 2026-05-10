import { ShipmentForm } from '../components/Payment/ShipmentForm'
import { PaymentProducts } from '../components/Payment/Products'

import '../css/pages/payment.css'

export const PaymentPage = () => {
    return (
        <div className="paymentPage">
            <div className="subheader">
                <h2>Summary</h2>
            </div>
            <PaymentProducts />
            <ShipmentForm />
        </div>
    )
}
