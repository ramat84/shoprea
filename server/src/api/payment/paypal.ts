export const Connect = () => {
    require('dotenv').config();

    import { Client, Environment, LogLevel } from '@paypal/paypal-server-sdk';

    const client = new Client({
        clientCredentialsAuthCredentials: {
            oAuthClientId: process.env.PAYPAL_CLIENT,
            oAuthClientSecret: process.env.PAYPAL_SECRET
        },
    });
}
