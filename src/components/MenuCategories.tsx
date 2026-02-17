import { useContext } from 'react'
import { Link } from 'react-router'
import { CategoriesContext } from '../contexts/CategoriesContext'

export const MenuCategories = () => {
    const categories = useContext(CategoriesContext)

    return <div className="sub-menu">
        <a href="#">Categories</a>
        <div>
            {categories.map(item => <Link key={item.id} to={"/c/" + item.id + "/" + item.name}>{item.name}</Link>)}
        </div>
    </div>
}
