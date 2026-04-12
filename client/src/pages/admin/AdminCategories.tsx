import { useContext } from 'react';
import { useForm } from 'react-hook-form'

import { CreateCategory, RenameCategory, CategoriesOrder, DeleteNow } from '../../lib/Admin/Categories.ts';
import { UserContext } from '../../contexts/UserContext.tsx';
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import { ModalContext } from '../../contexts/ModalContext'
import { AdminTable } from '../../components/Admin/Table.tsx';

import type { Category } from '../../generated/prisma/client.ts';
import type { Item } from '../../types/Item.ts';

import '../../css/pages/admin/categories.css'

export const AdminCategories = () => {
    const [categories, setCategories] = useContext(CategoriesContext)
    const user = useContext(UserContext)[0]
    const setModalContent = useContext(ModalContext)[1]

    const DelForm = useForm()

    const deleteCategory = (category: Category) => {
        const DeleteDialog = (<div className="delete-category-dialog">
            <h2><i></i> Delete Category - {category.name}</h2>
            <div>Please choose a new category for "{category.name}" products</div>
            <form className="modal-wrap" onSubmit={DelForm.handleSubmit(() => DeleteNow(category, categories, setCategories, user, DelForm, setModalContent))}>
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

    return (
        <div className="admin-categories">
            <h3>Manage Categories</h3>
            <AdminTable
                data={categories}
                setData={setCategories}
                orderCallback={CategoriesOrder}
                createCallback={CreateCategory}
                editCallback={RenameCategory}
                deleteCallback={deleteCategory}
                columns={['name']}
            />
        </div>
    )
}
