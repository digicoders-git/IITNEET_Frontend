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
        { to: '/tutors', label: 'Find Tutors' },
        { to: '/coachings', label: 'Institutes' },
        { to: '/contact', label: 'Contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100 shadow-sm">
            <div className="page-container h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src="/iitneet_logo.png" alt="IIT-NEET" className="h-10 w-auto" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to}
                            className={`transition-colors ${isActive(link.to) ? 'text-orange-500 font-bold' : 'text-slate-600 hover:text-orange-500'}`}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link to={`/${user.role}`}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all">
                                My Dashboard
                            </Link>
                            <button onClick={logout}
                                className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login"
                                className="text-sm font-semibold px-4 py-2 text-slate-600 hover:text-orange-500 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/register"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-black text-sm transition-all shadow-lg shadow-orange-100">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                    onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-2">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                            className={`block text-sm font-semibold py-2.5 ${isActive(link.to) ? 'text-orange-500' : 'text-slate-600'}`}>
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                        {user ? (
                            <>
                                <Link to={`/${user.role}`} onClick={() => setMenuOpen(false)}
                                    className="bg-orange-500 text-white font-bold py-2.5 px-4 rounded-xl text-sm text-center">
                                    My Dashboard
                                </Link>
                                <button onClick={() => { logout(); setMenuOpen(false); }}
                                    className="text-sm font-semibold text-red-400 py-2">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)}
                                    className="font-semibold py-2.5 px-4 rounded-xl text-sm text-center border border-slate-200 text-slate-700">
                                    Sign In
                                </Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)}
                                    className="bg-orange-500 text-white font-black py-2.5 px-4 rounded-xl text-sm text-center">
                                    Get Started
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

