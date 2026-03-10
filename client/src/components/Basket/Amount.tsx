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

        setBasket(prev => {
            let new_basket = { ...prev };
            new_basket.amounts[productId] = amount;

            localStorage.setItem("basket", JSON.stringify(new_basket.amounts))
            return new_basket
        })
    }

    const Trash = (productID: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return false;

        setBasket(prev => {
            let new_basket = { ...prev };
            delete new_basket.amounts[productID]

            new_basket.products = products.filter((product) => { return productID != product.id })

            localStorage.setItem("basket", JSON.stringify(new_basket.amounts))
            return new_basket
        })
    }

    return (
        <div className="amount">
            <button className="trash" onClick={() => Trash(product.id)}><i></i></button>
            <input onChange={() => UpdateBasket(product.id, parseInt(event.data))} value={basket.amounts[product.id]} />
            <button onClick={() => UpdateBasket(product.id, basket.amounts[product.id] - 1)}>-</button>
            <button onClick={() => UpdateBasket(product.id, basket.amounts[product.id] + 1)}>+</button>
        </div>
    )
}
