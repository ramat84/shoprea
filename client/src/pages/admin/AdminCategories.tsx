import { useContext, useEffect } from 'react';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext.tsx';
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import { AdminTable } from '../../components/Admin/table.tsx';

export const AdminCategories = () => {
    const [categories, setCategories] = useContext(CategoriesContext)
    const [user, setUser] = useContext(UserContext)

    const updateCategories = (categories) => {
        setCategories(categories)

        const categoriesOrder = categories.map(cat => cat.id).join(",")
        if (!categoriesOrder) return;

        axios.put(`http://localhost:4000/api/categories/order/${user.session}/${categoriesOrder}`)
    }

    return <AdminTable
        title="Manage Categories"
        data={categories}
        updateCallback={updateCategories}
        columns={['name']}
    />
}
