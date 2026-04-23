import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router'

import axios from 'axios'
import { ProductButtons } from '../components/ProductButtons'
import { Products } from '../components/Products'
import { Price } from '../components/Price'

import '../css/pages/product.css'

import type { Product } from "../generated/prisma/client.ts"

export const ProductPage = () => {
    const [product, setProduct] = useState<Product>({})
    const [categoryID, setCategoryID] = useState<number>(0)

    const productID = useParams().id

    const LoadProduct = () => {
        axios.get('http://localhost:4000/api/product/' + productID)
            .then((res) => {
                setCategoryID(res.data.categories[0])
                setProduct(res.data)
            })
    }

    useEffect(LoadProduct, [])
    useEffect(LoadProduct, [location.pathname])

    return <>
        <div className='productPage'>
            <h2>{product.title}</h2>
            <Link className="product-image" to={`/p/${product.id}/${product.title}`}>
                <img loading="lazy" src={product.image} />
            </Link>
            <p>
                {product.description}
                <span className="price">
                    <Price price={product.price} />
                </span>
            </p>
            <ProductButtons renderView={false} product={product} />
        </div>
        <div className="products-container">
            <h2>Similar products</h2>
            <Products categoryID={categoryID} />
        </div>
    </>
}

export default ProductPage
