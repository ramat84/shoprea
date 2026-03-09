import type { ProductType } from '../interfaces/ProductType'
import { useContext, useEffect } from 'react'
import { BasketContext, GetBasket } from '../contexts/BasketContext'
import { BasketFooter } from './BasketFooter'

export const BasketProducts = ({ basketProducts, allowChange }: { basketProducts: ProductType[], allowChange: boolean }) => {
    const [basket, setBasket] = useContext(BasketContext)

    const BasketAmount = ({ event, product, basket }: { event: any, product: ProductType, basket: any }) => (
        <div className="amount">
            <button className="trash" onClick={() => Trash(product.id)}><i></i></button>
            <input onChange={() => UpdateBasket(product.id, parseInt(event.data))} value={basket[product.id]} />
            <button onClick={() => UpdateBasket(product.id, basket[product.id] - 1)}>-</button>
            <button onClick={() => UpdateBasket(product.id, basket[product.id] + 1)}>+</button>
        </div>
    )

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

    const Trash = (productID: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return false;
        let new_basket = { ...basket };
        delete new_basket[productID]

        let new_products = [...basketProducts];
        new_products = new_products.filter((product) => { return productID != product.id })

        localStorage.setItem("basket", JSON.stringify(new_basket))

        setProducts(new_products)
        setBasket(new_basket)
    }

    const BasketHeader = () => (
        <div className="row">
            <div className="image">Product</div>
            <div className="title">&nbsp;</div>
            <div className="desc">&nbsp;</div>
            <div className="price">Price</div>
            <div className="amount">Amount</div>
        </div>
    )

    return <>
        <BasketHeader />
        {basketProducts.map((product: ProductInterface) => (
            <div key={product.id} className="row">
                <img className="image" src={product.image} />
                <div className="title">{product.title}</div>
                <div className="desc">{product.shortDesc}</div>
                <div className="price">${product.price}</div>
                {allowChange && <BasketAmount event={event} product={product} basket={basket} />}
                {!allowChange && <div className="amount">✕ {basket[product.id]}</div>}
            </div>
        ))}
    </>
}
