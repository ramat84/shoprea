import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

export const MenuCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/categories`)
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    return <div className="sub-menu">
        <a href="#">Categories</a>
        <div>
            {categories.map(item => <Link key={item.id} to="#">{item.name}</Link>)}
        </div>
    </div>
}
