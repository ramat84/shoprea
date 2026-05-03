import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import { Products } from '../components/Products'

import '../css/components/products.css'
import '../css/components/products-mobile.css'
import { useCategories } from "../contexts/CategoriesContext"

export const CategoryPage = () => {
    const [title, setCategoryTitle] = useState('')

    const currentCategoryID = parseInt(useParams().id ?? '0')
    const [categories] = useCategories()

    const refreshCategoryTitle = () => {
        if (currentCategoryID == 0) {
            return setCategoryTitle('All Products')
        }

        categories.forEach((catItem: { id: number, name: string }) => {
            if (catItem.id == currentCategoryID)
                setCategoryTitle(catItem.name)
        })
    }

    useEffect(refreshCategoryTitle, [categories])
    useEffect(() => { refreshCategoryTitle() }, [location.pathname])

    return <>
        <h2>{title}</h2>
        <Products categoryID={currentCategoryID} />
    </>
}

export default CategoryPage
