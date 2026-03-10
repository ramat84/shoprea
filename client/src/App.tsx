import './css/App.css'
import './css/bootstrap.css'
import './css/config.css'

import { useEffect, useEffectEvent, useState } from 'react'

import { BottomMenu } from './components/Header/Menu'
import { Copyright } from './components/Copyright'
import { Router } from './Router'

import { CategoriesContext, GetCategories } from './contexts/CategoriesContext'
import { BasketContext, GetAmounts } from './contexts/BasketContext'
import { UserContext } from './contexts/UserContext'
import { UserCheck } from './lib/User.jsx'

function App() {
    const [categories, setCategories] = useState([])
    const basketState = useState({ amounts: [], products: [] })
    const user = useState(undefined)
    const [basket, setBasket] = basketState

    useEffect(() => {
        GetCategories(setCategories)

        setBasket(prev => {
            const new_basket = { ...prev }
            new_basket.amounts = GetAmounts()
            return new_basket
        })
        UserCheck(user[1])
    }, [])

    return (
        <CategoriesContext.Provider value={categories}>
            <BasketContext.Provider value={basketState}>
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
