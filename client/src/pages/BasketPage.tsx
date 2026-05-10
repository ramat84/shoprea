import { useEffect, useState } from 'react';
import { Checkout } from './Checkout'
import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketTotal } from '../components/Basket/BasketTotal';

import { useModal } from '../contexts/ModalContext'
import { useBasket } from '../contexts/BasketContext';

import '../css/pages/basket.css'
import { Link } from 'react-router';
import { BasketHeader } from '../components/Basket/BasketHeader';

export const BasketPage = () => {
    const { basketTotal, basketProducts, GetBasketProducts } = useBasket()
    const { ModalPortal } = useModal()
    const [showPopup, setPopup] = useState(false)

    useEffect( GetBasketProducts, [])

    const BasketContents = () => {
        return (
            <>
                <div className="basketProducts">
                    <BasketHeader />
                    <BasketTotal />
                    <BasketProducts allowChange={true} />
                </div>

                <ModalPortal isOpen={showPopup} setIsOpen={setPopup}>
                    <Checkout />
                </ModalPortal>
            </>
        )
    }

    return (
        <>
            <div className="subheader">
                <h2>Cart</h2>
                {basketProducts.length == 0 && <Link to="/" className='action btn'>Continue Shopping</Link>}
                {basketProducts.length > 0 && (
                    <button className="btn view" onClick={() => setPopup(true)}>
                        <i></i> Continue to Checkout
                    </button>
                )}
            </div>
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
