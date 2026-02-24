import { Link } from 'react-router-dom'
import type { MenuType } from '../../types/MenuType'
import { MenuCategories } from '../MenuCategories'
import '../../css/components/menu.css'

let menuItems = [
    { label: "Home", url: "/" },
]

export const TopMenu = () => {
    return <Menu items={menuItems} />
}

export const BottomMenu = () => <></>

export const Menu = ({ items }: { items: MenuType }) => {
    let i = 1;

    return <nav className="menu">
        {items.map((item) => <Link key={i++} to={item.url}>{item.label}</Link>)}
        <MenuCategories />
        <Link to="/contact">Contact us</Link>
    </nav>
}

