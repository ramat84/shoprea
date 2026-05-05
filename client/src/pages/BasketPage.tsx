import { useState } from 'react';
import { Checkout } from './Checkout'
import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketFooter } from '../components/Basket/BasketFooter';

import { useModal } from '../contexts/ModalContext'

import { useBasket } from '../contexts/BasketContext';

import '../css/pages/basket.css'

const BasketContents = () => {
    const { basketTotal } = useBasket()
    const { ModalPortal } = useModal()
    const [showPopup, setPopup] = useState(false)

    return (
        <>
            <div className="basketProducts">
                <BasketProducts allowChange={true} />
                <BasketFooter />
                {
                    basketTotal > 0 &&
                    <button className="btn next" onClick={() => setPopup(true)}>
                        <i></i> Continue to Checkout
                    </button>
                }
            </div>

            <ModalPortal isOpen={showPopup} setIsOpen={setPopup}>
                <Checkout />
            </ModalPortal>
        </>
    )
}

export const BasketPage = () => {
    return (
        <>
            <h2>Cart</h2>
            <div className="basketPage">
                <BasketContents />
            </div>
        </>
    )
}

export default BasketPage
