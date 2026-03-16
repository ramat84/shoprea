import {
    PayPalProvider,
    PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

import { PaymentProducts } from '../../Payment/Products'

export const Paypal = () => {
    const CheckoutPage = () => (
        <>
            <h2>Pay with Paypal</h2>
            <h3>Click on the button to open Paypal payment method</h3>

            <PayPalOneTimePaymentButton
                createOrder={async () => {
                    const response = await fetch("/api/create-order", {
                        method: "POST",
                    });
                    const { orderId } = await response.json();
                    return { orderId };
                }}
                onApprove={async ({ orderId }: OnApproveDataOneTimePayments) => {
                    await fetch(`/api/capture-order/${orderId}`, {
                        method: "POST",
                    });
                    console.log("Payment captured!");
                }}
            />

            <PaymentProducts />
        </>
    )

    return (
        <PayPalProvider environment="sandbox" clientId="your-client-id" components={["paypal-payments"]} pageType="checkout">
            <CheckoutPage />
        </PayPalProvider>
    )
}
