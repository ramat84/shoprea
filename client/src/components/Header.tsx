import { Link } from 'react-router'

import { TopMenu } from './Header/Menu'
import { Basket } from './Header/Basket'
import { Search } from './Header/Search'
import { User } from './Header/User'

import '../css/components/header.css'

export const Header = () => (
    <header>
        <Link to="/"><h1>Shop<span><u>R</u>ea</span></h1></Link>
        <TopMenu />
        <User />
        <Basket />
        <Search />
    </header>
)
