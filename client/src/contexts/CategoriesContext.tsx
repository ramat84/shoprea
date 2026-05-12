import axios from "axios"
import type { Dispatch, ReactNode } from 'react';
import type { Category } from "../generated/prisma/client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export const CategoriesContext = createContext<Category[]>([])

export const GetCategories = (callback: Dispatch<Category[]>) => {
    axios.get('http://localhost:4000/api/categories')
        .then((res) => {
            callback(res.data)
        })
}

export const CategoriesContextProvider = ({ children }: { children: ReactNode }) => {
    const categoriesState = useState<Category[]>([])
    const [, setCategories] = categoriesState;

    useEffect(() => {
        GetCategories(setCategories)
    }, [])

    return (
        <CategoriesContext.Provider value={categoriesState}>
            {children}
        </CategoriesContext.Provider>
    )
}

export const useCategories = () => {
    const categoriesContext = useContext(CategoriesContext)
    const [categories, setCategories] = categoriesContext;
    const currentCategoryID = parseInt(useParams().id ?? '0')
    const [title, setCategoryTitle] = useState('')

    if (!categoriesContext) throw new Error('Must be used within the categories context')

    const CategoryByID = (categoryID: number): Category | null => {
        const results = categories.filter((catItem: Category) => (catItem.id == categoryID))

        if (results.length > 0)
            return results[0]

        return null
    }

    const refreshCategoryTitle = () => {
        if (currentCategoryID == 0) {
            return setCategoryTitle('All Products')
        }

        const category = CategoryByID(currentCategoryID)
        if (category) setCategoryTitle(category.name)
    }

    useEffect(refreshCategoryTitle, [categories, location.pathname])

    return { categories, setCategories, CategoryByID, currentCategoryID, title }
}
