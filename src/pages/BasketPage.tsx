import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Header } from '../components/Header'
import { BasketContext, GetBasket } from '../contexts/BasketContext'
import type { ProductInterface } from '../interfaces/ProductInterface'

import '../css/pages/basket.css'

export const BasketPage = () => {
    const [products, setProducts] = useState([])
    const [basket, setBasket] = useContext(BasketContext)

    const basketEntries = Object.entries(GetBasket())
    const productIDs = Object.values(basketEntries).map(([id]) => id)

    useEffect(() => {
        if (productIDs.length > 0)
            axios
                .get('http://localhost:4000/api/products/multi/' + productIDs.join(','))
                .then((res) => {
                    setProducts(res.data)
                })
    }, [])

    const UpdateBasket = (productId: number, amount: number) => {
        if (amount === 0) {
            alert('Click on Trash icon to delete')
            return;
        }

        if (amount < 0 || isNaN(amount)) {
            console.error(`Number can't be ${amount}`)
            return;
        }

        let new_basket = { ...basket };
        new_basket[productId] = amount;

        localStorage.setItem("basket", JSON.stringify(new_basket))
        setBasket(new_basket)
    }

    function Trash(productID: number) {
        if (!confirm('Are you sure you want to delete this product?')) return false;
        let new_basket = { ...basket };
        delete new_basket[productID]

        let new_products = [...products];
        new_products = new_products.filter((product) => { return productID != product.id })

        localStorage.setItem("basket", JSON.stringify(new_basket))

        setProducts(new_products)
        setBasket(new_basket)
    }

    return <>
        <Header />
        <h2>Basket</h2>
        <div className="basketPage">
            <div className="row">
                <div className="image">Product</div>
                <div className="title">&nbsp;</div>
                <div className="desc">&nbsp;</div>
                <div className="price">Price</div>
                <div className="amount">Amount</div>
            </div>
            {products.map((product: ProductInterface) => (
                <div key={product.id} className="row">
                    <img className="image" src={product.image} />
                    <div className="title">{product.title}</div>
                    <div className="desc">{product.shortDesc}</div>
                    <div className="price">${product.price}</div>
                    <div className="amount row">
                        <button onClick={() => Trash(product.id)}><i></i></button>
                        <input onChange={() => UpdateBasket(product.id, parseInt(event.data))} value={basket[product.id]} />
                        <button onClick={() => UpdateBasket(product.id, basket[product.id] - 1)}>-</button>
                        <button onClick={() => UpdateBasket(product.id, basket[product.id] + 1)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    </>
}
