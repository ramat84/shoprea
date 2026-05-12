import { Subheader } from '../components/Elements/Subheader'
import { Products } from '../components/Products'
import { useCategories } from "../contexts/CategoriesContext"
import '../css/components/products.css'

export const CategoryPage = () => {
    const {currentCategoryID, title} = useCategories()

    return <>
        <Subheader title={title} />
        <Products categoryID={currentCategoryID} />
    </>
}

export default CategoryPage
