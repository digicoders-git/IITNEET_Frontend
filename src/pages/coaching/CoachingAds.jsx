import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Clock, CheckCircle, AlertCircle, Image as ImageIcon, ExternalLink, Megaphone, Loader2, CreditCard } from 'lucide-react';

const CoachingAds = () => {
    const { user } = useAuth();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({ 
        title: '', 
        description: '', 
        imageUrl: '', 
        link: '',
        duration: 1,
        socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '' }
    });
    const [settings, setSettings] = useState({ adMonthlyPrice: 199 });
    const [error, setError] = useState('');

    const fetchAds = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ads/me`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setAds(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings`);
            setSettings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { 
        fetchAds(); 
        fetchSettings();
    }, [user]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ads/upload-image`, formData, {
                headers: { 
                    Authorization: `Bearer ${user?.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setForm({ ...form, imageUrl: res.data.imageUrl });
        } catch (err) {
            setError('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.imageUrl) return setError('Please upload an advertisement image');
        
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/ads`, form, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setIsAdding(false);
            setForm({ 
                title: '', 
                description: '', 
                imageUrl: '', 
                link: '',
                duration: 1,
                socialLinks: { facebook: '', instagram: '', twitter: '', youtube: '' }
            });
            fetchAds();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create ad');
        }
    };

    const handlePayment = async (adId, amount) => {
        try {
            const { data: order } = await axios.post(`${import.meta.env.VITE_API_URL}/api/ads/create-order`, { adId, planAmount: amount }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });

            const options = {
                key: order.keyId,
                amount: order.amount,
                currency: order.currency,
                name: "IIT-NEET.com",
                description: "Advertisement Payment",
                order_id: order.orderId,
                handler: async (response) => {
                    try {
                        await axios.post(`${import.meta.env.VITE_API_URL}/api/ads/verify-payment`, {
                            ...response,
                            adId,
                            amount
                        }, {
                            headers: { Authorization: `Bearer ${user?.token}` }
                        });
                        alert('Payment successful! Your ad is now pending for admin approval.');
                        fetchAds();
                    } catch (err) {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: { color: "#1e1b4b" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to initiate payment');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this ad?')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/ads/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            fetchAds();
        } catch (err) {
            alert('Failed to delete ad');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'active': return 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-500/10';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Advertisements</h2>
                    <p className="text-slate-500 text-sm mt-1">Create and manage your institute's ads</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="btn bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition-all"
                >
                    {isAdding ? 'Cancel' : <><Plus size={18} /> Create New Ad</>}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 md:p-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                        <Megaphone className="text-amber-500" size={24} /> New Advertisement
                    </h3>
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Ad Title</label>
                                <input 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-0 outline-none transition-all"
                                    placeholder="e.g. Admission Open 2024"
                                    value={form.title}
                                    onChange={e => setForm({...form, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Description</label>
                                <textarea 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-0 outline-none transition-all h-24 resize-none"
                                    placeholder="Brief description of the offer or announcement..."
                                    value={form.description}
                                    onChange={e => setForm({...form, description: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Target URL (Optional)</label>
                                <input 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-0 outline-none transition-all"
                                    placeholder="https://yourwebsite.com"
                                    value={form.link}
                                    onChange={e => setForm({...form, link: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Ad Duration</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 3, 6, 12].map(m => (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => setForm({...form, duration: m})}
                                            className={`py-2 rounded-lg text-xs font-bold border transition-all ${form.duration === m ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-slate-500 border-slate-100 hover:border-blue-900'}`}
                                        >
                                            {m} Month{m > 1 ? 's' : ''}
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-2 text-[10px] text-slate-500 font-medium">
                                    Price: <span className="text-blue-900 font-bold">₹{settings.adMonthlyPrice * form.duration}</span> (₹{settings.adMonthlyPrice}/month)
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Instagram</label>
                                    <input 
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-blue-900 outline-none"
                                        placeholder="Username"
                                        value={form.socialLinks.instagram}
                                        onChange={e => setForm({...form, socialLinks: {...form.socialLinks, instagram: e.target.value}})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Facebook</label>
                                    <input 
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-blue-900 outline-none"
                                        placeholder="Profile link"
                                        value={form.socialLinks.facebook}
                                        onChange={e => setForm({...form, socialLinks: {...form.socialLinks, facebook: e.target.value}})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Twitter</label>
                                    <input 
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-blue-900 outline-none"
                                        placeholder="Username"
                                        value={form.socialLinks.twitter}
                                        onChange={e => setForm({...form, socialLinks: {...form.socialLinks, twitter: e.target.value}})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">YouTube</label>
                                    <input 
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-blue-900 outline-none"
                                        placeholder="Channel link"
                                        value={form.socialLinks.youtube}
                                        onChange={e => setForm({...form, socialLinks: {...form.socialLinks, youtube: e.target.value}})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Ad Banner / Image</label>
                                <div className="relative group">
                                    <div className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${form.imageUrl ? 'border-emerald-500' : 'border-slate-200 group-hover:border-blue-900'}`}>
                                        {form.imageUrl ? (
                                            <>
                                                <img src={`${import.meta.env.VITE_API_URL}${form.imageUrl}`} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                                    <button type="button" onClick={() => setForm({...form, imageUrl: ''})} className="bg-red-500 text-white p-2 rounded-full"><Trash2 size={20} /></button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-6">
                                                {uploading ? (
                                                    <Loader2 className="animate-spin text-blue-900 mx-auto mb-2" size={32} />
                                                ) : (
                                                    <ImageIcon className="text-slate-300 mx-auto mb-2" size={40} />
                                                )}
                                                <p className="text-sm font-bold text-slate-500">
                                                    {uploading ? 'Uploading...' : 'Click to upload ad banner'}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-1">Recommended: 1200x630 (Aspect Ratio 1.91:1)</p>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                            disabled={uploading}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
                            
                            <button 
                                type="submit"
                                disabled={uploading}
                                className="w-full py-4 rounded-xl bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
                            >
                                Submit for Admin Approval
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Ads List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse"></div>
                    ))
                ) : ads.length > 0 ? (
                    ads.map(ad => (
                        <div key={ad._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={`${import.meta.env.VITE_API_URL}${ad.imageUrl}`} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${getStatusStyle(ad.status)}`}>
                                    {ad.status === 'active' ? 'Active' : ad.status}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-slate-900 mb-1">{ad.title}</h4>
                                    {!ad.isPaid && <span className="bg-red-50 text-red-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Unpaid</span>}
                                </div>
                                <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">{ad.description}</p>
                                
                                <div className="space-y-3">
                                    {ad.status === 'active' ? (
                                        <div className="w-full bg-emerald-50 text-emerald-600 p-2.5 rounded-lg border border-emerald-100">
                                            <div className="flex items-center justify-center gap-2">
                                                <CheckCircle size={14} /> 
                                                <span className="text-[10px] font-black uppercase tracking-tight">Active & Live</span>
                                            </div>
                                            {ad.endDate && (
                                                <div className="flex items-center justify-center gap-1 mt-1 text-[10px] font-bold opacity-70">
                                                    <Clock size={10} /> Valid until: {new Date(ad.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                            )}
                                        </div>
                                    ) : !ad.isPaid ? (
                                        <button 
                                            onClick={() => handlePayment(ad._id, settings.adMonthlyPrice * ad.duration)} 
                                            className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                                        >
                                            <CreditCard size={14} /> Pay ₹{settings.adMonthlyPrice * ad.duration} to Activate
                                        </button>
                                    ) : ad.status === 'pending' ? (
                                        <div className="w-full bg-blue-50 text-blue-600 text-[10px] font-bold py-2 rounded-lg text-center flex items-center justify-center gap-2">
                                            <Clock size={14} /> Waiting for Admin Approval
                                        </div>
                                    ) : null}

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Views</p>
                                                <p className="font-black text-slate-700">{ad.views}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Clicks</p>
                                                <p className="font-black text-slate-700">{ad.clicks}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(ad._id)}
                                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="md:col-span-3 py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Megaphone className="text-slate-200" size={40} />
                        </div>
                        <h3 className="font-black text-slate-900 text-lg">No Advertisements Yet</h3>
                        <p className="text-slate-400 text-sm mt-1 mb-6">Create your first ad to reach thousands of students.</p>
                        <button onClick={() => setIsAdding(true)} className="btn bg-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20">
                            Create Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoachingAds;
