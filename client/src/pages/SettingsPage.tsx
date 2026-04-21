import { useState, useContext } from 'react'
import { Link, useParams } from 'react-router'

import { Header } from '../components/Header'
import { UserSettings } from '../components/Settings/UserSettings'
import { Orders } from '../components/Settings/Orders'

import { ModalContext } from '../contexts/ModalContext'
import { ModalComponent } from '../components/ModalComponent';
import { UserContext } from '../contexts/UserContext.tsx';

import '../css/pages/settings.css'
import { AdminCategories } from './admin/AdminCategories'
import { AdminProducts } from './admin/AdminProducts'

const SettingsPage = () => {
    const curPage = useParams().page ?? 'user'
    const modalState = useState(false)
    const user = (useContext(UserContext))[0]

    const PageLink = ({ page, title }: { page: string, title: string }) => {
        return <Link className={page == curPage ? 'active' : ''} to={`/settings/${page}`}>{title}</Link>
    }

    const Panel = () => {
        if (curPage == 'user') return <UserSettings />
        if (curPage == 'orders') return <Orders />
        if (curPage == 'categories') return <AdminCategories />
        if (curPage == 'products') return <AdminProducts />

        return <></>;
    }

    return (
        <ModalContext.Provider value={modalState}>
            <Header />
            <h2>User Settings</h2>
            <div className="settings-container">
                <div className="panel">
                    <PageLink page='user' title='User' />
                    <PageLink page='orders' title='Orders' />
                    <PageLink page='categories' title='Categories' />
                    <PageLink page='products' title='Products' />
                </div>
                <div className="content">
                    {!user && <div className='notice'>Please Log in</div>}
                    {user && <Panel />}
                </div>
            </div>
            <ModalComponent />
        </ModalContext.Provider>
    )
}

export default SettingsPage
