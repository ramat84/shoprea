import './App.css'
import { TopMenu, BottomMenu } from './components/Menu'
import { BottomLine } from './components/BottomLine'
import { Content } from './components/Content'

function App() {
    return (
        <>
            <TopMenu />
            <Content />
            <BottomMenu />
            <BottomLine />
        </>
    )
}

export default App
