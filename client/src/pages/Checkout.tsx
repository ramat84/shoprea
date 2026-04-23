import { useContext } from 'react'

import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketFooter } from '../components/Basket/BasketFooter'
import { ModalContext } from '../contexts/ModalContext'
import { PaymentPage } from '../pages/PaymentPage'

export const Checkout = () => {
    const [, setModalContent] = useContext(ModalContext)

    return (
        <div className="modal-wrapper">
            <h2>Checkout</h2>
            <div className="basketProducts">
                <BasketProducts allowChange={false} />
                <BasketFooter />
            </div>
            <div className="ModalBottom">
                <button className="btn btn-payment next" onClick={() => setModalContent(<PaymentPage />)}>
                    <i></i> Continue to Payment
                </button>
            </div>
        </div>
    )
}

