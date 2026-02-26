import { Routes, Route } from 'react-router-dom'

import { CategoryPage } from './pages/CategoryPage'
import { ProductPage } from './pages/ProductPage'
import { BasketPage } from './pages/BasketPage'
import { SigninForm } from './pages/SigninForm'
import { SettingsPage } from './pages/SettingsPage'

export const Router = () => (
    <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/c/:id/:name" element={<CategoryPage />} />
        <Route path="/p/:id/:name" element={<ProductPage />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/:page" element={<SettingsPage />} />
    </Routes>
)
