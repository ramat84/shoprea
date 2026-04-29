import './css/App.css'
import './css/bootstrap.css'
import './css/config.css'

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

import { Router } from './Router'

import { CategoriesContext, GetCategories } from './contexts/CategoriesContext'
import { BasketContext, GetAmounts } from './contexts/BasketContext'
import { UserContext } from './contexts/UserContext'
import { UserCheck } from './lib/User.ts'

import type { Product, Category } from './generated/prisma/client.ts'
import type { AmountsType } from './contexts/BasketContext'

function App() {
    const categoriesState = useState<Category[]>([])
    const [, setCategories] = categoriesState

import { Footer } from './components/Footer.tsx'

    type BasketStatesType = {
        amounts: [AmountsType, Dispatch<AmountsType>],
        products: [Product[], Dispatch<Product[]>],
        total: [number, Dispatch<number>]
    }

    const basketStates: BasketStatesType = {
        amounts: useState<AmountsType>([]),
        products: useState<Product[]>([]),
        total: useState<number>(0),
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
                    <Footer />
                </UserContext.Provider>
            </BasketContext.Provider>
        </CategoriesContext.Provider>
    )
}

export default App
