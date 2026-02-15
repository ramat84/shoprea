import { Link } from 'react-router-dom'
import type { MenuType } from '../types/MenuType'

const menuItems = [
    { label: "Home", url: "/" },
    {
        label: "Categories", url: "/categories", "sub": [
            { label: "Category 1", url: "#" },
            { label: "Category 2", url: "#" },
            { label: "Category 3", url: "#" }
        ]
    }
]

export const TopMenu = () => <Menu items={menuItems} />
export const BottomMenu = () => <></>

export const Menu = ({ items }: { items: MenuType }) => {
    let i = 1;
    return <nav>
        {items.map((item) => <Link key={i++} to={item.url}>{item.label}</Link>)}
    </nav>
}

