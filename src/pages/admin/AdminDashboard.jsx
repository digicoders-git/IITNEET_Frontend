import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Users, Building2, GraduationCap, CreditCard, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ total: 0, tutors: 0, coachings: 0, students: 0, pending: 0 });
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('$env:VITE_API_URL/api/users', {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => {
            const all = res.data;
            const tutors = all.filter(u => u.role === 'tutor');
            const coachings = all.filter(u => u.role === 'coaching');
            const students = all.filter(u => u.role === 'student');
            const pending = all.filter(u => !u.isApproved && (u.role === 'tutor' || u.role === 'coaching'));
            setStats({
                total: all.length,
                tutors: tutors.length,
                coachings: coachings.length,
                students: students.length,
                pending: pending.length
            });
            setPendingUsers(pending.slice(0, 5));
        }).catch(() => {}).finally(() => setLoading(false));
    }, [user]);

    const statCards = [
        { label: 'Total Users', value: stats.total, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
        { label: 'Tutors', value: stats.tutors, icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Institutes', value: stats.coachings, icon: Building2, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Students', value: stats.students, icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-black text-slate-900">Dashboard</h2>
                <p className="text-slate-500 text-sm mt-1">Welcome back, {user?.name}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                                <stat.icon size={22} />
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium text-sm mb-1">{stat.label}</p>
                        <h2 className="text-3xl font-black text-slate-900">
                            {loading ? <span className="animate-pulse bg-slate-100 rounded w-12 h-8 inline-block"></span> : stat.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-slate-900">Pending Approvals</h3>
                        {stats.pending > 0 && (
                            <span className="bg-amber-100 text-amber-700 text-xs font-black px-2 py-0.5 rounded-full">{stats.pending}</span>
                        )}
                    </div>
                    <Link to="/admin/users" className="text-sm font-bold text-indigo-600 hover:underline">View All</Link>
                </div>
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : pendingUsers.length === 0 ? (
                    <div className="p-10 text-center">
                        <CheckCircle2 size={36} className="mx-auto text-emerald-400 mb-3" />
                        <p className="text-slate-500 font-medium">All caught up! No pending approvals.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {pendingUsers.map(u => (
                            <div key={u._id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&size=36&background=ede9fe&color=7c3aed&bold=true&rounded=true`}
                                        alt={u.name} className="w-9 h-9 rounded-full"
                                    />
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{u.name}</p>
                                        <p className="text-slate-400 text-xs">{u.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-black uppercase px-2 py-1 rounded-lg ${u.role === 'tutor' ? 'bg-violet-50 text-violet-600' : 'bg-blue-50 text-blue-600'}`}>
                                        {u.role}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-lg">
                                        <Clock size={11} /> Pending
                                    </span>
                                    <Link to="/admin/users" className="text-xs font-bold text-indigo-600 hover:underline">Review</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;

