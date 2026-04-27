import { useEffect, useState } from "react";

import type { BasketProductType } from '../types/BasketProductType'
import { Product } from "./Product";
import { GetProductsByCategory } from "../lib/Products";

export const Products = ({ categoryID }: { categoryID: number }) => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        GetProductsByCategory(categoryID, setProducts)
    }, [location.pathname])

    return (
        <div className="products">
            {products.map((prod: BasketProductType) => <Product key={prod.id} product={prod} />)}
        </div>
    )
}
