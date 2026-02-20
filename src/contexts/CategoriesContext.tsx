import { createContext } from 'react';
import axios from "axios"

export const CategoriesContext = createContext([])

export const GetCategories = (callback) => {
    axios.get('http://localhost:4000/api/categories')
        .then((res) => {
            callback(res.data)
        })
}
