import { useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

export const MenuCategories = ({ categoriesState }: { categoriesState: any }) => {
    const [categories, setCategories] = categoriesState;

    useEffect(() => {
        axios.get(`http://localhost:4000/api/categories`)
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    return <div className="sub-menu">
        <a href="#">Categories</a>
        <div>
            {categories.map(item => <Link key={item.id} to={"/cat/" + item.id + "/" + item.name}>{item.name}</Link>)}
        </div>
    </div>
}
