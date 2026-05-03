import axios from 'axios'
import { useState, useEffect, useContext, type ReactNode } from 'react'

import { Checkout } from './Checkout'
import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketFooter } from '../components/Basket/BasketFooter';

import '../css/pages/basket.css'
import { ModalContext } from '../contexts/ModalContext'
import { ModalComponent } from '../components/ModalComponent';

import { useBasket } from '../contexts/BasketContext';

export const BasketPage = () => {
    const { setBasketProducts, basketTotal, GetAmounts } = useBasket()

    useEffect(() => {
        const basketAmounts = Object.entries(GetAmounts())
        const productIDs = Object.values(basketAmounts).map(([id]) => id)

        if (productIDs.length > 0)
            axios
                .get('http://localhost:4000/api/products/multi/' + productIDs.join(','))
                .then((res) => {
                    setBasketProducts(res.data)
                })
    }, [])

    const modalState = useState<ReactNode>(false)
    const setModalContent = modalState[1]

    return (
        <ModalContext.Provider value={modalState}>
            <h2>Cart</h2>
            <div className="basketPage">
                <div className="basketProducts">
                    <BasketProducts allowChange={true} />

                    <BasketFooter />
                    {
                        basketTotal > 0 &&
                        <button className="btn next" onClick={() => setModalContent(<Checkout />)}>
                            <i></i> Continue to Checkout
                        </button>
                    }
                </div>
            </div>

            <ModalComponent />
        </ModalContext.Provider>
    )
}

export default BasketPage
