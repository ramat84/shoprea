import { useContext } from 'react'
import { Link } from 'react-router'
import Cookies from "js-cookie"

import { UserContext } from '../../contexts/UserContext'


export const Signin = () => {
    const [user, setUser] = useContext(UserContext)

    const SignOut = () => {
        Cookies.remove('session')
        setUser(undefined)
    }

    return <span className="btn-signin">
        {user ? user.name + ' | ' : ''}
        {!user && <Link to="/signin">Sign in</Link>}
        {user && <Link to="/" onClick={SignOut}>Sign out</Link>}
    </span>
}
