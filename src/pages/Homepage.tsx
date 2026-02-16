import { useEffect, useState } from "react"
import axios from "axios"
import { Product } from '../components/Product'

import '../css/components/products.css'

export const Homepage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/products`)
            .then((res) => {
                setProducts(res.data)
            })
    }, [])

    return <>
        <h2>All Products</h2>
        <div className="products">
            {products.map((prod) => <Product title={prod.title} image={prod.image} shortDesc={prod.shortDesc} price={prod.price} />)}
        </div>
    </>
}
