import { useState } from 'react'
import { Link, useParams } from 'react-router'

import { Header } from '../components/Header'
import { UserSettings } from '../components/Settings/UserSettings'
import { Orders } from '../components/Settings/Orders'
import { AdminCategories } from './admin/AdminCategories'

import { ModalContext } from '../contexts/ModalContext'
import { ModalComponent } from '../components/ModalComponent';

import '../css/pages/settings.css'

export const SettingsPage = () => {
    const page = useParams().page ?? 'user'
    const modalState = useState(false)

    return (
        <ModalContext.Provider value={modalState}>
            <Header />
            <h2>User Settings</h2>
            <div className="settings-container">
                <div className="panel">
                    <Link className={page == 'user' ? 'active' : ''} to="/settings/user">User</Link>
                    <Link className={page == 'orders' ? 'active' : ''} to="/settings/orders">Orders</Link>
                    <Link className={page == 'categories' ? 'active' : ''} to="/settings/categories">Categories</Link>
                </div>
                <div className="content">
                    {page == 'user' && <UserSettings />}
                    {page == 'orders' && <Orders />}
                    {page == 'categories' && <AdminCategories />}
                </div>
            </div>
            <ModalComponent />
        </ModalContext.Provider>
    )
}
