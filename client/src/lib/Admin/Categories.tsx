import axios from 'axios';
import { type Dispatch, useContext } from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form'

import type { Category, User } from '../../generated/prisma/client.ts';
import type { Item } from '../../types/Item.ts';

import { GetCategories } from '../../contexts/CategoriesContext.tsx'
import { ModalContext } from '../../contexts/ModalContext'

export const CreateCategory = ({ user, data, setData, newName }: { user: User, data: Category, setData: Dispatch<Category>, newName: string }) => {
    if (!newName) return;

    const nextOrder = data[data.length - 1].order + 1;

    axios.post(`http://localhost:4000/api/categories/create/${user.session}`, { name: newName, order: nextOrder })
        .then(() => {
            GetCategories(setData)
            confirm(`Succesfully added ${newName}`)
        })
}

export const RenameCategory = ({ user, data, setData, item }: { user: User, data: [Category], setData: Dispatch<Category>, item: Category }) => {
    const newName = prompt("Rename Category", item.name)

    if (!newName || newName == item.name) return;

    axios.put(`http://localhost:4000/api/categories/name/${user.session}/${item.id}`, { name: newName })
        .then(() => {
            const newCategories = data.map(
                (row: Category) => {
                    if (row.id == item.id)
                        row.name = newName
                    return row
                })
            setData(newCategories)
        })
}

export const CategoriesOrder = ({ user, setData, newData }: { user: User, setData: Dispatch<[Category]>, newData: [Category] }) => {
    const categoriesOrder = newData.map(cat => cat.id).join(",")
    if (!categoriesOrder) return;

    axios.put(`http://localhost:4000/api/categories/order/${user.session}/${categoriesOrder}`)

    // setTimeout(() => { setData(newData) }, 340)
    setData(newData)
}

export const DeleteNow = (
    user: User,
    categories: [Category],
    setCategories: Dispatch<[Category]>,
    category: Category,
    DelForm: UseFormReturn
) => {
    const setModalContent = useContext(ModalContext)[1]
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

export const DeleteCategory = ({ user, data, setData, item }: { user: User, data: [Category], setData: Dispatch<[Category]>, item: Category }) => {
    const DelForm = useForm()
    const [, setModalContent] = useContext(ModalContext)

    const DeleteDialog = (
        <div className="delete-category-dialog" >
            <h2><i></i> Delete Category - {item.name}</h2 >
            <div>Please choose a new category for "{item.name}" products </div>
            < form className="modal-wrap" onSubmit={DelForm.handleSubmit(() => DeleteNow(user, data, setData, item, DelForm))} >
                <label htmlFor="move-category" > Move Products to: </label>
                < select {...DelForm.register('moveTo')}>
                    <option value="0" > </option>
                    {
                        data.map((categories_item: Item) => (
                            item.id != categories_item.id && <option value={categories_item.id} > {categories_item.name} </option>
                        ))
                    }
                </select>
                < div >
                    <button className="btn-delete" > Delete Now </button>
                    < button onClick={() => setModalContent(false)} className="btn-cancel" > Cancel </button>
                </div>
            </form>
        </div>
    )

    setModalContent(DeleteDialog)
}
