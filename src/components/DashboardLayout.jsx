import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, CreditCard, Bell, LogOut, GraduationCap, Building2, Menu } from 'lucide-react';

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
            { name: 'Subscription', path: '/coaching/subscription', icon: CreditCard },
        ],
        student: [
            { name: 'Find Tutors', path: '/student', icon: GraduationCap, end: true },
            { name: 'Browse Institutes', path: '/coachings', icon: Building2 },
        ],
    };

    const navItems = menuItems[role] || [];
    const sidebarW = isSidebarOpen ? 'w-60' : 'w-16';

    const SidebarContent = ({ collapsed }) => (
        <div className="flex flex-col h-full">
            <div className="p-5 flex items-center gap-3 border-b-2 border-blue-800 shrink-0 bg-blue-900">
                {collapsed ? (
                    <span className="text-amber-400 font-bold text-lg">IN</span>
                ) : (
                    <span className="text-white font-bold text-lg">IIT<span className="text-amber-400">-NEET</span>.com</span>
                )}
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto bg-blue-900">
                {navItems.map((item) => (
                    <NavLink key={item.path} to={item.path} end={item.end}
                        onClick={() => setIsMobileOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 transition-all font-medium text-sm
                            ${isActive ? 'bg-amber-500 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`
                        }>
                        <item.icon size={19} className="shrink-0" />
                        {!collapsed && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t-2 border-blue-800 shrink-0 bg-blue-900">
                {!collapsed && (
                    <div className="flex items-center gap-3 px-3 py-2 mb-1">
                        <div className="w-8 h-8 bg-amber-500 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="font-bold text-sm text-white truncate">{user?.name}</p>
                            <p className="text-xs text-blue-300 capitalize">{user?.role}</p>
                        </div>
                    </div>
                )}
                <button onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-red-300 hover:bg-blue-800 hover:text-red-200 transition-all font-medium text-sm">
                    <LogOut size={19} className="shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex flex-col fixed left-0 top-0 h-screen transition-all duration-300 z-40 ${sidebarW}`}>
                <SidebarContent collapsed={!isSidebarOpen} />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileOpen(false)} />
                    <aside className="absolute left-0 top-0 h-full w-60">
                        <SidebarContent collapsed={false} />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-60' : 'md:ml-16'}`}>
                <header className="h-16 bg-white border-b-2 border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <button
                        onClick={() => {
                            if (window.innerWidth < 768) setIsMobileOpen(!isMobileOpen);
                            else setIsSidebarOpen(!isSidebarOpen);
                        }}
                        className="p-2 hover:bg-gray-100 text-gray-600">
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="text-right hidden sm:block">
                                <p className="font-bold text-sm text-blue-900">{user?.name}</p>
                                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                            </div>
                            <div className="w-9 h-9 bg-blue-900 flex items-center justify-center text-white font-bold text-sm">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </div>
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
