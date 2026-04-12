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
import type { Category } from './generated/prisma/client.ts'

function App() {
    const categoriesState = useState<Category[]>([])
    const setCategories = categoriesState[1]

    const basketStates = {
        amounts: useState([]),
        products: useState([]),
        total: useState(0)
    }

    const user = useState(undefined)
    const setBasketAmounts = basketStates.amounts[1]

    useEffect(() => {
        GetCategories(setCategories)
        setBasketAmounts(GetAmounts())
        UserCheck(user[1])
    }, [])

    return (
        <CategoriesContext.Provider value={categoriesState}>
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
