import React from 'react'
import Sidebar from './components/Sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='flex w-full h-screen gap-10'>
            <Sidebar />
            {children}
        </main>
    )
}

export default DashboardLayout