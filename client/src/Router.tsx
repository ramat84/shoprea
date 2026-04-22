import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'

const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const BasketPage = lazy(() => import('./pages/BasketPage'))
const SigninForm = lazy(() => import('./pages/SigninForm'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

export const Router = () => (
    <>
        <Suspense fallback={<div className="loading">Loading...</div>}>
            <Header />
            <Routes>
                <Route path="/" element={<CategoryPage />} />
                <Route path="/c/:id/:name" element={<CategoryPage />} />
                <Route path="/p/:id/:name" element={<ProductPage />} />
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/basket" element={<BasketPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/:page" element={<SettingsPage />}>
                    <Route path=":id" element={null} />
                </Route>
            </Routes>
        </Suspense>
    </>
)
