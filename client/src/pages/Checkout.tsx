import { useState } from 'react'

import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketFooter } from '../components/Basket/BasketFooter'
import { useModal } from '../contexts/ModalContext'
import { PaymentPage } from '../pages/PaymentPage'

export const Checkout = () => {
    const { ModalPortal } = useModal()
    const [showPayment, setShowPayment] = useState(false)

    return (
        <div className="modal-wrapper">
            <h2>Checkout</h2>
            <div className="basketProducts">
                <BasketProducts allowChange={false} />
                <BasketFooter />
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

