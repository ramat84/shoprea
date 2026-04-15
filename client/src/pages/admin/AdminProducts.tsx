import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { AdminTable } from "../../components/Admin/Table"
import { Filter } from "../../components/Admin/Filter"
import { GetProductsByCategory } from "../../lib/Products"
import * as Products from '../../lib/Admin/Products.ts'
import type { Product, User } from "../../generated/prisma/client.ts"

import { CategoriesContext } from '../../contexts/CategoriesContext'
import { ModalContext } from "../../contexts/ModalContext.tsx"
import { ProductForm } from "../../components/Admin/ProductForm.tsx"

import '../../css/pages/admin/products.css'
import { useForm } from "react-hook-form"
import axios from "axios"

export const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const setModalContent = useContext(ModalContext)[1]
    const [categoryId, setCategoryId] = useState(0)
    const [categories, setCategories] = useContext(CategoriesContext)
    const navigate = useNavigate()
    const params = useParams()
    const editForm = useForm()

    const setFilterCategory = (e: { filter: string }) => {
        if (!e.filter || parseInt(e.filter) == categoryId) return;

        navigate(`/settings/products/${e.filter}`, { replace: true })
    }

    const RefreshProducts = () => {
        GetProductsByCategory(parseInt(params.id), setProducts)
    }

    useEffect(() => {
        if (!params.id) return;
        setCategoryId(parseInt(params.id))
        RefreshProducts()
    }, [location])

    const Submit = (product: Product, user: User) => {
        const formData = new FormData();
        const isNew = !product
        const formValues = editForm.getValues()
        Object.entries(formValues).forEach(([key, val]) => {
            if (key == "image") {
                if (val[0])
                    formData.append(key, val[0])
                return;
            }

            formData.append(key, val)
        });

        const url = `http://localhost:4000/api/products/${isNew ? 'create' : 'update'}/${user.session}${isNew ? '' : '/' + product.id}`

        const axiosCall = isNew ? axios.post : axios.put;

        axiosCall(url, formData, { headers: { "Content-Type": "multipart/form-data" } }
        ).then(() => {
            confirm(`Successfuly ${isNew ? 'created' : 'updated'} - ${formValues.title}`)
            setModalContent(false)
            RefreshProducts()
        })
    }

    const EditProductCallback = (user: User, products: [Product], setProducts, product: Product) => {
        const modalContent = <ProductForm product={product} editForm={editForm} submitCallback={Submit} />
        setModalContent(modalContent);
    }

    const NewProductCallback = (user: User, products: [Product], setProducts, newName: string) => {
        const modalContent = <ProductForm categoryId={categoryId} isNew={true} editForm={editForm} submitCallback={Submit} name={newName} />
        setModalContent(modalContent);
    }

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
                createCallback={NewProductCallback}
                editCallback={EditProductCallback}
                deleteCallback={() => { }}
                columns={['image', 'title', 'price']}
            />
        </div>
    )
}
