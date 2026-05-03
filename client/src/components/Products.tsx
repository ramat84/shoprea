import { useEffect, useState } from "react";

import { ProductComponent } from "./Product";
import type { Product } from '../generated/prisma/client';
import { GetProductsByCategory } from "../lib/Products";

export const Products = ({ categoryID }: { categoryID: number }) => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        GetProductsByCategory(categoryID, setProducts)
    }, [location.pathname])

    return (
        <div className="products">
            {products.map((prod: Product) => <ProductComponent key={prod.id} product={prod} />)}
        </div>
    )
}
