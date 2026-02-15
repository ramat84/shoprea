import { Routes, Route } from 'react-router-dom'
import { Homepage } from '../pages/Homepage'
import { Categories } from '../pages/Categories'

export const Content = () => (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Categories />} />
    </Routes>
)
