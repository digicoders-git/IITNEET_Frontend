import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/register?role=tutor', label: 'Become a Tutor' },
        { to: '/tutors', label: 'Tutors' },
        { to: '/coachings', label: 'Coaching Institutes' },
        { to: '/advertising', label: 'Advertising' },
        { to: '/contact', label: 'Help' },
    ];

    const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path.split('?')[0]));

    return (
        <nav className="fixed top-0 w-full z-50 bg-blue-900 border-b-4 border-amber-500">
            <div className="page-container h-16 flex items-center justify-between">
                {/* Logo — text only */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="IIT-NEET.com Logo"
                        className="h-8 w-auto brightness-0 invert"
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1 text-sm font-semibold">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to}
                            className={`px-3 py-2 transition-colors ${isActive(link.to) ? 'text-amber-400 border-b-2 border-amber-400' : 'text-white hover:text-amber-400'}`}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to={`/${user.role}`}
                                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 font-bold text-sm transition-all">
                                My Dashboard
                            </Link>
                            <button onClick={logout}
                                className="text-sm font-semibold text-white hover:text-amber-400 transition-colors">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login"
                                className="text-sm font-semibold px-4 py-2 text-white hover:text-amber-400 transition-colors">
                                Login
                            </Link>
                            <Link to="/register"
                                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 font-bold text-sm transition-all">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2 text-white hover:text-amber-400"
                    onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border-t-2 border-amber-500 bg-blue-900 px-6 py-4 space-y-1">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                            className={`block text-sm font-semibold py-2.5 border-b border-blue-800 ${isActive(link.to) ? 'text-amber-400' : 'text-blue-100'}`}>
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 flex flex-col gap-2">
                        {user ? (
                            <>
                                <Link to={`/${user.role}`} onClick={() => setMenuOpen(false)}
                                    className="bg-amber-500 text-white font-bold py-2.5 px-4 text-sm text-center">
                                    My Dashboard
                                </Link>
                                <button onClick={() => { logout(); setMenuOpen(false); }}
                                    className="text-sm font-semibold text-blue-200 py-2">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)}
                                    className="font-semibold py-2.5 px-4 text-sm text-center border-2 border-blue-600 text-blue-100">
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)}
                                    className="bg-amber-500 text-white font-bold py-2.5 px-4 text-sm text-center">
                                    Register Free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
