import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Shield, CheckCircle2 } from 'lucide-react';

const AdminCreateAdmin = () => {
    const { user } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg(''); setError('');
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/admin/create-admin`,
                form,
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            setMsg(`Admin "${form.name}" created successfully!`);
            setForm({ name: '', email: '', password: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create admin');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg space-y-6">
            <div>
                <h2 className="text-2xl font-black text-slate-900">Create Admin</h2>
                <p className="text-slate-500 text-sm mt-1">Add a new administrator account</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
                    <Shield size={18} className="text-indigo-600 shrink-0" />
                    <p className="text-indigo-700 text-sm font-medium">New admin will have full access to the admin panel.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-1.5 block">Full Name</label>
                        <div className="relative">
                            <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input className="input-field pl-11" placeholder="Admin name"
                                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-1.5 block">Email Address</label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="email" className="input-field pl-11" placeholder="admin@example.com"
                                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-1.5 block">Password</label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" className="input-field pl-11" placeholder="Min. 6 characters"
                                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required minLength={6} />
                        </div>
                    </div>

                    {msg && (
                        <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                            <CheckCircle2 size={16} /> {msg}
                        </div>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-xl">{error}</p>
                    )}

                    <button type="submit" disabled={loading} className="btn btn-primary w-full py-3 gap-2">
                        <Shield size={16} /> {loading ? 'Creating...' : 'Create Admin Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminCreateAdmin;
