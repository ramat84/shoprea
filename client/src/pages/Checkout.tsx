import { useContext } from 'react';

import { BasketProducts } from '../components/BasketProducts';
import { BasketFooter } from '../components/BasketFooter';
import { ModalContext } from '../contexts/ModalContext';

export const Checkout = () => {
    const [modalContent, setModalContent] = useContext(ModalContext)

    const btnPayment = (
        <button className="btn btn-payment next" onClick={() => setModalContent(<h2>Payment</h2>)}>
            <i></i> Continue to Payment
        </button>
    )

    return (
        <>
            <h2>Checkout</h2>
            <div className="basketProducts">
                <BasketProducts allowChange={false} />
                <BasketFooter button={btnPayment} />
            </div>
        </>
    )
}

