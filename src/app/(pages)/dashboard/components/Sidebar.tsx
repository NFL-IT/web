import React from 'react'
import ItemMenu from './ItemMenu'
import HomeIcon from './icons/Home'
import DashboardIcon from './icons/Dashboard'
import UsersIcon from './icons/Users'
import ClientIcon from './icons/Client'
import ReportIcon from './icons/Report'
import LogoutIcon from './icons/Logout'

const Sidebar = () => {
    return (
        <aside className='bg-blue-900 text-white p-4 h-screen max-w-[200px] flex flex-col justify-between'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
                <ul className='flex flex-col gap-2'>
                    <li className='flex items-center gap-2'>
                        <ItemMenu href='/' text='Home' icon={<HomeIcon />} />
                    </li>
                    <li>
                        <ItemMenu href='/dashboard' text='Dashboard' icon={<DashboardIcon />} />
                    </li>
                    <li>
                        <ItemMenu href='/dashboard/users' text='Users' icon={<UsersIcon />} />
                    </li>
                    <li>
                        <ItemMenu href='/dashboard/clients' text='Clients' icon={<ClientIcon />} />
                    </li>
                    <li>
                        <ItemMenu href='/dashboard/reports' text='Reports' icon={<ReportIcon />} />
                    </li>
                </ul>
            </div>

            <ItemMenu href='/logout' text='Log Out' icon={<LogoutIcon />} /> 
        </aside>
    )
}

export default Sidebar