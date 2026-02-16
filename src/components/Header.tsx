import { TopMenu } from './Menu'
import { Basket } from './Basket'

export const Header = ({ categoriesState }) => (
    <header>
        <h1>SHOP</h1>
        <TopMenu categoriesState={categoriesState} />
        <Basket />
    </header>
)
