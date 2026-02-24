import { Routes, Route } from 'react-router-dom'

import { CategoryPage } from './pages/CategoryPage'
import { ProductPage } from './pages/ProductPage'
import { BasketPage } from './pages/BasketPage'
import { SigninForm } from './pages/SigninForm'

export const Router = () => (
    <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/c/:id/:name" element={<CategoryPage />} />
        <Route path="/p/:id/:name" element={<ProductPage />} />
        <Route path="/basket" element={<BasketPage />} />
    </Routes>
)
