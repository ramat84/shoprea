import { useContext } from 'react';

import { BasketProducts } from '../components/BasketProducts';
import { BasketFooter } from '../components/BasketFooter';
import type { ProductType } from '../interfaces/ProductType';
import { ModalContext } from '../contexts/ModalContext';

export const Checkout = ({ basketProducts }: { basketProducts: ProductType[] }) => {
    const [modalContent, setModalContent] = useContext(ModalContext)

    const btnPayment = (
        <button className="btn btn-payment next" onClick={() => setModalContent(<h2>Payment</h2>)}>
            <i></i> Continue to Payment
        </button>
    )

    return (
        <>
            <button className="modal-close" onClick={() => setModalContent(false)}>x</button>
            <h2>Checkout</h2>
            <div className="basketProducts">
                <BasketProducts basketProducts={basketProducts} allowChange={false} />
                <BasketFooter button={btnPayment} basketProducts={basketProducts} />
            </div>
        </>
    )
}

