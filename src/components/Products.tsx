import axios from "axios";
import { useEffect, useState } from "react";

import type { ProductInterface } from '../interfaces/ProductInterface.ts'
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

    return <div className="products">
        {products.map((prod: ProductInterface) =>
            <Product key={prod.id} id={prod.id} title={prod.title} image={prod.image} shortDesc={prod.shortDesc} price={prod.price} />)}
    </div>
}
