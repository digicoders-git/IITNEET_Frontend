import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, Star, IndianRupee, AlertCircle, GraduationCap, MapPin, Clock, Unlock, ArrowRight, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TutorDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/my-stats`, {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => setStats(res.data))
          .catch(() => {})
          .finally(() => setLoading(false));

        axios.get(`${import.meta.env.VITE_API_URL}/api/reviews/${user?._id}`)
            .then(res => setReviews(Array.isArray(res.data) ? res.data : []))
            .catch(() => {});
    }, [user]);

    const statCards = [
        { label: 'Profile Views', value: stats?.profileViews ?? 0, icon: Eye, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Avg Rating', value: stats?.avgRating > 0 ? `${stats.avgRating} ★` : 'No ratings', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Total Reviews', value: stats?.totalReviews ?? 0, icon: GraduationCap, color: 'text-violet-600', bg: 'bg-violet-50' },
        { label: 'Contact Unlocks', value: stats?.totalUnlocks ?? 0, icon: Unlock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
                        <p className="text-amber-700 text-sm mt-1">Your profile is waiting for admin approval. Once approved, students can find and contact you.</p>
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
                        <h2 className="text-2xl font-black text-slate-900">
                            {loading ? <span className="inline-block w-12 h-7 bg-slate-100 rounded animate-pulse"></span> : stat.value}
                        </h2>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Summary */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                    <h3 className="font-black text-slate-900 mb-5">Profile Summary</h3>
                    {loading ? (
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => <div key={i} className="h-4 bg-slate-100 rounded animate-pulse"></div>)}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Subjects */}
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subjects</p>
                                {stats?.subjects?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {stats.subjects.map(s => (
                                            <span key={s} className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg">{s}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-400 text-sm">No subjects added yet. <Link to="/tutor/profile" className="text-indigo-600 font-bold">Add now →</Link></p>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-2">
                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                    <Clock size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-xs text-slate-400 font-medium">Experience</p>
                                    <p className="font-black text-slate-800">{stats?.experience ? `${stats.experience} yrs` : '—'}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                    <IndianRupee size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-xs text-slate-400 font-medium">Fees/Month</p>
                                    <p className="font-black text-slate-800">{stats?.fees ? `₹${stats.fees}` : '—'}</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4 text-center">
                                    <MapPin size={16} className="mx-auto text-slate-400 mb-1" />
                                    <p className="text-xs text-slate-400 font-medium">Location</p>
                                    <p className="font-black text-slate-800 text-xs truncate">{stats?.location || '—'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                    <h3 className="font-black text-slate-900 mb-5">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link to="/tutor/profile" className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                            <div>
                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">Edit Profile</p>
                                <p className="text-xs text-slate-400 mt-0.5">Update subjects & details</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link to="/tutor/subscription" className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                            <div>
                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">Subscription</p>
                                <p className="text-xs text-slate-400 mt-0.5">Upgrade your plan</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link to={`/tutors/${user?._id}`} target="_blank" className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                            <div>
                                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">View Public Profile</p>
                                <p className="text-xs text-slate-400 mt-0.5">See how students see you</p>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="px-7 py-5 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="font-black text-slate-900">Student Reviews</h3>
                        {reviews.length > 0 && (
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-black px-2 py-0.5 rounded-full">{reviews.length}</span>
                        )}
                    </div>
                    {stats?.avgRating > 0 && (
                        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl">
                            <Star size={14} className="text-amber-400 fill-amber-400" />
                            <span className="font-black text-amber-700">{stats.avgRating}</span>
                            <span className="text-amber-500 text-xs">/ 5</span>
                        </div>
                    )}
                </div>
                <div className="p-7">
                    {reviews.length === 0 ? (
                        <div className="text-center py-10">
                            <MessageSquare size={36} className="mx-auto text-slate-200 mb-3" />
                            <p className="text-slate-500 font-medium">No reviews yet</p>
                            <p className="text-slate-400 text-sm mt-1">Students will leave reviews after connecting with you</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map(r => (
                                <div key={r._id} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(r.student?.name || 'S')}&size=40&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                                        alt={r.student?.name} className="w-10 h-10 rounded-full shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-bold text-slate-800 text-sm">{r.student?.name}</p>
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{r.comment}</p>
                                        <p className="text-xs text-slate-400 mt-1.5">{new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorDashboard;




