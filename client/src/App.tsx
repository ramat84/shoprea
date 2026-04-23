import './css/App.css'
import './css/bootstrap.css'
import './css/config.css'

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

import { BottomMenu } from './components/Header/Menu'
import { Copyright } from './components/Copyright'
import { Router } from './Router'

import { CategoriesContext, GetCategories } from './contexts/CategoriesContext'
import { BasketContext, GetAmounts } from './contexts/BasketContext'
import { UserContext } from './contexts/UserContext'
import { UserCheck } from './lib/User.ts'

import type { Product, Category } from './generated/prisma/client.ts'
import type { AmountsType } from './contexts/BasketContext'

// import { modeReducer, type ModeAction } from './lib/Mode.ts'

function App() {
    const categoriesState = useState<Category[]>([])
    const [, setCategories] = categoriesState
    // const [mode, dispatchMode] = useReducer(modeReducer, { mode: 'light' })

    const basketStates = {
        amounts: [{}, () => { }] as [AmountsType, Dispatch<SetStateAction<AmountsType>>],
        products: [[], () => { }] as [Product[], Dispatch<SetStateAction<Product[]>>],
        total: [0, () => { }] as [number, Dispatch<SetStateAction<number>>]
    }

    const userState = useState(undefined)
    const [, setUser] = userState;
    const [, setBasketAmounts] = basketStates.amounts

    useEffect(() => {
        setBasketAmounts(GetAmounts())
        GetCategories(setCategories)
        UserCheck(setUser)
    }, [])

    return (
        <CategoriesContext.Provider value={categoriesState}>
            <BasketContext.Provider value={basketStates}>
                <UserContext.Provider value={userState}>
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
