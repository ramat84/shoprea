import axios from 'axios';
import type { Product, User } from '../../generated/prisma/client.ts';
import type { Dispatch } from 'react';

export const ProductsOrder = (
    products: [Product],
    setProducts: Dispatch<[Product]>,
    user: User
) => {
    setProducts(products)

    const productsOrder = products.map(prod => prod.id).join(",")
    if (!productsOrder) return;

    axios.put(`http://localhost:4000/api/products/order/${user.session}/${productsOrder}`)
}

