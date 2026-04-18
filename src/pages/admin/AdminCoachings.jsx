import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Building2, MapPin, Search, CheckCircle2, XCircle } from 'lucide-react';

const AdminCoachings = () => {
    const { user } = useAuth();
    const [coachings, setCoachings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('$env:VITE_API_URL/api/users', {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => {
            setCoachings(res.data.filter(u => u.role === 'coaching'));
        }).catch(() => {}).finally(() => setLoading(false));
    }, [user]);

    const toggleApproval = async (id, current) => {
        try {
            await axios.put(`$env:VITE_API_URL/api/users/${id}/approve`,
                { isApproved: !current },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            setCoachings(c => c.map(x => x._id === id ? { ...x, isApproved: !x.isApproved } : x));
        } catch (err) {
            console.error(err);
        }
    };

    const filtered = coachings.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Coaching Institutes</h2>
                    <p className="text-slate-500 font-medium text-sm mt-1">Manage institute listings and approvals</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input className="input-field pl-11 py-2.5 text-sm" placeholder="Search institutes..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <Building2 size={40} className="mx-auto mb-3 text-slate-300" />
                        <p className="font-medium">No coaching institutes found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Institute</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.map(c => (
                                    <tr key={c._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-black">
                                                    {c.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-slate-800">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-500">{c.email}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${c.isApproved ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                                                <span className={`text-xs font-bold uppercase tracking-widest ${c.isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                    {c.isApproved ? 'Approved' : 'Pending'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button
                                                onClick={() => toggleApproval(c._id, c.isApproved)}
                                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${c.isApproved ? 'border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                                            >
                                                {c.isApproved ? 'Revoke' : 'Approve'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCoachings;

