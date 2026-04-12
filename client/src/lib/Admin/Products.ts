import axios from 'axios';
import type { Product, User } from '../../generated/prisma/client.ts';

export const ProductsOrder = (user: User, oldproducts: [Product], setProducts, products: [Product]) => {
    const productsOrder = products.map(cat => cat.id).join(",")
    if (!productsOrder) return;

    axios.put(`http://localhost:4000/api/products/order/${user.session}/${productsOrder}`)

    setTimeout(() => { setProducts(products) }, 340)
}

export const CreateCallback = () => { () => { } }
export const EditCallback = () => { () => { } }
export const DeleteCallback = () => { () => { } }
