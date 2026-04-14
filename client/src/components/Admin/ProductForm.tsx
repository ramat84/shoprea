import { useContext } from "react"
import type { Product, Category } from "../../generated/prisma/client.ts"
import { CategoriesContext } from '../../contexts/CategoriesContext.tsx'
import { UserContext } from '../../contexts/UserContext.tsx';

export const ProductForm = ({ product, editForm, submitCallback, isNew = false }: { product?: Product, editForm: any, submitCallback: any, isNew?: boolean }) => {
    const categoriesContext = useContext(CategoriesContext)
    const categories = categoriesContext[0]
    const user = (useContext(UserContext))[0]

    return <form className="edit-dialog" onSubmit={editForm.handleSubmit(() => submitCallback(product, user))}>
        <h4>{isNew ? 'New' : 'Edit'} {isNew ? '' : product.title}</h4>
        <div className="row">
            <div className="col7">
                <div className="row">
                    <div className="col3"><label>Category</label></div>
                    <div className="col7">
                        <select {...editForm.register('category')} defaultValue={isNew ? '' : product.categories[0].categoryID}>
                            {categories.map((category: Category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col3"><label>Name</label></div>
                    <div className="col7"><input {...editForm.register('title')} defaultValue={isNew ? '' : product.title} /></div>
                </div>
                <div className="row">
                    <div className="col3"><label>Description</label></div>
                    <div className="col7">
                        <textarea {...editForm.register('description')} defaultValue={isNew ? '' : product.description} />
                    </div>
                </div>
                <div className="row">
                    <div className="col3"><label>Price ($)</label></div>
                    <div className="col7"><input {...editForm.register('price')} defaultValue={isNew ? '' : product.price} /></div>
                </div>
                <div className="row">
                    <div className="col3"><label>Image</label></div>
                    <div className="col7">
                        <input type="file" />
                    </div>
                </div>
                <div className="row">
                    <div className="col3"></div>
                    <div className="col7">
                        <button className="btn-submit">{isNew ? 'Add' : 'Save'}</button>
                    </div>
                </div>
            </div>
            <div className="col3">
                {isNew ? '' : product.image && <img src={product.image} />}
            </div>
        </div>
    </form>
}
