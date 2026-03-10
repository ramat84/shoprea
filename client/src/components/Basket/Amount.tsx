import { useContext } from "react"
import { BasketContext } from "../../contexts/BasketContext"
import type { ProductType } from "../../interfaces/ProductType"

export const Amount = ({ event, product }: { event: any, product: ProductType }) => {
    const [basket, setBasket] = useContext(BasketContext)

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

    return (
        <div className="amount">
            <button className="trash" onClick={() => Trash(product.id)}><i></i></button>
            <input onChange={() => UpdateBasket(product.id, parseInt(event.data))} value={basket[product.id]} />
            <button onClick={() => UpdateBasket(product.id, basket[product.id] - 1)}>-</button>
            <button onClick={() => UpdateBasket(product.id, basket[product.id] + 1)}>+</button>
        </div>
    )
}
