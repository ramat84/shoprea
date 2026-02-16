import './css/bootstrap.css'
import './css/config.css'
import { TopMenu, BottomMenu } from './components/Menu'
import { Copyright } from './components/Copyright'
import { Content } from './components/Content'

function App() {
    return (
        <>
            <h1>SHOP</h1>
            <TopMenu />
            <Content />
            <BottomMenu />
            <Copyright />
        </>
    )
}

export default App
