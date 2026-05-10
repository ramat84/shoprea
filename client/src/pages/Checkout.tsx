import { useState } from 'react'

import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketTotal } from '../components/Basket/BasketTotal'
import { useModal } from '../contexts/ModalContext'
import { PaymentPage } from '../pages/PaymentPage'

export const Checkout = () => {
    const { ModalPortal } = useModal()
    const [showPayment, setShowPayment] = useState(false)

    return (
        <div className="modal-wrapper">
            <div className="subheader">
                <h2>Checkout</h2>
            </div>
            <div className="basketProducts">
                <BasketTotal />
                <BasketProducts allowChange={false} />
            </div>
            <div className="ModalBottom">
                <button className="btn btn-payment next" onClick={() => setShowPayment(true)}>
                    <i></i> Continue to Payment
                </button>
            </div>

            <ModalPortal isOpen={showPayment} setIsOpen={setShowPayment}>
                <PaymentPage />
            </ModalPortal>
        </div>
    )
}

