import { useContext, useState } from "react"
import { AdminTable } from "../../components/Admin/Table"
import { Filter } from "../../components/Admin/Filter"
import { CategoriesContext } from '../../contexts/CategoriesContext'
import { GetProductsByCategory } from "../../lib/Products"

export const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useContext(CategoriesContext)

    const setFilterCategory = (e: { filter: string }) => {
        const catId = e.filter ?? ""

        if (catId == "") return;

        GetProductsByCategory(catId, setProducts)
    }

    return (
        <div className="admin-products">
            <h3>Manage Products</h3>
            <div className="admin-filters">
                <Filter label="Choose Category" values={categories} callback={setFilterCategory} />
            </div>
            <AdminTable
                data={products}
                setData={setProducts}
                orderCallback={() => { }}
                createCallback={() => { }}
                editCallback={() => { }}
                deleteCallback={() => { }}
                columns={['image', 'title']}
            />
        </div>
    )
}
