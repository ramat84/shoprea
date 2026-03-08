import { useContext } from 'react';

import { BasketProducts } from '../components/BasketProducts';
import { BasketFooter } from '../components/BasketFooter';
import type { ProductType } from '../interfaces/ProductType';
import { ModalComponent } from '../components/ModalComponent';
import { ModalContext } from '../contexts/ModalContext';

export const Checkout = ({ products }: { products: ProductType[] }) => {
    const [modalIsOpen, setModalIsOpen] = useContext(ModalContext)

    const content = <>
        <button className="modal-close" onClick={() => setModalIsOpen(false)}>x</button>
        <h2>Checkout</h2>
        <div className="basketProducts">
            <BasketProducts products={products} allowChange={false} />
            <BasketFooter showNextButton={false} products={products} />
        </div>
    </>

    return ModalComponent(content)
}

