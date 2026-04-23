import axios from 'axios';
import type { Dispatch } from 'react';
import type { Product, User } from '../../generated/prisma/client.ts';

export const ProductsOrder = ({ user, setData, newData }: { user: User, setData: Dispatch<[Product]>, newData: [Product] }) => {
    const productsOrder = newData.map(cat => cat.id).join(",")
    if (!productsOrder) return;

    axios.put(`http://localhost:4000/api/products/order/${user.session}/${productsOrder}`)

    setTimeout(() => { setData(newData) }, 340)
}

export const CreateCallback = () => { () => { } }
export const EditCallback = () => { () => { } }
export const DeleteCallback = () => { () => { } }
