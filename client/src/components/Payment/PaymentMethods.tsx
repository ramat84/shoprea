import { useState } from "react"

export const PaymentMethods = () => {
    const [, setPayType] = useState<string>('')

    return (
        <>
            <h2>Pay with</h2>
            <button onClick={() => setPayType('cash')}><img className="paymentOption" src="/assets/cash.png" /></button>
            <button className="disabled" onClick={() => setPayType('paypal')}><img className="paymentOption" src="/assets/paypal.svg" /></button>
            <button className="disabled"><img className="paymentOption" src="/assets/stripe.svg" /></button>
            <button className="disabled"><img className="paymentOption" src="/assets/googlepay.svg" /></button>
        </>
    )
}
