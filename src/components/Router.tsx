import { Routes, Route } from 'react-router-dom'
import { CategoryPage } from '../pages/CategoryPage'
import { ProductPage } from '../pages/ProductPage'

export const Router = () => (
    <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/c/:id/:name" element={<CategoryPage />} />
        <Route path="/p/:id/:name" element={<ProductPage />} />
    </Routes>
)
