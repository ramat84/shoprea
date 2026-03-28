import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import {
    PayPalProvider,
    PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

import { PaymentProducts } from '../../Payment/Products'

export const Paypal = ({amount} : {amount: number}) => {
    const CheckoutPage = () => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
        const currency = 'USD'

        const onCreateOrder = (data,actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: amount.toString(),
                        },
                    },
                ],
            });
        }

        const onApproveOrder = (data,actions) => {
            return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
            });
        }

        return ( 
            <>
                <h2>Pay with Paypal</h2>
                <h3>Click on the button to open Paypal payment method</h3>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                />
            </>
        )
    }

    const { VITE_PAYPAL_ENV, VITE_PAYPAL_KEY } = import.meta.env

    const initialOptions = {
        "client-id": VITE_PAYPAL_KEY,
        environment: 'sandbox',
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={paypal_options} components={["paypal-payments"]} pageType="checkout">
            <CheckoutPage />
        </PayPalProvider>
    )
}
