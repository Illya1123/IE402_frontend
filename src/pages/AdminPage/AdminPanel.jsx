import React, { useState } from 'react'
import { 
    Layers3,
    Home, 
    Plane, 
    TicketCheck
} from 'lucide-react';
import { NavLink } from 'react-router-dom'

const AdminPanel = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard')

    return (
        <>
        <div className="w-65 bg-white border-r h-screen flex flex-col">
            <div className="h-16 flex items-center justify-center border-b">
                <h2 className="text-xl font-bold">Tour Admin</h2>
            </div>
            <nav div className="flex-1 p-4">
                <ul className="space-y-2">
                    {[
                        { key: '../admin-dashboard', icon: <Home />, label: 'Bảng Điều Khiển' },
                        { key: '../admin-manage-accounts', icon: <Layers3 />, label: 'Quản Lý Tài Khoản'},
                        { key: '../admin-manage-tours', icon: <Plane />, label: 'Quản Lý Tour' },
                        { key: '../admin-manage-bookings', icon: <TicketCheck />, label: 'Quản Lý Đặt Vé' }
                    ].map(item => (
                        <li 
                        key={item.key}
                        className={`${
                            activeMenu === item.key 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveMenu(item.key)}
                        >
                            <NavLink to={item.key} className={`flex items-center p-2 rounded cursor-pointer`}>
                                {React.cloneElement(item.icon, { className: 'mr-2' })}
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
        </>
    )
}

export default AdminPanel