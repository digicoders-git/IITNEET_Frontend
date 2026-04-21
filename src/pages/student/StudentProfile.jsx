import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    User, Mail, Phone, Lock, Save, CheckCircle,
    GraduationCap, ArrowRight, LogOut, Settings, KeyRound,
    BookOpen, ChevronRight, Search, Star, MapPin,
    IndianRupee, Building2, LayoutDashboard, Eye, EyeOff
} from 'lucide-react';

const Label = ({ children }) => (
    <label className="text-sm font-bold text-blue-900 mb-1.5 block">{children}</label>
);

const StudentProfile = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
    const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
    const [unlocked, setUnlocked] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [profileMsg, setProfileMsg] = useState('');
    const [passMsg, setPassMsg] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPass, setSavingPass] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (user) setProfileForm({ name: user.name || '', phone: user.phone || '' });
        axios.get(`${import.meta.env.VITE_API_URL}/api/payment/unlocked`, {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => setUnlocked(res.data)).catch(() => {});
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/featured`)
            .then(res => setFeatured(res.data)).catch(() => {});
    }, [user]);

    const handleProfileSave = async () => {
        setSavingProfile(true); setProfileMsg('');
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/me`, profileForm, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            login({ ...user, name: res.data.name, phone: res.data.phone });
            setProfileMsg('success');
        } catch (err) {
            setProfileMsg(err.response?.data?.message || 'Update failed');
        } finally { setSavingProfile(false); }
    };

    const handlePassChange = async () => {
        setPassMsg('');
        if (passForm.newPassword !== passForm.confirmPassword) return setPassMsg('Passwords do not match');
        if (passForm.newPassword.length < 6) return setPassMsg('Minimum 6 characters required');
        setSavingPass(true);
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/change-password`,
                { currentPassword: passForm.currentPassword, newPassword: passForm.newPassword },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            setPassMsg('success');
            setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setPassMsg(err.response?.data?.message || 'Failed');
        } finally { setSavingPass(false); }
    };

    const menu = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'tutors', label: 'My Tutors', icon: BookOpen, badge: unlocked.length },
        { id: 'edit', label: 'Edit Profile', icon: Settings },
        { id: 'password', label: 'Change Password', icon: KeyRound },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-blue-900 pt-20 border-b-4 border-amber-500">
                <div className="page-container py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-amber-500 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">{user?.name}</h1>
                                <p className="text-blue-300 text-sm">{user?.email}</p>
                                <span className="bg-amber-500 text-white text-xs font-bold uppercase px-2 py-0.5 mt-1 inline-block">Student</span>
                            </div>
                        </div>
                        <button onClick={logout}
                            className="flex items-center gap-2 text-sm font-semibold text-blue-200 hover:text-amber-400 transition-colors">
                            <LogOut size={15} /> Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="page-container py-8">
                <div className="grid md:grid-cols-4 gap-6">

                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white border-2 border-gray-200 overflow-hidden">
                            {menu.map((item, i) => (
                                <button key={item.id} onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all ${i !== 0 ? 'border-t-2 border-gray-100' : ''} ${activeSection === item.id ? 'bg-blue-900' : 'hover:bg-gray-50'}`}>
                                    <item.icon size={17} className={activeSection === item.id ? 'text-amber-400' : 'text-gray-400'} />
                                    <span className={`font-bold text-sm flex-1 ${activeSection === item.id ? 'text-white' : 'text-gray-700'}`}>
                                        {item.label}
                                    </span>
                                    {item.badge > 0 && (
                                        <span className={`text-xs font-bold px-2 py-0.5 ${activeSection === item.id ? 'bg-amber-500 text-white' : 'bg-blue-100 text-blue-900'}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                    <ChevronRight size={14} className={activeSection === item.id ? 'text-blue-300' : 'text-gray-300'} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 space-y-5">

                        {/* ── DASHBOARD ── */}
                        {activeSection === 'dashboard' && (
                            <>
                                {/* Search Bar */}
                                <div className="bg-blue-900 p-6 border-b-4 border-amber-500">
                                    <h3 className="font-bold text-white mb-1">Find Your Best Tutor</h3>
                                    <p className="text-blue-300 text-sm mb-4">Search tutors by subject, city or name</p>
                                    <form onSubmit={e => { e.preventDefault(); navigate(`/tutors?search=${search}`); }}
                                        className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 outline-none border-2 border-white focus:border-amber-400 placeholder:text-gray-400 text-sm"
                                                placeholder="Search by subject, city or name..."
                                                value={search} onChange={e => setSearch(e.target.value)} />
                                        </div>
                                        <button type="submit"
                                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 text-sm transition-all">
                                            Search
                                        </button>
                                    </form>
                                </div>

                                {/* Quick Links */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { name: 'IIT-JEE Tutors', icon: GraduationCap, link: '/tutors?subject=Physics' },
                                        { name: 'NEET Tutors', icon: GraduationCap, link: '/tutors?subject=Biology' },
                                        { name: 'Coaching Institutes', icon: Building2, link: '/coachings' },
                                    ].map(cat => (
                                        <Link key={cat.name} to={cat.link}
                                            className="bg-white border-2 border-gray-200 p-4 hover:border-amber-500 transition-all group flex flex-col items-center text-center gap-2">
                                            <cat.icon size={22} className="text-blue-900 group-hover:text-amber-500 transition-colors" />
                                            <span className="font-bold text-blue-900 text-xs">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Featured Tutors */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-bold text-blue-900">Top Rated Tutors</h3>
                                        <Link to="/tutors" className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1">
                                            View all <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {featured.slice(0, 4).map(profile => (
                                            <Link key={profile._id} to={`/tutors/${profile.user._id}`}
                                                className="bg-white border-2 border-gray-200 hover:border-amber-500 transition-all group flex">
                                                <div className="bg-blue-900 p-4 flex items-center justify-center w-16 shrink-0">
                                                    <span className="text-white font-bold text-xl">
                                                        {profile.user?.name?.charAt(0)?.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="p-3 flex-1 min-w-0">
                                                    <p className="font-bold text-blue-900 text-sm truncate">{profile.user?.name}</p>
                                                    <div className="flex flex-wrap gap-1 my-1">
                                                        {(profile.subjects || []).slice(0, 2).map(s => (
                                                            <span key={s} className="bg-blue-50 text-blue-900 text-xs font-semibold px-1.5 py-0.5 border border-blue-200">{s}</span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        {profile.ratings > 0 && (
                                                            <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                                                <Star size={10} fill="currentColor" />{profile.ratings}
                                                            </span>
                                                        )}
                                                        {profile.location && (
                                                            <span className="flex items-center gap-0.5">
                                                                <MapPin size={10} />{profile.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── MY TUTORS ── */}
                        {activeSection === 'tutors' && (
                            <div className="bg-white border-2 border-gray-200">
                                <div className="px-6 py-4 border-b-2 border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h2 className="font-bold text-blue-900 text-lg">My Tutors</h2>
                                        <p className="text-gray-400 text-sm mt-0.5">Tutors whose contact you have unlocked</p>
                                    </div>
                                    <Link to="/tutors" className="btn btn-outline text-sm px-4 py-2">Browse More</Link>
                                </div>
                                <div className="p-6">
                                    {unlocked.length === 0 ? (
                                        <div className="text-center py-12">
                                            <GraduationCap size={40} className="mx-auto text-gray-300 mb-3" />
                                            <p className="text-blue-900 font-bold mb-1">No tutors unlocked yet</p>
                                            <p className="text-gray-400 text-sm mb-5">Browse tutors and unlock their contact for ₹200</p>
                                            <Link to="/tutors" className="btn btn-secondary px-6 text-sm">Browse Tutors</Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {unlocked.map(u => (
                                                <div key={u._id} className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-gray-200 hover:border-amber-500 transition-all">
                                                    <div className="w-12 h-12 bg-blue-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                                        {u.tutor?.name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-blue-900">{u.tutor?.name}</p>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                                                                <CheckCircle size={12} /> Contact Unlocked
                                                            </span>
                                                            {u.tutor?.phone && (
                                                                <a href={`tel:${u.tutor.phone}`}
                                                                    className="flex items-center gap-1 text-blue-900 text-xs font-bold hover:text-amber-500 transition-colors">
                                                                    <Phone size={12} />{u.tutor.phone}
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Link to={`/tutors/${u.tutor?._id}`}
                                                        className="flex items-center gap-1 text-xs font-bold text-blue-900 border-2 border-blue-900 px-3 py-1.5 hover:bg-blue-900 hover:text-white transition-all shrink-0">
                                                        View <ArrowRight size={12} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── EDIT PROFILE ── */}
                        {activeSection === 'edit' && (
                            <div className="bg-white border-2 border-gray-200">
                                <div className="px-6 py-4 border-b-2 border-gray-100">
                                    <h2 className="font-bold text-blue-900 text-lg">Edit Profile</h2>
                                    <p className="text-gray-400 text-sm mt-0.5">Update your personal information</p>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <Label>Full Name</Label>
                                            <input className="input-field" placeholder="Your name"
                                                value={profileForm.name}
                                                onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))} />
                                        </div>
                                        <div>
                                            <Label>Phone Number</Label>
                                            <input className="input-field" placeholder="+91 98765 43210"
                                                value={profileForm.phone}
                                                onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Email Address</Label>
                                        <input className="input-field bg-gray-50 cursor-not-allowed opacity-60"
                                            value={user?.email} disabled />
                                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                                    </div>
                                    {profileMsg === 'success' && (
                                        <div className="flex items-center gap-2 text-green-700 text-sm font-semibold bg-green-50 p-3 border-2 border-green-200">
                                            <CheckCircle size={16} /> Profile updated successfully!
                                        </div>
                                    )}
                                    {profileMsg && profileMsg !== 'success' && (
                                        <p className="text-red-600 text-sm font-semibold bg-red-50 p-3 border-2 border-red-200">{profileMsg}</p>
                                    )}
                                    <button onClick={handleProfileSave} disabled={savingProfile}
                                        className="btn btn-secondary gap-2 px-8 flex items-center">
                                        <Save size={15} /> {savingProfile ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── CHANGE PASSWORD ── */}
                        {activeSection === 'password' && (
                            <div className="bg-white border-2 border-gray-200">
                                <div className="px-6 py-4 border-b-2 border-gray-100">
                                    <h2 className="font-bold text-blue-900 text-lg">Change Password</h2>
                                    <p className="text-gray-400 text-sm mt-0.5">Keep your account secure</p>
                                </div>
                                <div className="p-6 space-y-5 max-w-md">
                                    {[
                                        { key: 'currentPassword', showKey: 'current', label: 'Current Password', placeholder: 'Enter current password' },
                                        { key: 'newPassword', showKey: 'new', label: 'New Password', placeholder: 'Min. 6 characters' },
                                        { key: 'confirmPassword', showKey: 'confirm', label: 'Confirm New Password', placeholder: 'Repeat new password' },
                                    ].map(field => (
                                        <div key={field.key}>
                                            <Label>{field.label}</Label>
                                            <div className="relative">
                                                <input
                                                    type={showPass[field.showKey] ? 'text' : 'password'}
                                                    className="input-field pr-11"
                                                    placeholder={field.placeholder}
                                                    value={passForm[field.key]}
                                                    onChange={e => setPassForm(f => ({ ...f, [field.key]: e.target.value }))} />
                                                <button type="button"
                                                    onClick={() => setShowPass(s => ({ ...s, [field.showKey]: !s[field.showKey] }))}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-900">
                                                    {showPass[field.showKey] ? <EyeOff size={15} /> : <Eye size={15} />}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {passMsg === 'success' && (
                                        <div className="flex items-center gap-2 text-green-700 text-sm font-semibold bg-green-50 p-3 border-2 border-green-200">
                                            <CheckCircle size={16} /> Password changed successfully!
                                        </div>
                                    )}
                                    {passMsg && passMsg !== 'success' && (
                                        <p className="text-red-600 text-sm font-semibold bg-red-50 p-3 border-2 border-red-200">{passMsg}</p>
                                    )}
                                    <button onClick={handlePassChange} disabled={savingPass}
                                        className="btn btn-secondary gap-2 px-8 flex items-center">
                                        <KeyRound size={15} /> {savingPass ? 'Changing...' : 'Change Password'}
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudentProfile;
