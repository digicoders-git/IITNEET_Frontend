import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Users, CreditCard,
    Bell, LogOut, GraduationCap, Building2, Menu
} from 'lucide-react';

const DashboardLayout = ({ children, role }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/login'); };

    const menuItems = {
        admin: [
            { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
            { name: 'User Management', path: '/admin/users', icon: Users },
            { name: 'Coachings', path: '/admin/coachings', icon: Building2 },
            { name: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
            { name: 'Payments', path: '/admin/payments', icon: CreditCard },
        ],
        tutor: [
            { name: 'Dashboard', path: '/tutor', icon: LayoutDashboard, end: true },
            { name: 'Edit Profile', path: '/tutor/profile', icon: GraduationCap },
            { name: 'Subscription', path: '/tutor/subscription', icon: CreditCard },
        ],
        coaching: [
            { name: 'Dashboard', path: '/coaching', icon: LayoutDashboard, end: true },
            { name: 'Listing Details', path: '/coaching/details', icon: Building2 },
        ],
        student: [
            { name: 'Find Tutors', path: '/student', icon: GraduationCap, end: true },
            { name: 'Browse Institutes', path: '/coachings', icon: Building2 },
        ],
    };

    const navItems = menuItems[role] || [];
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&size=80&background=ede9fe&color=7c3aed&bold=true&rounded=true`;
    const sidebarW = isSidebarOpen ? 'w-60' : 'w-16';

    const SidebarContent = ({ collapsed }) => (
        <div className="flex flex-col h-full">
            <div className="p-5 flex items-center gap-3 border-b border-slate-100 shrink-0">
                <img src="/iitneet_logo.png" alt="IIT-NEET" className={`w-auto ${collapsed ? 'h-7' : 'h-9'}`} />
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink key={item.path} to={item.path} end={item.end}
                        onClick={() => setIsMobileOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm
                            ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`
                        }>
                        <item.icon size={19} className="shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t border-slate-100 shrink-0">
                {!collapsed && (
                    <div className="flex items-center gap-3 px-3 py-2 mb-1">
                        <img src={avatarUrl} alt={user?.name} className="w-8 h-8 rounded-full shrink-0" />
                        <div className="min-w-0">
                            <p className="font-bold text-sm text-slate-800 truncate">{user?.name}</p>
                            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                        </div>
                    </div>
                )}
                <button onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium text-sm">
                    <LogOut size={19} className="shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Desktop Sidebar — fixed */}
            <aside className={`hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-40 ${sidebarW}`}>
                <SidebarContent collapsed={!isSidebarOpen} />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileOpen(false)} />
                    <aside className="absolute left-0 top-0 h-full w-60 bg-white shadow-2xl">
                        <SidebarContent collapsed={false} />
                    </aside>
                </div>
            )}

            {/* Main Content — offset by sidebar width */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-60' : 'md:ml-16'}`}>
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <button
                        onClick={() => {
                            if (window.innerWidth < 768) setIsMobileOpen(!isMobileOpen);
                            else setIsSidebarOpen(!isSidebarOpen);
                        }}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                            <Bell size={19} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-2.5">
                            <div className="text-right hidden sm:block">
                                <p className="font-bold text-sm text-slate-800">{user?.name}</p>
                                <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                            </div>
                            <img src={avatarUrl} alt={user?.name} className="w-9 h-9 rounded-full border-2 border-indigo-100" />
                        </div>
                    </div>
                </header>

                <main className="p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

