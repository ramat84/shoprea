import { Link } from 'react-router'
import { useCategories } from '../contexts/CategoriesContext'
import type { Category } from "../../../server/src/generated/prisma/client.ts";

export const MenuCategories = () => {
    const { categories } = useCategories()

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
