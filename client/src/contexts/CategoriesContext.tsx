import axios from "axios"
import type { Dispatch, ReactNode } from 'react';
import type { Category } from "../generated/prisma/client";

import { createContext, useContext, useEffect, useState } from 'react';

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

    if (!categoriesContext) throw new Error('Must be used within the categories context')

    const CategoryByID = (categoryID: number): Category | null => {
        const results = categories.filter((catItem: Category) => (catItem.id == categoryID))

        if (results.length > 0)
            return results[0]

        return null
    }

    return { categories, setCategories, CategoryByID }
}
