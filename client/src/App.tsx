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
import { UserCheck } from './lib/User.ts'

function App() {
    const [categories, setCategories] = useState([])

    const basketStates = {
        amounts: useState([]),
        products: useState([]),
        total: useState(0)
    }

    const user = useState(undefined)
    const [basketAmounts, setBasketAmounts] = basketStates.amounts

    useEffect(() => {
        GetCategories(setCategories)
        setBasketAmounts(GetAmounts())
        UserCheck(user[1])
    }, [])

    return (
        <CategoriesContext.Provider value={categories}>
            <BasketContext.Provider value={basketStates}>
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
