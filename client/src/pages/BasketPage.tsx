import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import type { ProductType } from '../interfaces/ProductType.js'

import { Header } from '../components/Header'
import { Checkout } from './Checkout'
import { BasketContext, GetBasket } from '../contexts/BasketContext'
import { BasketProducts } from '../components/BasketProducts'
import { BasketFooter } from '../components/BasketFooter';

import '../css/pages/basket.css'
import { ModalContext } from '../contexts/ModalContext'

export const BasketPage = () => {
    const [basketProducts, setBasketProducts] = useState<ProductType[]>([])

    useEffect(() => {
        const basketEntries = Object.entries(GetBasket())
        const productIDs = Object.values(basketEntries).map(([id]) => id)

        if (productIDs.length > 0)
            axios
                .get('http://localhost:4000/api/products/multi/' + productIDs.join(','))
                .then((res) => {
                    setBasketProducts(res.data)
                })
    }, [])

    const modalState = useState<boolean>(false)
    const setModalIsOpen = modalState[1]

    const btnNext = (
        <button className="btn next" onClick={() => setModalIsOpen(true)}>
            <i></i> Continue to Checkout
        </button>
    )

    return (
        <ModalContext.Provider value={modalState}>
            <Header />
            <h2>Basket</h2>
            <div className="basketPage">
                <div className="basketProducts">
                    <BasketProducts basketProducts={basketProducts} allowChange={true} />
                    <BasketFooter button={btnNext} basketProducts={basketProducts} />
                </div>
            </div>
            <Checkout basketProducts={basketProducts} />
        </ModalContext.Provider>
    )
}
