import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { user, allUsers, logout } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const helpRef = useRef(null);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/register?role=tutor', label: 'Become a Tutor' },
        { to: '/tutors', label: 'Tutors' },
        { to: '/coachings', label: 'Coaching Institute' },
        { to: '/advertising', label: 'Advertising' },
    ];

    const helpLinks = [
        { to: '/help', label: 'Help Center' },
        { to: '/contact', label: 'Contact Us' },
    ];

    const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path.split('?')[0]));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (helpRef.current && !helpRef.current.contains(event.target)) {
                setHelpOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-blue-900 border-b-4 border-amber-500">
            <div className="page-container h-16 flex items-center justify-between">
                {/* Logo — text only */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="iitneet.com Logo"
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
                    
                    {/* Help Dropdown */}
                    <div className="relative" ref={helpRef}>
                        <button 
                            onClick={() => setHelpOpen(!helpOpen)}
                            className={`px-3 py-2 flex items-center gap-1 transition-colors ${helpLinks.some(l => isActive(l.to)) ? 'text-amber-400 border-b-2 border-amber-400' : 'text-white hover:text-amber-400'}`}
                        >
                            Help <ChevronDown size={14} className={`transition-transform ${helpOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {helpOpen && (
                            <div className="absolute right-0 mt-1 w-40 bg-white shadow-xl border border-gray-100 py-2 z-[60]">
                                {helpLinks.map(link => (
                                    <Link 
                                        key={link.to} 
                                        to={link.to} 
                                        onClick={() => setHelpOpen(false)}
                                        className={`block px-4 py-2 text-sm ${isActive(link.to) ? 'text-blue-900 bg-blue-50 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {(allUsers?.admin || allUsers?.tutor || allUsers?.coaching || allUsers?.student) ? (
                        <div className="flex items-center gap-2">
                            {allUsers.admin && (
                                <Link to="/admin" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 font-bold text-xs rounded transition-all">
                                    Admin Panel
                                </Link>
                            )}
                            {allUsers.tutor && (
                                <Link to="/tutor" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 font-bold text-xs rounded transition-all">
                                    Tutor Panel
                                </Link>
                            )}
                            {allUsers.coaching && (
                                <Link to="/coaching" className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 font-bold text-xs rounded transition-all">
                                    Coaching Panel
                                </Link>
                            )}
                            {allUsers.student && (
                                <Link to="/student" className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 font-bold text-xs rounded transition-all">
                                    Student Panel
                                </Link>
                            )}
                            <button onClick={() => logout()} className="text-xs font-semibold text-white hover:text-amber-400 ml-2 transition-colors">
                                Logout All
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
                    
                    {/* Mobile Help Section */}
                    <div className="py-2 border-b border-blue-800">
                        <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Help & Support</p>
                        {helpLinks.map(link => (
                            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                                className={`block text-sm font-semibold py-2 ${isActive(link.to) ? 'text-amber-400' : 'text-blue-100'}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-3 flex flex-col gap-2">
                        {(allUsers?.admin || allUsers?.tutor || allUsers?.coaching || allUsers?.student) ? (
                            <>
                                {allUsers.admin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="bg-red-600 text-white font-bold py-2 px-4 text-sm text-center rounded">Admin Panel</Link>}
                                {allUsers.tutor && <Link to="/tutor" onClick={() => setMenuOpen(false)} className="bg-blue-600 text-white font-bold py-2 px-4 text-sm text-center rounded">Tutor Panel</Link>}
                                {allUsers.coaching && <Link to="/coaching" onClick={() => setMenuOpen(false)} className="bg-purple-600 text-white font-bold py-2 px-4 text-sm text-center rounded">Coaching Panel</Link>}
                                {allUsers.student && <Link to="/student" onClick={() => setMenuOpen(false)} className="bg-emerald-600 text-white font-bold py-2 px-4 text-sm text-center rounded">Student Panel</Link>}
                                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-sm font-semibold text-blue-200 py-2">Logout All</button>
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
