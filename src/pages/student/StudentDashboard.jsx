import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Search, GraduationCap, Building2, Star, Clock, MapPin, IndianRupee, ArrowRight, Atom, Lock, CheckCircle2, Phone, User } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [featured, setFeatured] = useState([]);
    const [unlocked, setUnlocked] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);
    const [loadingUnlocked, setLoadingUnlocked] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Featured tutors
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/featured`)
            .then(res => setFeatured(res.data))
            .catch(() => {})
            .finally(() => setLoadingFeatured(false));

        // Unlocked contacts
        axios.get(`${import.meta.env.VITE_API_URL}/api/payment/unlocked`, {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => setUnlocked(res.data))
          .catch(() => {})
          .finally(() => setLoadingUnlocked(false));
    }, [user]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/tutors?search=${search}`);
    };

    const categories = [
        { name: 'IIT-JEE', desc: 'Physics, Maths, Chemistry', icon: Atom, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/tutors?subject=Physics' },
        { name: 'NEET', desc: 'Biology, Chemistry, Physics', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/tutors?subject=Biology' },
        { name: 'Institutes', desc: 'Top coaching centers', icon: Building2, color: 'text-rose-600', bg: 'bg-rose-50', link: '/coachings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="page-container pt-24 pb-12 space-y-8">
            {/* Search */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-black text-white mb-1">Welcome, {user?.name?.split(' ')[0]}! 👋</h2>
                            <p className="text-blue-300 text-sm">Search for the best tutors and institutes.</p>
                        </div>
                        <Link to="/student/profile"
                            className="shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all">
                            <User size={15} /> My Profile
                        </Link>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-3 mt-5">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Search by subject or name..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-slate-800 outline-none placeholder:text-slate-400"
                                value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-6 py-3 rounded-xl transition-all">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Unlocked Tutors */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-xl font-black text-slate-900">My Tutors</h3>
                        <p className="text-slate-400 text-sm">Tutors whose contact you have unlocked</p>
                    </div>
                </div>

                {loadingUnlocked ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 h-28 animate-pulse"></div>
                        ))}
                    </div>
                ) : unlocked.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
                        <Lock size={32} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-slate-600 font-bold mb-1">No tutors unlocked yet</p>
                        <p className="text-slate-400 text-sm mb-4">Browse tutors and unlock their contact for ₹200</p>
                        <Link to="/tutors" className="btn btn-primary px-6 text-sm">Browse Tutors</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {unlocked.map(u => (
                            <div key={u._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.tutor?.name || 'T')}&size=60&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                                    alt={u.tutor?.name}
                                    className="w-14 h-14 rounded-xl shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-black text-slate-900 truncate">{u.tutor?.name}</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                                        <span className="text-emerald-600 text-xs font-bold">Contact Unlocked</span>
                                    </div>
                                    {u.tutor?.phone && (
                                        <a href={`tel:${u.tutor.phone}`} className="flex items-center gap-1.5 mt-1 text-indigo-600 font-bold text-sm hover:underline">
                                            <Phone size={13} />{u.tutor.phone}
                                        </a>
                                    )}
                                </div>
                                <Link to={`/tutors/${u.tutor?._id}`} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shrink-0">
                                    View
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map(cat => (
                    <Link key={cat.name} to={cat.link}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group flex items-center gap-4">
                        <div className={`${cat.bg} ${cat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                            <cat.icon size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-slate-800">{cat.name}</h4>
                            <p className="text-slate-400 text-xs">{cat.desc}</p>
                        </div>
                        <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>

            {/* Featured Tutors */}
            <div>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h3 className="text-xl font-black text-slate-900">Top Rated Tutors</h3>
                        <p className="text-slate-400 text-sm">Verified educators with proven results</p>
                    </div>
                    <Link to="/tutors" className="text-sm font-black text-indigo-600 flex items-center gap-1 hover:underline">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                {loadingFeatured ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
                                <div className="h-20 bg-slate-200"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {featured.map(profile => (
                            <Link key={profile._id} to={`/tutors/${profile.user._id}`}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden block">
                                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-5 flex items-center gap-3">
                                    <img
                                        src={profile?.profileImage ? `${import.meta.env.VITE_API_URL}${profile.profileImage}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user?.name)}&size=60&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                                        alt={profile.user?.name} className="w-12 h-12 rounded-xl border-2 border-white/20 object-cover"
                                    />
                                    <div>
                                        <h4 className="font-black text-white text-sm">{profile.user?.name}</h4>
                                        {profile.ratings > 0 && (
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <Star size={10} className="text-amber-400 fill-amber-400" />
                                                <span className="text-white/80 text-xs">{profile.ratings}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {(profile.subjects || []).slice(0, 2).map(s => (
                                            <span key={s} className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-lg">{s}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span className="flex items-center gap-1"><Clock size={11} />{profile.experience} yrs</span>
                                        <span className="flex items-center gap-1"><MapPin size={11} />{profile.location}</span>
                                        {profile.fees && <span className="flex items-center gap-0.5 font-black text-slate-700"><IndianRupee size={11} />{profile.fees}</span>}
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





