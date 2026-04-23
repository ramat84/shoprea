import { useEffect, useState } from "react";

import type { ProductType } from '../types/ProductType'
import { Product } from "./Product";
import { GetProductsByCategory } from "../lib/Products";

export const Products = ({ categoryID }: { categoryID: number }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        GetProductsByCategory(categoryID, setProducts)
    }, [location.pathname])

    return (
        <div className="products">
            {products.map((prod: ProductType) => <Product key={prod.id} product={prod} />)}
        </div>
    )
}
