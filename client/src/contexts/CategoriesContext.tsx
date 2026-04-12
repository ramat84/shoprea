import axios from "axios"

import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export const CategoriesContext = createContext<any>([])

export const GetCategories = (callback) => {
    axios.get('http://localhost:4000/api/categories')
        .then((res) => {
            callback(res.data)
        })
}
