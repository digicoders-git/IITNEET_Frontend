import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, CheckCircle2, X, CreditCard, Users, IndianRupee, Clock, Tag } from 'lucide-react';

const FEATURES_PLACEHOLDER = 'Priority listing\nVerified badge\nContact unlocks';

const PlanModal = ({ plan, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: plan?.name || '',
        price: plan?.price || '',
        duration: plan?.duration || 30,
        forRole: plan?.forRole || 'both',
        features: plan?.features?.join('\n') || '',
        isActive: plan?.isActive ?? true,
    });

    const handleSave = () => {
        onSave({
            ...form,
            features: form.features.split('\n').map(f => f.trim()).filter(Boolean)
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h3 className="font-black text-slate-900">{plan ? 'Edit Plan' : 'Create New Plan'}</h3>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-1.5 block">Plan Name</label>
                        <input className="input-field" placeholder="e.g. Monthly Basic"
                            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Price (₹)</label>
                            <div className="relative">
                                <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="number" className="input-field pl-9" placeholder="500"
                                    value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Duration (days)</label>
                            <div className="relative">
                                <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="number" className="input-field pl-9" placeholder="30"
                                    value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-1.5 block">For Role</label>
                        <select className="input-field" value={form.forRole} onChange={e => setForm(f => ({ ...f, forRole: e.target.value }))}>
                            <option value="both">Both (Tutor & Coaching)</option>
                            <option value="tutor">Tutors Only</option>
                            <option value="coaching">Coaching Only</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-1.5 block">Features (one per line)</label>
                        <textarea className="input-field h-24 resize-none text-sm" placeholder={FEATURES_PLACEHOLDER}
                            value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} />
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                            className={`w-10 h-6 rounded-full transition-all relative ${form.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${form.isActive ? 'left-5' : 'left-1'}`}></div>
                        </button>
                        <span className="text-sm font-semibold text-slate-700">{form.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 flex gap-3 justify-end">
                    <button onClick={onClose} className="btn btn-outline px-5">Cancel</button>
                    <button onClick={handleSave} className="btn btn-primary px-6">
                        {plan ? 'Update Plan' : 'Create Plan'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminSubscriptions = () => {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('plans');
    const [modal, setModal] = useState(null); // null | 'create' | plan object
    const [saving, setSaving] = useState(false);

    const headers = { Authorization: `Bearer ${user?.token}` };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [plansRes, subsRes] = await Promise.all([
                axios.get('$env:VITE_API_URL/api/subscriptions/plans/all', { headers }),
                axios.get('$env:VITE_API_URL/api/subscriptions/all', { headers }),
            ]);
            setPlans(plansRes.data);
            setSubscriptions(subsRes.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async (formData) => {
        setSaving(true);
        try {
            if (modal === 'create') {
                const res = await axios.post('$env:VITE_API_URL/api/subscriptions/plans', formData, { headers });
                setPlans(p => [res.data, ...p]);
            } else {
                const res = await axios.put(`$env:VITE_API_URL/api/subscriptions/plans/${modal._id}`, formData, { headers });
                setPlans(p => p.map(x => x._id === modal._id ? res.data : x));
            }
            setModal(null);
        } catch (err) { alert(err.response?.data?.message || 'Error'); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this plan?')) return;
        await axios.delete(`$env:VITE_API_URL/api/subscriptions/plans/${id}`, { headers });
        setPlans(p => p.filter(x => x._id !== id));
    };

    const activeCount = subscriptions.filter(s => s.status === 'active').length;
    const totalRevenue = subscriptions.reduce((sum, s) => sum + (s.amountPaid || 0), 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Subscriptions</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage plans and view purchases</p>
                </div>
                <button onClick={() => setModal('create')} className="btn btn-primary gap-2">
                    <Plus size={16} /> New Plan
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Plans', value: plans.length, icon: Tag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Active Plans', value: plans.filter(p => p.isActive).length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Active Subs', value: activeCount, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
                    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <div className={`${s.bg} ${s.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                            <s.icon size={18} />
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
                        <p className="text-2xl font-black text-slate-900">{loading ? '—' : s.value}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl border border-slate-100 p-1 shadow-sm w-fit">
                {['plans', 'purchases'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}>
                        {tab === 'plans' ? `Plans (${plans.length})` : `Purchases (${subscriptions.length})`}
                    </button>
                ))}
            </div>

            {/* Plans Tab */}
            {activeTab === 'plans' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading ? [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 h-48 animate-pulse"></div>
                    )) : plans.length === 0 ? (
                        <div className="col-span-3 text-center py-16 bg-white rounded-2xl border border-slate-100">
                            <CreditCard size={36} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No plans yet. Create your first plan.</p>
                        </div>
                    ) : plans.map(plan => (
                        <div key={plan._id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${plan.isActive ? 'border-slate-100' : 'border-slate-200 opacity-60'}`}>
                            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-black text-white text-lg">{plan.name}</h3>
                                        <p className="text-blue-300 text-xs mt-1 capitalize">{plan.forRole === 'both' ? 'Tutor & Coaching' : plan.forRole}</p>
                                    </div>
                                    {!plan.isActive && <span className="bg-slate-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Inactive</span>}
                                </div>
                                <div className="flex items-baseline gap-1 mt-3">
                                    <span className="text-3xl font-black text-white">₹{plan.price}</span>
                                    <span className="text-blue-300 text-sm">/ {plan.duration} days</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <ul className="space-y-2 mb-5">
                                    {(plan.features || []).map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex gap-2">
                                    <button onClick={() => setModal(plan)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                        <Edit2 size={14} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(plan._id)}
                                        className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-100 text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-10 text-center"><div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div></div>
                    ) : subscriptions.length === 0 ? (
                        <div className="p-12 text-center">
                            <CreditCard size={36} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium">No purchases yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Plan</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Expires</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {subscriptions.map(sub => (
                                        <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(sub.user?.name || 'U')}&size=36&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                                                        alt={sub.user?.name} className="w-9 h-9 rounded-full" />
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm">{sub.user?.name}</p>
                                                        <p className="text-slate-400 text-xs capitalize">{sub.user?.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-800 text-sm">{sub.plan?.name}</p>
                                                <p className="text-slate-400 text-xs">{sub.plan?.duration} days</p>
                                            </td>
                                            <td className="px-6 py-4 font-black text-slate-900">₹{sub.amountPaid}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(sub.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-full ${
                                                    sub.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                                                    sub.status === 'expired' ? 'bg-slate-100 text-slate-500' :
                                                    'bg-red-50 text-red-500'
                                                }`}>{sub.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {modal && <PlanModal plan={modal === 'create' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
        </div>
    );
};

export default AdminSubscriptions;

