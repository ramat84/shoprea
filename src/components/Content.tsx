import { Routes, Route } from 'react-router-dom'
import { Category } from '../pages/Category'

export const Content = () => (
    <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/cat/:id/:name" element={<Category />} />
    </Routes>
)
