import { useContext } from 'react'
import { Link } from 'react-router'
import { CategoriesContext } from '../contexts/CategoriesContext'
import type { Category } from "../../../shared/src/generated/prisma/client.ts";

export const MenuCategories = () => {
    const [categories, setCategories] = useContext(CategoriesContext)

    return <div className="sub-menu">
        <a href="#">Categories</a>
        <div>
            {categories.map((item: Category) => (
                <Link key={item.id} to={"/c/" + item.id + "/" + item.name}>
                    {item.name}
                </Link>
            ))}
        </div>
    </div>
}
