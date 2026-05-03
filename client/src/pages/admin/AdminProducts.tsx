import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { AdminTable } from "../../components/Admin/Table"
import { Filter } from "../../components/Admin/Filter"
import { GetProductsByCategory } from "../../lib/Products"
import * as Products from '../../lib/Admin/Products.ts'

import { useCategories } from '../../contexts/CategoriesContext'
import { ModalContext } from "../../contexts/ModalContext.tsx"
import { ProductForm } from "../../components/Admin/ProductForm.tsx"

import '../../css/pages/admin/products.css'
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"

import type { Product, User } from "../../generated/prisma/client.ts"
import type { PageParams } from "../../types/PageParams.ts"
import type { TableCallbackParams } from "../../types/Table.ts"

export const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const setModalContent = useContext(ModalContext)[1]
    const [categoryId, setCategoryId] = useState(0)
    const { categories } = useCategories()

    const navigate = useNavigate()
    const params = useParams<PageParams>()
    const editForm = useForm()

    const setFilterCategory: SubmitHandler<FieldValues> = (e) => {
        if (!e.filter || parseInt(e.filter) == categoryId) return;

        navigate(`/settings/products/${e.filter}`, { replace: true })
    }

    const RefreshProducts = () => {
        if (params.id)
            GetProductsByCategory(parseInt(params.id), setProducts)
    }

    useEffect(() => {
        if (!params.id) return;
        setCategoryId(parseInt(params.id))
        RefreshProducts()
    }, [location])

    const Submit = (product: Product, userState: User) => {
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

        const url = `http://localhost:4000/api/products/${isNew ? 'create' : 'update'}/${userState.session}${isNew ? '' : '/' + product.id}`

        const axiosCall = isNew ? axios.post : axios.put;

        axiosCall(url, formData, { headers: { "Content-Type": "multipart/form-data" } }
        ).then(() => {
            confirm(`Successfuly ${isNew ? 'created' : 'updated'} - ${formValues.title}`)
            setModalContent(false)
            RefreshProducts()
        })
    }

    const EditCallback = ({ item }: TableCallbackParams) => {
        const modalContent = <ProductForm product={item} editForm={editForm} submitCallback={Submit} />
        setModalContent(modalContent);
    }

    const NewCallback = ({ newName }: TableCallbackParams) => {
        const modalContent = <ProductForm categoryId={categoryId} isNew={true} editForm={editForm} submitCallback={Submit} name={newName} />
        setModalContent(modalContent);
    }


    const DeleteCallback = ({ user, data, setData, item }: TableCallbackParams) => {
        if (!confirm(`Are you sure you want to delete this product - ${item.name} ?`))
            return;

        axios.delete(`http://localhost:4000/api/products/delete/${user.session}/${item.id}`)
            .then(() => {
                confirm(`Succesfully deleted ${item.name}`)
                setModalContent(false)
                setData(data.map(prod => item.id == prod.id ? null : prod))
            })
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
                createCallback={NewCallback}
                editCallback={EditCallback}
                deleteCallback={DeleteCallback}
                columns={['image', 'title', 'price']}
            />
        </div>
    )
}
