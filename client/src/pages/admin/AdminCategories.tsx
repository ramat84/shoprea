import { useContext } from 'react';

import * as Categories from '../../lib/Admin/Categories.tsx';
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import { AdminTable } from '../../components/Admin/Table.tsx';

import '../../css/pages/admin/categories.css'

export const AdminCategories = () => {
    const [categories, setCategories] = useContext(CategoriesContext)

    return (
        <div className="admin-categories">
            <h3>Manage Categories</h3>
            <AdminTable
                data={categories}
                setData={setCategories}
                orderCallback={Categories.CategoriesOrder}
                createCallback={Categories.CreateCategory}
                editCallback={Categories.RenameCategory}
                deleteCallback={Categories.DeleteCategory}
                columns={['name']}
            />
        </div>
    )
}
