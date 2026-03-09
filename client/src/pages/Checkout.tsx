import { useContext } from 'react';

import { BasketProducts } from '../components/BasketProducts';
import { BasketFooter } from '../components/BasketFooter';
import type { ProductType } from '../interfaces/ProductType';
import { ModalComponent } from '../components/ModalComponent';
import { ModalContext } from '../contexts/ModalContext';

export const Checkout = ({ basketProducts }: { basketProducts: ProductType[] }) => {
    const [modalIsOpen, setModalIsOpen] = useContext(ModalContext)

    const btnPayment = (
        <button className="btn next" onClick={() => setModalIsOpen(true)}>
            <i></i> Continue to Payment
        </button>
    )


    const content = <>
        <button className="modal-close" onClick={() => setModalIsOpen(false)}>x</button>
        <h2>Checkout</h2>
        <div className="basketProducts">
            <BasketProducts basketProducts={basketProducts} allowChange={false} />
            <BasketFooter button={btnPayment} basketProducts={basketProducts} />
        </div>
    </>

    return ModalComponent(content)
}

