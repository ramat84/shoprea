import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { GetBasket } from '../contexts/BasketContext'
import type { ProductInterface } from '../interfaces/ProductInterface'

import '../css/pages/basket.css'

export const BasketPage = () => {
    const basketEntries = Object.entries(GetBasket())
    const productIDs = Object.values(basketEntries).map(([id]) => id)
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/products/multi/' + productIDs.join(','))
            .then((res) => {
                let products = res.data.map((prod) => {
                    basketEntries.forEach(([entryProdID, entryAmount]) => {
                        if (entryProdID == prod.id)
                            prod.amount = entryAmount;
                    })
                    return prod
                })
                setProducts(products)
            })
    }, [])

    return <>
        <Header />
        <h2>Basket</h2>
        <div className="basketPage">
            <div className="row">
                <div className="image">Image</div>
                <div className="title">Title</div>
                <div className="price">Price</div>
                <div className="amount">Amount</div>
            </div>
            {products.map((product: ProductInterface) => (
                <div key={product.id} className="row">
                    <img className="image" src={product.image} />
                    <div className="title">{product.title}</div>
                    <div className="price">${product.price}</div>
                    <div className="amount">{product.amount}</div>
                </div>
            ))}
        </div>
    </>
}
