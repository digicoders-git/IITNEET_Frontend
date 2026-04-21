import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Search, GraduationCap, Building2, Star, MapPin,
    IndianRupee, ArrowRight, Lock, CheckCircle, Phone, User
} from 'lucide-react';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [featured, setFeatured] = useState([]);
    const [unlocked, setUnlocked] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/featured`)
            .then(res => setFeatured(res.data))
            .catch(() => {})
            .finally(() => setLoadingFeatured(false));

        axios.get(`${import.meta.env.VITE_API_URL}/api/payment/unlocked`, {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => setUnlocked(res.data)).catch(() => {});
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="page-container pt-24 pb-12 space-y-6">

                {/* Search */}
                <div className="bg-blue-900 p-8 border-b-4 border-amber-500">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                Welcome, {user?.name?.split(' ')[0]}!
                            </h2>
                            <p className="text-blue-300 text-sm">Find the best tutors and coaching institutes near you.</p>
                        </div>
                        <Link to="/student/profile"
                            className="shrink-0 flex items-center gap-2 border-2 border-white text-white text-sm font-bold px-4 py-2 hover:bg-blue-800 transition-all">
                            <User size={15} /> My Profile
                        </Link>
                    </div>
                    <form onSubmit={e => { e.preventDefault(); navigate(`/tutors?search=${search}`); }}
                        className="flex gap-3 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" placeholder="Search by subject, city or tutor name..."
                                className="w-full pl-11 pr-4 py-3 bg-white text-gray-800 outline-none border-2 border-white focus:border-amber-400 placeholder:text-gray-400"
                                value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <button type="submit"
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 transition-all">
                            Search
                        </button>
                    </form>
                </div>

                {/* Quick Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: 'IIT-JEE Tutors', desc: 'Physics, Maths, Chemistry', icon: GraduationCap, link: '/tutors?subject=Physics' },
                        { name: 'NEET Tutors', desc: 'Biology, Chemistry, Physics', icon: GraduationCap, link: '/tutors?subject=Biology' },
                        { name: 'Coaching Institutes', desc: 'Top coaching centers', icon: Building2, link: '/coachings' },
                    ].map(cat => (
                        <Link key={cat.name} to={cat.link}
                            className="bg-white border-2 border-gray-200 p-5 hover:border-amber-500 transition-all group flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-900 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                                <cat.icon size={22} className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-900">{cat.name}</h4>
                                <p className="text-gray-400 text-xs">{cat.desc}</p>
                            </div>
                            <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-amber-500 transition-colors" />
                        </Link>
                    ))}
                </div>

                {/* Unlocked Tutors */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-blue-900">My Tutors</h3>
                        <Link to="/student/profile" className="text-sm font-bold text-amber-500 hover:underline flex items-center gap-1">
                            View all <ArrowRight size={14} />
                        </Link>
                    </div>
                    {unlocked.length === 0 ? (
                        <div className="bg-white border-2 border-gray-200 p-8 text-center">
                            <Lock size={32} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-blue-900 font-bold mb-1">No tutors unlocked yet</p>
                            <p className="text-gray-400 text-sm mb-4">Browse tutors and unlock their contact for ₹200</p>
                            <Link to="/tutors" className="btn btn-secondary px-6 text-sm">Browse Tutors</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {unlocked.slice(0, 3).map(u => (
                                <div key={u._id} className="bg-white border-2 border-gray-200 p-5 flex items-center gap-4 hover:border-amber-500 transition-all">
                                    <div className="w-12 h-12 bg-blue-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                        {u.tutor?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-blue-900 truncate">{u.tutor?.name}</p>
                                        <span className="flex items-center gap-1 text-green-600 text-xs font-bold mt-0.5">
                                            <CheckCircle size={12} /> Contact Unlocked
                                        </span>
                                        {u.tutor?.phone && (
                                            <a href={`tel:${u.tutor.phone}`}
                                                className="flex items-center gap-1 text-blue-900 text-xs font-bold hover:text-amber-500 mt-0.5">
                                                <Phone size={11} />{u.tutor.phone}
                                            </a>
                                        )}
                                    </div>
                                    <Link to={`/tutors/${u.tutor?._id}`}
                                        className="text-xs font-bold text-blue-900 border-2 border-blue-900 px-3 py-1.5 hover:bg-blue-900 hover:text-white transition-all shrink-0">
                                        View
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Featured Tutors */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-blue-900">Top Rated Tutors</h3>
                        <Link to="/tutors" className="text-sm font-bold text-amber-500 hover:underline flex items-center gap-1">
                            View all <ArrowRight size={14} />
                        </Link>
                    </div>
                    {loadingFeatured ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white border-2 border-gray-200 animate-pulse">
                                    <div className="h-16 bg-gray-200"></div>
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 bg-gray-100 w-2/3"></div>
                                        <div className="h-3 bg-gray-100 w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {featured.map(profile => (
                                <Link key={profile._id} to={`/tutors/${profile.user._id}`}
                                    className="bg-white border-2 border-gray-200 hover:border-amber-500 transition-all group block">
                                    <div className="bg-blue-900 p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-500 flex items-center justify-center text-white font-bold shrink-0">
                                            {profile.user?.name?.charAt(0)?.toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{profile.user?.name}</h4>
                                            {profile.ratings > 0 && (
                                                <span className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                                    <Star size={10} fill="currentColor" />{profile.ratings}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {(profile.subjects || []).slice(0, 2).map(s => (
                                                <span key={s} className="bg-blue-50 text-blue-900 text-xs font-semibold px-2 py-0.5 border border-blue-200">{s}</span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-400">
                                            {profile.location && (
                                                <span className="flex items-center gap-1"><MapPin size={11} />{profile.location}</span>
                                            )}
                                            {profile.fees && (
                                                <span className="flex items-center gap-0.5 font-bold text-blue-900">
                                                    <IndianRupee size={11} />{profile.fees}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
