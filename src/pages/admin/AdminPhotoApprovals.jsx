import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Check, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';

const AdminPhotoApprovals = () => {
    const { user } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [profileRes, adRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/admin/pending-photos`, {
                    headers: { Authorization: `Bearer ${user?.token}` }
                }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/ads/admin/pending-photos`, {
                    headers: { Authorization: `Bearer ${user?.token}` }
                })
            ]);
            setProfiles(profileRes.data);
            setAds(adRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [user]);

    const handleProfileApproval = async (profileId, type, action) => {
        setProcessing(`${profileId}_${type}`);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/profiles/admin/approve-photo`, 
                { profileId, type, action },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            fetchData();
        } catch (err) {
            alert('Failed to process approval');
        } finally {
            setProcessing(null);
        }
    };

    const handleAdApproval = async (adId, type, action) => {
        setProcessing(`${adId}_${type}`);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/ads/admin/approve-photo`, 
                { adId, type, action },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            fetchData();
        } catch (err) {
            alert('Failed to process approval');
        } finally {
            setProcessing(null);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-900 mb-4" size={48} />
            <p className="text-slate-500 font-bold">Loading pending approvals...</p>
        </div>
    );

    const hasPending = profiles.length > 0 || ads.length > 0;

    return (
        <div className="space-y-10">
            <div className="border-b border-slate-100 pb-6">
                <h2 className="text-2xl font-black text-slate-900">Photo Approvals</h2>
                <p className="text-slate-500 text-sm mt-1">Review and approve photo updates from tutors and institutes</p>
            </div>

            {!hasPending && (
                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-100 py-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="text-slate-200" size={40} />
                    </div>
                    <h3 className="font-black text-slate-900 text-lg">No Pending Approvals</h3>
                    <p className="text-slate-400 text-sm mt-1">Everything is up to date!</p>
                </div>
            )}

            {/* Profile Photos */}
            {profiles.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">P</span>
                        Profile & Institute Photos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profiles.map(p => (
                            <React.Fragment key={p._id}>
                                {p.pendingProfileImage && (
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                        <div className="p-4 border-b border-slate-50">
                                            <p className="font-bold text-slate-900 text-sm">{p.user?.name}</p>
                                            <p className="text-slate-400 text-xs">{p.user?.role} • Profile Photo</p>
                                        </div>
                                        <div className="aspect-square bg-slate-100 relative group">
                                            <img src={`${import.meta.env.VITE_API_URL}${p.pendingProfileImage}`} alt="Pending" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                                                <button 
                                                    onClick={() => handleProfileApproval(p._id, 'profile', 'approve')}
                                                    disabled={processing === `${p._id}_profile`}
                                                    className="bg-emerald-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
                                                >
                                                    {processing === `${p._id}_profile` ? <Loader2 className="animate-spin" size={24} /> : <Check size={24} />}
                                                </button>
                                                <button 
                                                    onClick={() => handleProfileApproval(p._id, 'profile', 'reject')}
                                                    disabled={processing === `${p._id}_profile`}
                                                    className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
                                                >
                                                    <X size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {p.pendingInstituteImage && (
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                        <div className="p-4 border-b border-slate-50">
                                            <p className="font-bold text-slate-900 text-sm">{p.user?.name}</p>
                                            <p className="text-slate-400 text-xs">{p.user?.role} • Institute Photo</p>
                                        </div>
                                        <div className="aspect-video bg-slate-100 relative group">
                                            <img src={`${import.meta.env.VITE_API_URL}${p.pendingInstituteImage}`} alt="Pending" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                                                <button 
                                                    onClick={() => handleProfileApproval(p._id, 'institute', 'approve')}
                                                    disabled={processing === `${p._id}_institute`}
                                                    className="bg-emerald-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
                                                >
                                                    {processing === `${p._id}_institute` ? <Loader2 className="animate-spin" size={24} /> : <Check size={24} />}
                                                </button>
                                                <button 
                                                    onClick={() => handleProfileApproval(p._id, 'institute', 'reject')}
                                                    disabled={processing === `${p._id}_institute`}
                                                    className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
                                                >
                                                    <X size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}

            {/* Ad Photos */}
            {ads.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm">A</span>
                        Advertisement Banners
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ads.map(ad => (
                            <div key={ad._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-slate-50">
                                    <p className="font-bold text-slate-900 text-sm">{ad.coachingId?.name}</p>
                                    <p className="text-slate-400 text-xs">Ad Banner: {ad.title}</p>
                                </div>
                                <div className="aspect-video bg-slate-100 relative group">
                                    <img src={`${import.meta.env.VITE_API_URL}${ad.pendingImageUrl}`} alt="Pending" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                                        <button 
                                            onClick={() => handleAdApproval(ad._id, 'ad', 'approve')}
                                            disabled={processing === `${ad._id}_ad`}
                                            className="bg-emerald-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
                                        >
                                            {processing === `${ad._id}_ad` ? <Loader2 className="animate-spin" size={24} /> : <Check size={24} />}
                                        </button>
                                        <button 
                                            onClick={() => handleAdApproval(ad._id, 'ad', 'reject')}
                                            disabled={processing === `${ad._id}_ad`}
                                            className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPhotoApprovals;
