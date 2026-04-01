import { useContext, useEffect } from 'react';
import axios from 'axios';
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import { AdminTable } from '../../components/Admin/table.tsx';

export const AdminCategories = () => {
    const [categories, setCategories] = useContext(CategoriesContext)

    const updateCategories = (categories) => {
        setCategories(categories)

        const categoriesOrder = categories.map(cat => cat.id).join(",")
        if (!categoriesOrder) return;

        axios.put(`http://localhost:4000/api/categories/order/${categoriesOrder}`)
    }

    return <AdminTable title="Manage Categories" data={categories} set={updateCategories} columns={['name']} />
}
