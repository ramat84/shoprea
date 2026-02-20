import './css/App.css'
import './css/bootstrap.css'
import './css/config.css'

import { useEffect, useEffectEvent, useState } from 'react'

import { BottomMenu } from './components/Menu'
import { Copyright } from './components/Copyright'
import { Router } from './components/Router'

import { CategoriesContext, GetCategories } from './contexts/CategoriesContext'
import { BasketContext, GetBasket } from './contexts/BasketContext'

function App() {
    const [categories, setCategories] = useState([]);
    const basket = useState([])
    const setBasket = basket[1]

    useEffect(() => { GetCategories(setCategories) }, [])
    useEffect(() => { setBasket(GetBasket()) }, [])

    return (
        <CategoriesContext.Provider value={categories}>
            <BasketContext.Provider value={basket}>
                <Router />
                <footer>
                    <BottomMenu />
                    <Copyright />
                </footer>
            </BasketContext.Provider>
        </CategoriesContext.Provider>
    )
}

export default App
