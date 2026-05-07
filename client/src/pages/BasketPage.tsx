import { useEffect, useState } from 'react';
import { Checkout } from './Checkout'
import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketFooter } from '../components/Basket/BasketFooter';

import { useModal } from '../contexts/ModalContext'
import { useBasket } from '../contexts/BasketContext';

import '../css/pages/basket.css'
import { Link } from 'react-router';

export const BasketPage = () => {
    const { basketTotal, basketProducts, GetBasketProducts } = useBasket()
    const { ModalPortal } = useModal()
    const [showPopup, setPopup] = useState(false)

    useEffect( GetBasketProducts, [])

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
            <div className="page-contents">
                {basketProducts.length > 0 && (
                    <div className="basketPage page-contents">
                        <BasketContents />
                    </div>
                )}
                {basketProducts.length == 0 && (
                    <div className="basket-empty-container">
                        <div className="basket-empty">
                            <i>󰄑</i>
                            Your cart is empty
                        </div>
                        <div className='center-text'>
                            <Link to="/" className='action btn'>Continue Shopping</Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BasketPage
