import { useState } from 'react';
import { Checkout } from './Checkout'
import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketFooter } from '../components/Basket/BasketFooter';

import { useModal } from '../contexts/ModalContext'

import { useBasket } from '../contexts/BasketContext';

import '../css/pages/basket.css'

export const BasketPage = () => {
    const { basketTotal, basketProducts } = useBasket()
    const { ModalPortal } = useModal()
    const [showPopup, setPopup] = useState(false)

    const BasketContents = () => {
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

    return (
        <>
            <h2>Cart</h2>
            <div className="basketPage page-contents">
                {basketProducts.length > 0 && <BasketContents />}
                {basketProducts.length == 0 && <div className="basket-empty"><i>󰄑</i> Your cart is empty</div>}
            </div>
        </>
    )
}

export default BasketPage
