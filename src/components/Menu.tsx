import { Link } from 'react-router-dom'
import type { MenuType } from '../types/MenuType'
import { MenuCategories } from './MenuCategories'
import '../css/components/menu.css'

let menuItems = [
    { label: "Home", url: "/" },
]

export const TopMenu = ({ categoriesState }) => {
    return <Menu items={menuItems} categoriesState={categoriesState} />
}

export const BottomMenu = () => <></>

export const Menu = ({ items, categoriesState }: { items: MenuType, categoriesState: any }) => {
    let i = 1;

    return <nav className="menu">
        {items.map((item) => <Link key={i++} to={item.url}>{item.label}</Link>)}
        <MenuCategories categoriesState={categoriesState} />
        <Link to="/contact">Contact us</Link>
    </nav>
}

