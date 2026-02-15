import { Link } from 'react-router-dom'
import type { MenuType } from '../types/MenuType'

let menuItems = [
    { label: "Home", url: "/" },
    { label: "Categories", url: "/categories", "sub": [] }
]

export const TopMenu = async () => {
    return <Menu items={menuItems} />
}

export const BottomMenu = () => <></>

export const Menu = ({ items }: { items: MenuType }) => {
    let i = 1;
    return <nav>
        {items.map((item) => <Link key={i++} to={item.url}>{item.label}</Link>)}
    </nav>
}

