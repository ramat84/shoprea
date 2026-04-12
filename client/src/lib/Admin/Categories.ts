import axios from 'axios';
import type { Category, User } from '../../generated/prisma/client.ts';
import type { Dispatch } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { GetCategories } from '../../contexts/CategoriesContext.tsx'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.tsx';

export const CreateCategory = (user: User, categories: [Category], setCategories, newName: string) => {
    if (!newName) return;

    const nextOrder = categories[categories.length - 1].order + 1;

    axios.post(`http://localhost:4000/api/categories/create/${user.session}`, { name: newName, order: nextOrder })
        .then(() => {
            GetCategories(setCategories)
            confirm(`Succesfully added ${newName}`)
        })
}

export const RenameCategory = (user: User, categories: [Category], setCategories, category: Category) => {
    const newName = prompt("Rename Category", category.name)

    if (!newName || newName == category.name) return;

    axios.put(`http://localhost:4000/api/categories/name/${user.session}/${category.id}`, { name: newName })
        .then(() => {
            const newCategories = categories.map(
                (row: Category) => {
                    if (row.id == category.id)
                        row.name = newName
                    return row
                })
            setCategories(newCategories)
        })
}

export const CategoriesOrder = (user: User, oldcategories: [Category], setCategories, categories: [Category]) => {
    setCategories(categories)

    const categoriesOrder = categories.map(cat => cat.id).join(",")
    if (!categoriesOrder) return;

    axios.put(`http://localhost:4000/api/categories/order/${user.session}/${categoriesOrder}`)
}

export const DeleteNow = (
    user: User,
    categories: [Category],
    setCategories: [Category],
    category: Category,
    DelForm: UseFormReturn,
    setModalContent: Dispatch<false | HTMLDivElement>
) => {
    const moveToId = DelForm.getValues('moveTo')
    const moveToCat = categories.find(item => moveToId == item.id)

    if (!confirm(`Are you sure you want to delete this category - ${category.name} ?`))
        return;

    axios.delete(`http://localhost:4000/api/categories/delete/${user.session}/${category.id}/${moveToCat.id}`)
        .then(() => {
            confirm(`Succesfully deleted ${category.name}`)
            GetCategories(setCategories)
            setModalContent(false)
        })
}

