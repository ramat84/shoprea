import './css/App.css'
import './css/bootstrap.css'
import './css/config.css'

import { useEffect, useState } from 'react'
import axios from "axios"

import { BottomMenu } from './components/Menu'
import { Copyright } from './components/Copyright'
import { Content } from './components/Content'

import { CategoriesContext } from './contexts/CategoriesContext'


function App() {
    const categoriesState = useState([])
    const [categories, setCategories] = categoriesState;

    useEffect(() => {
        axios.get('http://localhost:4000/api/categories')
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    return (
        <CategoriesContext.Provider value={categories}>
            <Content />
            <footer>
                <BottomMenu />
                <Copyright />
            </footer>
        </CategoriesContext.Provider>
    )
}

export default App
