import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Products } from '../components/Products'
import { useCategories } from "../contexts/CategoriesContext"
import '../css/components/products.css'

export const CategoryPage = () => {
    const [title, setCategoryTitle] = useState('')
    const currentCategoryID = parseInt(useParams().id ?? '0')
    const { categories, CategoryByID } = useCategories()

    const refreshCategoryTitle = () => {
        if (currentCategoryID == 0) {
            return setCategoryTitle('All Products')
        }

        const category = CategoryByID(currentCategoryID)
        if (category) setCategoryTitle(category.name)
    }

    useEffect(refreshCategoryTitle, [categories, location.pathname])

    return <>
        <h2>{title}</h2>
        <Products categoryID={currentCategoryID} />
    </>
}

export default CategoryPage
