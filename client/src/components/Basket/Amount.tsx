import type { AmountsType } from "../../types/Basket.ts";
import type { Product } from "../../../../server/src/generated/prisma/client.ts";
import { useBasket } from "../../contexts/BasketContext";

// import { useLocalStorage } from "../../hooks/useLocalStorage.ts";

export const Amount = ({ product }: { product: Product }) => {
    const { setBasketAmounts, basketAmounts, setBasketProducts } = useBasket()

    const UpdateBasket = (productId: number, amount: number) => {
        if (amount === 0) {
            alert('Click on Trash icon to delete')
            return;
        }

        if (amount < 0 || isNaN(amount)) {
            console.error(`Number can't be ${amount}`)
            return;
        }

        setBasketAmounts((prev: AmountsType) => {
            let new_amounts = { ...prev };
            new_amounts[productId] = amount;

            localStorage.setItem("basket", JSON.stringify(new_amounts))
            return new_amounts
        })

    }

    const Trash = (productID: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return false;

        setBasketAmounts(prev => {
            let new_amounts = { ...prev };
            delete new_amounts[productID]

            localStorage.setItem("basket", JSON.stringify(new_amounts))
            return new_amounts
        })

        setBasketProducts(prev => {
            return prev.filter((product) => { return productID != product.id })
        })
    }

    return (
        <div className="amount">
            <button className="trash" onClick={() => Trash(product.id)}><i></i></button>
            <input onChange={(e) => UpdateBasket(product.id, parseInt(e.target.value))} value={basketAmounts[product.id]} />
            <button onClick={() => UpdateBasket(product.id, basketAmounts[product.id] - 1)}>-</button>
            <button onClick={() => UpdateBasket(product.id, basketAmounts[product.id] + 1)}>+</button>
        </div>
    )
}
