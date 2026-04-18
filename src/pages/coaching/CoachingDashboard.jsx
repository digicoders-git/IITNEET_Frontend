import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Building2, GraduationCap, CreditCard, AlertCircle, ArrowRight, CheckCircle2, Clock, Users, Sparkles } from 'lucide-react';

const CoachingDashboard = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [sub, setSub] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/me`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            }),
            axios.get(`${import.meta.env.VITE_API_URL}/api/subscriptions/mine`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            })
        ]).then(([profileRes, subRes]) => {
            setProfile(profileRes.data.profile);
            setSub(subRes.data);
        }).catch(() => {}).finally(() => setLoading(false));
    }, [user]);

    const statCards = [
        { label: 'Courses Listed', value: profile?.courses?.length ?? 0, icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Location', value: profile?.location || '—', icon: MapPin, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Subscription', value: sub ? sub.plan?.name : 'No Plan', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Status', value: user?.isApproved ? 'Approved' : 'Pending', icon: CheckCircle2, color: user?.isApproved ? 'text-emerald-600' : 'text-amber-600', bg: user?.isApproved ? 'bg-emerald-50' : 'bg-amber-50' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-black text-slate-900">Dashboard</h2>
                <p className="text-slate-500 text-sm mt-1">Welcome back, {user?.name}</p>
            </div>

            {/* Approval Notice */}
            {!user?.isApproved && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-xl text-amber-600 shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-amber-900">Application Under Review</h4>
                        <p className="text-amber-700 text-sm mt-1">Your institute is waiting for admin approval. Once approved, students can find and contact you.</p>
                    </div>
                </div>
            )}

            {/* Subscription Notice */}
            {!sub && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600 shrink-0">
                        <CreditCard size={20} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-indigo-900">No Active Subscription</h4>
                        <p className="text-indigo-700 text-sm mt-1">Your institute is not visible to students. Purchase a plan to get listed.</p>
                    </div>
                    <Link to="/coaching/subscription" className="btn btn-primary text-sm px-4 py-2 shrink-0">Get Plan</Link>
                </div>
            )}

            {sub && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4">
                    <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 shrink-0">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-emerald-900">Active: {sub.plan?.name}</h4>
                        <p className="text-emerald-700 text-sm mt-0.5">
                            Valid until {new Date(sub.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className={`${stat.bg} ${stat.color} w-11 h-11 rounded-xl flex items-center justify-center mb-4`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <h2 className="text-lg font-black text-slate-900 truncate">
                            {loading ? <span className="inline-block w-16 h-6 bg-slate-100 rounded animate-pulse"></span> : stat.value}
                        </h2>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Summary */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                    <h3 className="font-black text-slate-900 mb-5">Institute Summary</h3>
                    {loading ? (
                        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-4 bg-slate-100 rounded animate-pulse"></div>)}</div>
                    ) : (
                        <div className="space-y-5">
                            {/* About */}
                            {profile?.bio ? (
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">About</p>
                                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{profile.bio}</p>
                                </div>
                            ) : (
                                <p className="text-slate-400 text-sm">No description added. <Link to="/coaching/details" className="text-indigo-600 font-bold">Add now →</Link></p>
                            )}

                            {/* Courses */}
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Courses Offered</p>
                                {profile?.courses?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {profile.courses.map(c => (
                                            <span key={c} className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg">{c}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-400 text-sm">No courses added. <Link to="/coaching/details" className="text-indigo-600 font-bold">Add now →</Link></p>
                                )}
                            </div>

                            {/* Faculty */}
                            {profile?.facultyDetails && (
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Faculty</p>
                                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{profile.facultyDetails}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                    <MapPin size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-xs text-slate-400 font-medium">Location</p>
                                    <p className="font-black text-slate-800 text-sm truncate">{profile?.location || '—'}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                    <Users size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-xs text-slate-400 font-medium">Courses</p>
                                    <p className="font-black text-slate-800">{profile?.courses?.length || 0}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                    <h3 className="font-black text-slate-900 mb-5">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link to="/coaching/details" className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                            <div>
                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">Edit Listing</p>
                                <p className="text-xs text-slate-400 mt-0.5">Update courses & details</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link to="/coaching/subscription" className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                            <div>
                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">Subscription</p>
                                <p className="text-xs text-slate-400 mt-0.5">{sub ? 'Manage your plan' : 'Get listed now'}</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link to={`/coachings/${user?._id}`} target="_blank" className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                            <div>
                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">View Public Profile</p>
                                <p className="text-xs text-slate-400 mt-0.5">See how students see you</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachingDashboard;
