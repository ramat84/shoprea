import axios from "axios"
import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type ReactNode } from 'react';
import type { Category } from "../generated/prisma/client";

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
    const context = useContext(CategoriesContext)
    if (!context) throw new Error('Must be used within the categories context')

    return context
}
