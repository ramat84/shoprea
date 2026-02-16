import './css/App.css'
import './css/bootstrap.css'
import './css/config.css'

import { TopMenu, BottomMenu } from './components/Menu'
import { Copyright } from './components/Copyright'
import { Content } from './components/Content'

function App() {
    return (
        <>
            <header>
                <h1>SHOP</h1>
                <TopMenu />
            </header>
            <Content />
            <footer>
                <BottomMenu />
                <Copyright />
            </footer>
        </>
    )
}

export default App
