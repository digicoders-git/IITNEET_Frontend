import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, XCircle, Trash2, ExternalLink, Megaphone, MapPin, Building2, Eye, Settings, Save } from 'lucide-react';

const AdminAds = () => {
    const { user } = useAuth();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [settings, setSettings] = useState({ adMonthlyPrice: 199 });
    const [newPrice, setNewPrice] = useState(199);
    const [updatingSettings, setUpdatingSettings] = useState(false);

    const fetchSettings = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings`);
            setSettings(res.data);
            setNewPrice(res.data.adMonthlyPrice);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { 
        fetchAllAds(); 
        fetchSettings();
    }, [user]);

    const handleStatus = async (id, status) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/ads/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            fetchAllAds();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const updatePrice = async () => {
        setUpdatingSettings(true);
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/settings`, { adMonthlyPrice: newPrice }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            fetchSettings();
            alert('Price updated successfully');
        } catch (err) {
            alert('Failed to update price');
        } finally {
            setUpdatingSettings(false);
        }
    };

    const filteredAds = filter === 'all' ? ads : ads.filter(ad => ad.status === filter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Manage Advertisements</h2>
                    <p className="text-slate-500 text-sm mt-1">Review and moderate ads from coaching institutes</p>
                </div>
                
                {/* Global Settings */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                        <Settings size={20} />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Monthly Ad Price</label>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                <input 
                                    type="number" 
                                    className="w-24 pl-6 pr-3 py-1.5 text-sm font-bold border border-slate-200 rounded-lg focus:border-blue-900 outline-none"
                                    value={newPrice}
                                    onChange={e => setNewPrice(e.target.value)}
                                />
                            </div>
                            <button 
                                onClick={updatePrice}
                                disabled={updatingSettings || newPrice == settings.adMonthlyPrice}
                                className="bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-800 transition-all disabled:opacity-50"
                            >
                                <Save size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'active', 'rejected'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all border ${filter === f ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-slate-500 border-slate-100 hover:border-blue-900'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {loading ? (
                    [...Array(4)].map((_, i) => <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-slate-100"></div>)
                ) : filteredAds.length > 0 ? (
                    filteredAds.map(ad => (
                        <div key={ad._id} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-all">
                            <div className="sm:w-48 shrink-0">
                                <div className="aspect-video rounded-xl overflow-hidden border border-slate-100">
                                    <img src={`${import.meta.env.VITE_API_URL}${ad.imageUrl}`} alt={ad.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <Building2 size={14} />
                                    <span className="truncate">{ad.coachingId?.name || 'Unknown Institute'}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                    <MapPin size={14} />
                                    <span>{ad.coachingId?.city || 'India'}</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{ad.title}</h4>
                                        <div className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${ad.status === 'active' ? 'bg-emerald-50 text-emerald-600' : ad.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                                            {ad.status}
                                        </div>
                                        <div className="mt-2">
                                            {ad.isPaid ? (
                                                <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">Paid (₹{ad.amount})</span>
                                            ) : (
                                                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded">Unpaid</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                                                <Eye size={10} /> Views
                                            </div>
                                            <p className="font-black text-slate-700 text-sm">{ad.views}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{ad.description}</p>
                                
                                <div className="mt-auto flex items-center gap-2">
                                    {ad.status !== 'active' && (
                                        <button onClick={() => handleStatus(ad._id, 'active')} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                                            <CheckCircle size={14} /> Approve
                                        </button>
                                    )}
                                    {ad.status === 'pending' && (
                                        <button onClick={() => handleStatus(ad._id, 'rejected')} className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all">
                                            <XCircle size={14} /> Reject
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(ad._id)} className="bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-400 p-2.5 rounded-lg transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="lg:col-span-2 py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                        <Megaphone className="text-slate-200 mx-auto mb-3" size={48} />
                        <h3 className="font-bold text-slate-900">No {filter !== 'all' ? filter : ''} advertisements found</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAds;
