import './css/App.css'
import './css/bootstrap.css'
import './css/components/buttons.css'
import './css/modal.css'
import './css/strap.css'

import { Router } from './Router'

import { CategoriesContextProvider } from './contexts/CategoriesContext'
import { BasketContextProvider } from './contexts/BasketContext'
import { UserContextProvider } from './contexts/UserContext'

import { Footer } from './components/Footer'

function App() {
    return (
        <CategoriesContextProvider>
            <BasketContextProvider>
                <UserContextProvider>
                    <Router />
                    <Footer />
                </UserContextProvider>
            </BasketContextProvider>
        </CategoriesContextProvider>
    )
}

export default App
