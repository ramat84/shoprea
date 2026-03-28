import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

import { Header } from '../components/Header'
import { Checkout } from './Checkout'
import { BasketContext, GetAmounts } from '../contexts/BasketContext'
import { BasketProducts } from '../components/Basket/BasketProducts'
import { BasketFooter } from '../components/Basket/BasketFooter';

import '../css/pages/basket.css'
import { ModalContext } from '../contexts/ModalContext'
import { ModalComponent } from '../components/ModalComponent';

export const BasketPage = () => {
    const basketContext = useContext(BasketContext)
    const [basketProducts, setBasketProducts] = basketContext.products
    const [basketTotal, setBasketTotal] = basketContext.total


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

    const modalState = useState(false)
    const setModalContent = modalState[1]

    return (
        <ModalContext.Provider value={modalState}>
            <Header />
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
