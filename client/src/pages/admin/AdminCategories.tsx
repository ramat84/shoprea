import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

import axios from 'axios';

import { UserContext } from '../../contexts/UserContext.tsx';
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import { ModalContext } from '../../contexts/ModalContext'

import { AdminTable } from '../../components/Admin/Table.tsx';

import type { Category } from '../../generated/prisma/client.ts';
import type { Item } from '../../types/Item.ts';

import { GetCategories } from '../../contexts/CategoriesContext'

import '../../css/pages/admin/categories.css'

export const AdminCategories = () => {
    const [categories, setCategories] = useContext(CategoriesContext)
    const [user, setUser] = useContext(UserContext)
    const [modalContent, setModalContent] = useContext(ModalContext)

    const DelForm = useForm()

    const DeleteNow = (category: Category) => {
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

    const deleteCategory = (category: Category) => {
        const DeleteDialog = (<div className="delete-category-dialog">
            <h2><i></i> Delete Category - {category.name}</h2>
            <div>Please choose a new category for "{category.name}" products</div>
            <form className="modal-wrap" onSubmit={DelForm.handleSubmit(() => DeleteNow(category))}>
                <label htmlFor="move-category">Move Products to:</label>
                <select {...DelForm.register('moveTo')}>
                    <option value="0"></option>
                    {categories.map((item: Item) => (
                        category.id != item.id && <option value={item.id} >{item.name}</option>
                    ))}
                </select>
                <div>
                    <button className="btn-delete">Delete Now</button>
                    <button onClick={() => setModalContent(false)} className="btn-cancel">Cancel</button>
                </div>
            </form>
        </div>
        )

        setModalContent(DeleteDialog)
    }

    const updateCategories = (categories: [Category]) => {
        setCategories(categories)

        const categoriesOrder = categories.map(cat => cat.id).join(",")
        if (!categoriesOrder) return;

        axios.put(`http://localhost:4000/api/categories/order/${user.session}/${categoriesOrder}`)
    }

    const renameCategory = (category: Category) => {
        const newName = prompt("Rename Category", category.name)

        if (!newName || newName == category.name) return;

        axios.put(`http://localhost:4000/api/categories/name/${user.session}/${category.id}`, { name: newName })
            .then(() => {
                const newCategories = categories.map(
                    row => {
                        if (row.id == category.id)
                            row.name = newName
                        return row
                    })
                setCategories(newCategories)
            })
    }

    const createCategory = (newName) => {
        if (!newName) return;

        const nextOrder = categories[categories.length - 1].order + 1;

        axios.post(`http://localhost:4000/api/categories/create/${user.session}`, { name: newName, order: nextOrder })
            .then(() => {
                GetCategories(setCategories)
                confirm(`Succesfully added ${newName}`)
            })
    }
    return (
        <AdminTable
            title="Manage Categories"
            data={categories}
            updateCallback={updateCategories}
            createCallback={createCategory}
            editCallback={renameCategory}
            deleteCallback={deleteCategory}
            columns={['name']}
        />
    )
}
