import './css/App.css'
import './css/bootstrap.css'
import './css/config.css'

import { useEffect, useEffectEvent, useState } from 'react'

import { BottomMenu } from './components/Header/Menu'
import { Copyright } from './components/Copyright'
import { Router } from './Router'

import { CategoriesContext, GetCategories } from './contexts/CategoriesContext'
import { BasketContext, GetBasket } from './contexts/BasketContext'
import { UserContext } from './contexts/UserContext'

function App() {
    const [categories, setCategories] = useState([]);
    const basket = useState([])
    const user = useState(undefined)
    const setBasket = basket[1]

    useEffect(() => { GetCategories(setCategories) }, [])
    useEffect(() => { setBasket(GetBasket()) }, [])

    return (
        <CategoriesContext.Provider value={categories}>
            <BasketContext.Provider value={basket}>
                <UserContext.Provider value={user}>
                    <Router />
                    <footer>
                        <BottomMenu />
                        <Copyright />
                    </footer>
                </UserContext.Provider>
            </BasketContext.Provider>
        </CategoriesContext.Provider>
    )
}

export default App
