import { Link } from 'react-router-dom'
import { MenuCategories } from '../MenuCategories'
import '../../css/components/menu.css'

export const TopMenu = () => {
    return <nav className="menu">
        <Link key="menu-all" to="/">All Products</Link>
        <MenuCategories />
        <Link key="menu-sale" to="/sale">On sale</Link>
        <Link key="menu-contact" to="/contact">Contact us</Link>
    </nav>
}

