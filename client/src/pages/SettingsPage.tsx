import { Link, useParams } from 'react-router'
import { Header } from '../components/Header'
import { UserSettings } from '../components/Settings/UserSettings'
import { Orders } from '../components/Settings/Orders'

import '../css/pages/settings.css'

export const SettingsPage = () => {
    const page = useParams().page ?? 'user'

    return (
        <>
            <Header />
            <h2>User Settings</h2>
            <div className="settings-container">
                <div className="panel">
                    <Link className={page == 'user' ? 'active' : ''} to="/settings/user">User</Link>
                    <Link className={page == 'orders' ? 'active' : ''} to="/settings/orders">Orders</Link>
                </div>
                <div className="content">
                    {page == 'user' && <UserSettings />}
                    {page == 'orders' && <Orders />}
                </div>
            </div>
        </>
    )
}
