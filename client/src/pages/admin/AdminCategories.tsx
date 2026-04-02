import { useContext, useEffect } from 'react';
import axios from 'axios';

import { UserContext } from '../../contexts/UserContext.tsx';
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import { AdminTable } from '../../components/Admin/table.tsx';

import type { Category } from '../../generated/prisma/client.ts';

export const AdminCategories = () => {
    const [categories, setCategories] = useContext(CategoriesContext)
    const [user, setUser] = useContext(UserContext)

    const updateCategories = (categories) => {
        setCategories(categories)

        const categoriesOrder = categories.map(cat => cat.id).join(",")
        if (!categoriesOrder) return;

        axios.put(`http://localhost:4000/api/categories/order/${user.session}/${categoriesOrder}`)
    }

    const renameCategory = (category: Category) => {
        const newName = prompt("Rename Category", category.name)

        if (newName == "" || newName == category.name) return;

        axios.put(`http://localhost:4000/api/categories/name/${user.session}/${category.id}`, { name: newName })
            .then(() => {
                const newCategories = categories.map(row => {
                    if (row.id == category.id)
                        row.name = newName
                    return row
                })
                setCategories([...newCategories])
            })
    }

    return <AdminTable
        title="Manage Categories"
        data={categories}
        updateCallback={updateCategories}
        editCallback={renameCategory}
        columns={['name']}
    />
}
