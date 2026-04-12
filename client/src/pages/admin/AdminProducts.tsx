import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { AdminTable } from "../../components/Admin/Table"
import { Filter } from "../../components/Admin/Filter"
import { CategoriesContext } from '../../contexts/CategoriesContext'
import { GetProductsByCategory } from "../../lib/Products"
import * as Products from '../../lib/Admin/Products.ts'

export const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [categories, setCategories] = useContext(CategoriesContext)
    const navigate = useNavigate()
    const params = useParams()

    const setFilterCategory = (e: { filter: string }) => {
        if (!e.filter || parseInt(e.filter) == categoryId) return;

        navigate(`/settings/products/${e.filter}`, { replace: true })
    }

    useEffect(() => {
        if (!params.id) return;
        setCategoryId(parseInt(params.id))
        GetProductsByCategory(parseInt(params.id), setProducts)
    }, [location])

    return (
        <div className="admin-products">
            <h3>Manage Products</h3>
            <div className="admin-filters">
                <Filter label="Choose Category" values={categories} callback={setFilterCategory} />
            </div>
            {categoryId == 0 && <div className="notice">Please choose a category</div>}
            <AdminTable
                data={products}
                setData={setProducts}
                orderCallback={Products.ProductsOrder}
                createCallback={() => { }}
                editCallback={() => { }}
                deleteCallback={() => { }}
                columns={['image', 'title']}
            />
        </div>
    )
}
