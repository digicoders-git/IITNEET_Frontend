import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Mail, Shield, User, Search, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const { user: currentUser } = useAuth();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
            headers: { Authorization: `Bearer ${currentUser?.token}` }
        }).then(res => {
            setUsers(res.data);
        }).catch(err => {
            console.error('Failed to fetch users:', err);
        }).finally(() => setLoading(false));
    }, []);

    const toggleApproval = async (id, currentStatus) => {
        try {
            await axios.put(`import.meta.env.VITE_API_URL/api/users/${id}/approve`,
                { isApproved: !currentStatus },
                { headers: { Authorization: `Bearer ${currentUser?.token}` } }
            );
            setUsers(users.map(u => u._id === id ? { ...u, isApproved: !u.isApproved } : u));
        } catch (err) {
            console.error('Failed to update approval:', err);
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Profiles</h2>
                    <p className="text-slate-500 font-medium text-sm">Review and manage platform members</p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search users..." 
                            className="input-field pl-12 py-2.5 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                        {[
                            { value: 'all', label: 'All' },
                            { value: 'student', label: 'Students' },
                            { value: 'tutor', label: 'Tutors' },
                            { value: 'coaching', label: 'Coaching' },
                        ].map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => setRoleFilter(opt.value)}
                                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                    roleFilter === opt.value
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Profile</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Account Type</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Administrative Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map(u => (
                                <tr key={u._id} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 shadow-inner">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-base font-extrabold text-slate-900 leading-none mb-1">{u.name}</p>
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <Mail size={12} />
                                                    <span className="text-xs font-medium tracking-tight truncate max-w-[150px]">{u.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`
                                            px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
                                            ${u.role === 'tutor' ? 'bg-violet-50 text-violet-600 border-violet-100' : 
                                              u.role === 'coaching' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                              'bg-slate-50 text-slate-500 border-slate-100'}
                                        `}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${u.isApproved ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'}`}></div>
                                            <span className={`text-[11px] font-black uppercase tracking-widest ${u.isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                {u.isApproved ? 'Live' : 'Approval Pending'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            {u.role !== 'admin' && (
                                                <button 
                                                    onClick={() => toggleApproval(u._id, u.isApproved)}
                                                    className={`
                                                        px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                                                        ${u.isApproved 
                                                            ? 'border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white' 
                                                            : 'bg-violet-600 text-white shadow-lg shadow-violet-100 hover:bg-violet-700'}
                                                    `}
                                                >
                                                    {u.isApproved ? 'Revoke Approval' : 'Authorize Listing'}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;




