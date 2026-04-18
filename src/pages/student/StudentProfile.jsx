import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    User, Mail, Phone, Lock, Save, CheckCircle2, Eye, EyeOff,
    GraduationCap, ArrowRight, LogOut, Settings, KeyRound,
    BookOpen, ChevronRight, Search, Star, Clock, MapPin,
    IndianRupee, Atom, Building2, LayoutDashboard
} from 'lucide-react';

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
        axios.get('$env:VITE_API_URL/api/payment/unlocked', {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => setUnlocked(res.data)).catch(() => {});
        axios.get('$env:VITE_API_URL/api/profiles/featured')
            .then(res => setFeatured(res.data)).catch(() => {});
    }, [user]);

    const handleProfileSave = async () => {
        setSavingProfile(true); setProfileMsg('');
        try {
            const res = await axios.put('$env:VITE_API_URL/api/auth/me', profileForm, {
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
            await axios.put('$env:VITE_API_URL/api/auth/change-password',
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
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Overview & search' },
        { id: 'tutors', label: 'My Tutors', icon: BookOpen, desc: `${unlocked.length} unlocked`, badge: unlocked.length },
        { id: 'edit', label: 'Edit Profile', icon: Settings, desc: 'Update your info' },
        { id: 'password', label: 'Change Password', icon: KeyRound, desc: 'Update password' },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 pt-20">
                <div className="page-container py-8">
                    <div className="flex items-center gap-5">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'S')}&size=80&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                            alt={user?.name} className="w-16 h-16 rounded-2xl border-4 border-white/20 shadow-xl"
                        />
                        <div>
                            <h1 className="text-xl font-black text-white">{user?.name}</h1>
                            <p className="text-blue-300 text-sm">{user?.email}</p>
                            <span className="bg-white/10 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mt-1.5 inline-block border border-white/20">Student</span>
                        </div>
                        <button onClick={logout}
                            className="ml-auto flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all border border-white/10">
                            <LogOut size={15} /> Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="page-container py-8">
                <div className="grid md:grid-cols-4 gap-6">

                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            {menu.map((item, i) => (
                                <button key={item.id} onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all ${i !== 0 ? 'border-t border-slate-50' : ''} ${activeSection === item.id ? 'bg-indigo-600' : 'hover:bg-slate-50'}`}>
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${activeSection === item.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                                        <item.icon size={17} className={activeSection === item.id ? 'text-white' : 'text-slate-500'} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-bold text-sm ${activeSection === item.id ? 'text-white' : 'text-slate-800'}`}>{item.label}</p>
                                        <p className={`text-xs truncate ${activeSection === item.id ? 'text-white/70' : 'text-slate-400'}`}>{item.desc}</p>
                                    </div>
                                    {item.badge > 0 && activeSection !== item.id && (
                                        <span className="bg-indigo-100 text-indigo-700 text-xs font-black px-2 py-0.5 rounded-full">{item.badge}</span>
                                    )}
                                    <ChevronRight size={14} className={activeSection === item.id ? 'text-white/60' : 'text-slate-300'} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3 space-y-5">

                        {/* Dashboard */}
                        {activeSection === 'dashboard' && (
                            <>
                                {/* Search */}
                                <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                                    <h3 className="font-black text-white mb-1">Find Your Mentor</h3>
                                    <p className="text-blue-300 text-sm mb-4">Search for the best tutors and institutes.</p>
                                    <form onSubmit={e => { e.preventDefault(); navigate(`/tutors?search=${search}`); }} className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-slate-800 outline-none placeholder:text-slate-400 text-sm"
                                                placeholder="Search by subject or name..."
                                                value={search} onChange={e => setSearch(e.target.value)} />
                                        </div>
                                        <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-5 py-2.5 rounded-xl text-sm transition-all">Search</button>
                                    </form>
                                </div>

                                {/* Categories */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { name: 'IIT-JEE', icon: Atom, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/tutors?subject=Physics' },
                                        { name: 'NEET', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/tutors?subject=Biology' },
                                        { name: 'Institutes', icon: Building2, color: 'text-rose-600', bg: 'bg-rose-50', link: '/coachings' },
                                    ].map(cat => (
                                        <Link key={cat.name} to={cat.link}
                                            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center gap-3">
                                            <div className={`${cat.bg} ${cat.color} p-2.5 rounded-xl group-hover:scale-110 transition-transform`}>
                                                <cat.icon size={20} />
                                            </div>
                                            <span className="font-black text-slate-800 text-sm">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Featured Tutors */}
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-black text-slate-900">Top Rated Tutors</h3>
                                        <Link to="/tutors" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">View all <ArrowRight size={12} /></Link>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {featured.slice(0, 4).map(profile => (
                                            <Link key={profile._id} to={`/tutors/${profile.user._id}`}
                                                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden flex">
                                                <div className="bg-gradient-to-b from-blue-900 to-indigo-900 p-4 flex items-center justify-center w-20 shrink-0">
                                                    <img
                                                        src={profile?.profileImage ? `$env:VITE_API_URL${profile.profileImage}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user?.name)}&size=60&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                                                        alt={profile.user?.name} className="w-12 h-12 rounded-xl border-2 border-white/20 object-cover"
                                                    />
                                                </div>
                                                <div className="p-4 flex-1 min-w-0">
                                                    <p className="font-black text-slate-900 text-sm truncate">{profile.user?.name}</p>
                                                    <div className="flex flex-wrap gap-1 my-1">
                                                        {(profile.subjects || []).slice(0, 2).map(s => (
                                                            <span key={s} className="bg-indigo-50 text-indigo-700 text-[9px] font-bold px-1.5 py-0.5 rounded">{s}</span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                                        {profile.ratings > 0 && <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Star size={10} fill="currentColor" />{profile.ratings}</span>}
                                                        {profile.fees && <span className="flex items-center gap-0.5 font-bold text-slate-600"><IndianRupee size={10} />{profile.fees}</span>}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* My Tutors */}
                        {activeSection === 'tutors' && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="px-7 py-5 border-b border-slate-50 flex items-center justify-between">
                                    <div>
                                        <h2 className="font-black text-slate-900 text-lg">My Tutors</h2>
                                        <p className="text-slate-400 text-sm mt-0.5">Tutors whose contact you have unlocked</p>
                                    </div>
                                    <Link to="/tutors" className="btn btn-outline text-sm px-4 py-2">Browse More</Link>
                                </div>
                                <div className="p-7">
                                    {unlocked.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <GraduationCap size={28} className="text-slate-400" />
                                            </div>
                                            <p className="text-slate-700 font-bold mb-1">No tutors unlocked yet</p>
                                            <p className="text-slate-400 text-sm mb-5">Browse tutors and unlock their contact for ₹200</p>
                                            <Link to="/tutors" className="btn btn-primary px-6 text-sm">Browse Tutors</Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {unlocked.map(u => (
                                                <div key={u._id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all">
                                                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.tutor?.name || 'T')}&size=50&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                                                        alt={u.tutor?.name} className="w-12 h-12 rounded-xl shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-black text-slate-900">{u.tutor?.name}</p>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold"><CheckCircle2 size={12} /> Unlocked</span>
                                                            {u.tutor?.phone && (
                                                                <a href={`tel:${u.tutor.phone}`} className="flex items-center gap-1 text-indigo-600 text-xs font-bold hover:underline">
                                                                    <Phone size={12} />{u.tutor.phone}
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Link to={`/tutors/${u.tutor?._id}`} className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-white border border-indigo-100 px-3 py-1.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shrink-0">
                                                        View <ArrowRight size={12} />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Edit Profile */}
                        {activeSection === 'edit' && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="px-7 py-5 border-b border-slate-50">
                                    <h2 className="font-black text-slate-900 text-lg">Edit Profile</h2>
                                    <p className="text-slate-400 text-sm mt-0.5">Update your personal information</p>
                                </div>
                                <div className="p-7 space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Full Name</label>
                                            <div className="relative">
                                                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input className="input-field pl-11" placeholder="Your name"
                                                    value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Phone Number</label>
                                            <div className="relative">
                                                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input className="input-field pl-11" placeholder="+91 98765 43210"
                                                    value={profileForm.phone} onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 mb-1.5 block">Email Address</label>
                                        <div className="relative">
                                            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input className="input-field pl-11 bg-slate-50 cursor-not-allowed opacity-60" value={user?.email} disabled />
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
                                    </div>
                                    {profileMsg === 'success' && (
                                        <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                            <CheckCircle2 size={16} /> Profile updated successfully!
                                        </div>
                                    )}
                                    {profileMsg && profileMsg !== 'success' && (
                                        <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-xl">{profileMsg}</p>
                                    )}
                                    <button onClick={handleProfileSave} disabled={savingProfile} className="btn btn-primary gap-2 px-8">
                                        <Save size={15} /> {savingProfile ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Change Password */}
                        {activeSection === 'password' && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="px-7 py-5 border-b border-slate-50">
                                    <h2 className="font-black text-slate-900 text-lg">Change Password</h2>
                                    <p className="text-slate-400 text-sm mt-0.5">Keep your account secure</p>
                                </div>
                                <div className="p-7 space-y-5 max-w-md">
                                    {[
                                        { key: 'currentPassword', showKey: 'current', label: 'Current Password', placeholder: 'Enter current password' },
                                        { key: 'newPassword', showKey: 'new', label: 'New Password', placeholder: 'Min. 6 characters' },
                                        { key: 'confirmPassword', showKey: 'confirm', label: 'Confirm New Password', placeholder: 'Repeat new password' },
                                    ].map(field => (
                                        <div key={field.key}>
                                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">{field.label}</label>
                                            <div className="relative">
                                                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input type={showPass[field.showKey] ? 'text' : 'password'}
                                                    className="input-field pl-11 pr-11" placeholder={field.placeholder}
                                                    value={passForm[field.key]}
                                                    onChange={e => setPassForm(f => ({ ...f, [field.key]: e.target.value }))} />
                                                <button type="button"
                                                    onClick={() => setShowPass(s => ({ ...s, [field.showKey]: !s[field.showKey] }))}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                                    {showPass[field.showKey] ? <EyeOff size={15} /> : <Eye size={15} />}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {passMsg === 'success' && (
                                        <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                            <CheckCircle2 size={16} /> Password changed successfully!
                                        </div>
                                    )}
                                    {passMsg && passMsg !== 'success' && (
                                        <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-xl">{passMsg}</p>
                                    )}
                                    <button onClick={handlePassChange} disabled={savingPass} className="btn btn-primary gap-2 px-8">
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

