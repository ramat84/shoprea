import { Routes, Route } from 'react-router-dom'
import { Category } from '../pages/Category'

export const Content = () => (
    <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/c/:id/:name" element={<Category />} />
    </Routes>
)
