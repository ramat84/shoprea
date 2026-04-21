import type { ChangeEvent } from "react"
import type { Product } from "../../generated/prisma/client.ts"

import { useContext, useEffect, useState } from "react"
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import { UserContext } from '../../contexts/UserContext.tsx';
import { SelectRow, InputRow, TextareaRow, SubmitRow, FileRow } from './FormFields.tsx'

type ProductFormParams = {
    product?: Product,
    editForm: any,
    submitCallback: any,
    isNew?: boolean,
    categoryId?: number,
    name?: string | null
}

export const ProductForm = ({ product, editForm, submitCallback, isNew = false, categoryId = 0, name = null }: ProductFormParams) => {
    const categoriesContext = useContext(CategoriesContext)
    const categories = categoriesContext[0]
    const userState = (useContext(UserContext))[0]
    const [image, setImage] = useState<string>('')

    categoryId = categoryId || product.categories[0].categoryID

    useEffect(() => {
        if (!isNew && product.image)
            setImage(product.image)
    }, [])

    const ChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result as string)
        }

        reader.readAsDataURL(file)
    }

    return <form className="edit-dialog" onSubmit={editForm.handleSubmit(() => submitCallback(product, userState))}>
        <h4>{isNew ? 'New' : 'Edit'} {isNew ? '' : product.title}</h4>
        <div className="row">
            <div className="col7">
                <SelectRow form={editForm} name="category" label="Category" values={categories} value={categoryId} />
                <InputRow form={editForm} name="title" label="Name" value={isNew ? name : product.title} />
                <TextareaRow form={editForm} name="description" label="Description" value={isNew ? '' : product.description} />
                <InputRow form={editForm} name="price" label="Price" value={isNew ? '' : product.price} />
                <FileRow form={editForm} name="image" callback={ChangeImage} />
                <SubmitRow value={isNew ? 'Add' : 'Save'} />
            </div>
            <div className="col3">
                <img src={image} />
            </div>
        </div>
    </form>
}
