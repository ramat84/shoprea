import { useContext } from "react"
import { BasketContext } from "../contexts/BasketContext"

export const PaymentPage = () => {
    const basketContext = useContext(BasketContext)
    const [basketTotal, setBasketTotal] = basketContext.total

    return (
        <>
            <h2>Payment</h2>
            <h3>Total of: ${basketTotal}</h3>
            <h2>Shippment</h2>
        </>
    )
}
