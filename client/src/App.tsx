import './css/App.css'
import './css/bootstrap.css'
import './css/strap.css'
import './css/components/buttons.css'
import './css/modal.css'
import './css/forms.css'

import { Router } from './Router'

import { CategoriesContextProvider } from './contexts/CategoriesContext'
import { BasketContextProvider } from './contexts/BasketContext'
import { UserContextProvider } from './contexts/UserContext'

import { Footer } from './components/Footer'

function App() {
    return (<>
        <CategoriesContextProvider>
            <BasketContextProvider>
                <UserContextProvider>
                    <Router />
                </UserContextProvider>
            </BasketContextProvider>
        </CategoriesContextProvider>
        <Footer />
    </>)
}

export default App
