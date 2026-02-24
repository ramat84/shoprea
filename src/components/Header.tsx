import { Link } from 'react-router'

import { TopMenu } from './Header/Menu'
import { Basket } from './Header/Basket'
import { Search } from './Header/Search'
import { Signin } from './Header/Signin'

import '../css/components/header.css'

export const Header = () => (
    <header>
        <Link to="/"><h1>Shop<span>Rea</span></h1></Link>
        <TopMenu />
        <Signin />
        <Search />
        <Basket />
    </header>
)
