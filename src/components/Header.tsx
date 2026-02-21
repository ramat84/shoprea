import { Link } from 'react-router'

import { TopMenu } from './Menu'
import { Basket } from './Basket'
import { Search } from './Search'

export const Header = () => (
    <header>
        <Link to="/"><h1>Shop<span>Rea</span></h1></Link>
        <TopMenu />
        <Search />
        <Basket />
    </header>
)
