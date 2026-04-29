import './css/App.css'
import './css/bootstrap.css'
import './css/config.css'

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

import { Router } from './Router'

import { CategoriesContextProvider } from './contexts/CategoriesContext'
import { BasketContext, GetAmounts } from './contexts/BasketContext'
import { UserContext } from './contexts/UserContext'
import { UserCheck } from './lib/User.ts'

import type { Product, Category } from './generated/prisma/client.ts'
import type { AmountsType } from './contexts/BasketContext'


import { Footer } from './components/Footer.tsx'

function App() {
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
        UserCheck(setUser)
    }, [])
    return (
        <CategoriesContextProvider>
            <BasketContext.Provider value={basketStates as any}>
                <UserContext.Provider value={userState}>
                    <Router />
                    <Footer />
                </UserContext.Provider>
            </BasketContext.Provider>
        </CategoriesContextProvider>
    )
}

export default App
