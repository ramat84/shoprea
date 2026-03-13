import axios from "axios";
import { useEffect, useState } from "react";

import type { ProductType } from '../types/ProductType'
import { Product } from "./Product";

export const Products = ({ categoryID }: { categoryID: number }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let url = 'http://localhost:4000/api/products'
        if (categoryID ?? 0 > 0) url += '/' + categoryID;

        axios.get(url).then((res) => {
            setProducts(res.data)
        })
    }, [location.pathname])

    return (
        <div className="products">
            {products.map((prod: ProductType) => <Product key={prod.id} product={prod} />)}
        </div>
    )
}
