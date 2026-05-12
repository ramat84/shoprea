import { ShipmentForm } from '../components/Payment/ShipmentForm'
import { PaymentProducts } from '../components/Payment/Products'

import '../css/pages/payment.css'
import { Subheader } from '../components/Elements/Subheader'

export const PaymentPage = () => {
    return (
        <div className="paymentPage">
            <Subheader title="Summary" />
            <PaymentProducts />
            <ShipmentForm />
        </div>
    )
}
