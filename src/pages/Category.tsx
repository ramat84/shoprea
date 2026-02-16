import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import axios from "axios"
import { Product } from '../components/Product'
import { Header } from '../components/Header'

import '../css/components/products.css'

export const Category = () => {
    const [products, setProducts] = useState([])
    const categoriesState = useState([])
    const [title, setTitle] = useState('')

    const categoryId = useParams().id ?? 0

    const [categories, setCategories] = categoriesState;

    useEffect(() => {
        axios.get('http://localhost:4000/api/categories')
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    useEffect(() => {
        console.log(categoryId)
        let url = 'http://localhost:4000/api/products'
        if (categoryId ?? 0 > 0)
            url += '/' + categoryId;
        axios.get(url)
            .then((res) => { setProducts(res.data) })
    }, [location.pathname])

    useEffect(() => {
        if (categoryId == 0) {
            setTitle('All Products')
        } else {
            categories.forEach(catItem => {
                if (catItem.id == categoryId)
                    setTitle(catItem.name)
            })
        }
    }, [location.pathname])

    return <>
        <Header categoriesState={categoriesState} />
        <h2>{title}</h2>
        <div className="products">
            {products.map((prod) => <Product title={prod.title} image={prod.image} shortDesc={prod.shortDesc} price={prod.price} />)}
        </div>
    </>
}
