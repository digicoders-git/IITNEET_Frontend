import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
    MapPin, Clock, Star, IndianRupee, GraduationCap, Phone, Lock, 
    ArrowLeft, Send, CheckCircle2, MessageSquare, Shield, Zap, Youtube, ExternalLink, Loader2 
} from 'lucide-react';

const StarRating = ({ value, onChange }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
            <button key={n} type="button" onClick={() => onChange && onChange(n)}>
                <Star size={24} className={n <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
            </button>
        ))}
    </div>
);

const TutorPublicProfile = () => {
    const { userId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unlocking, setUnlocking] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const [reviewMsg, setReviewMsg] = useState('');
    const [activeTab, setActiveTab] = useState('about');

    const token = user?.token;

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/tutor/${userId}?t=${Date.now()}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        }).then(res => { setData(res.data); setLoading(false); })
          .catch(() => setLoading(false));
    }, [userId, token]);

    const handleUnlock = async () => {
        if (!user) return navigate('/login');
        setUnlocking(true);
        try {
            const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, { tutorId: userId }, { headers: { Authorization: `Bearer ${token}` } });
            const { orderId, amount, currency, keyId, tutorName } = orderRes.data;
            const options = {
                key: keyId, amount, currency, name: 'IIT-NEET Platform', description: `Unlock contact of ${tutorName}`, order_id: orderId,
                handler: async (response) => {
                    try {
                        const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/verify-unlock`, {
                            razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature, tutorId: userId
                        }, { headers: { Authorization: `Bearer ${token}` } });
                        setData(d => ({ ...d, contactUnlocked: true, user: { ...d.user, phone: verifyRes.data.phone } }));
                    } catch (err) { alert('Payment verification failed'); } finally { setUnlocking(false); }
                },
                prefill: { name: user.name, email: user.email }, theme: { color: '#1e3a8a' },
                modal: { ondismiss: () => setUnlocking(false) }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) { alert('Failed to initiate payment'); setUnlocking(false); }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        if (!user) return navigate('/login');
        setSubmitting(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviews/${userId}`, reviewForm, { headers: { Authorization: `Bearer ${token}` } });
            setData(d => ({ ...d, reviews: [res.data, ...d.reviews] }));
            setReviewForm({ rating: 5, comment: '' });
            setReviewMsg('success');
        } catch (err) { setReviewMsg(err.response?.data?.message || 'Failed to submit'); } finally { setSubmitting(false); }
    };

    if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="w-12 h-12 text-blue-900 animate-spin" /></div>;
    if (!data) return <div className="min-h-screen bg-white flex items-center justify-center text-center"><div><p className="text-slate-500 font-bold">Tutor not found.</p><Link to="/tutors" className="text-blue-900 underline mt-4 inline-block">Back to search</Link></div></div>;

    const { user: tutor, profile, reviews, avgRating, contactUnlocked } = data;
    const avatarUrl = profile?.profileImage ? `${import.meta.env.VITE_API_URL}${profile.profileImage}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&size=300&background=1e3a8a&color=fff&bold=true`;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header / Hero */}
            <div className="bg-white border-b border-slate-200 pt-24 pb-8 md:pt-32">
                <div className="page-container">
                    <Link to="/tutors" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-900 text-sm font-bold mb-8 transition-colors">
                        <ArrowLeft size={16} /> All Tutors
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        {/* Profile Photo */}
                        <div className="relative group shrink-0 mx-auto md:mx-0">
                            <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <img src={avatarUrl} alt={tutor.name} className="w-full h-full object-cover" />
                            </div>
                            {tutor.subscriptionStatus === 'active' && (
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5 border-2 border-white">
                                    <Star size={12} fill="currentColor" /> Featured
                                </div>
                            )}
                        </div>

                        {/* Basic Info */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">{tutor.name}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-bold text-sm">
                                    {profile?.location && <span className="flex items-center gap-1.5"><MapPin size={16} className="text-blue-900" />{profile.location}</span>}
                                    {profile?.experience && <span className="flex items-center gap-1.5"><Clock size={16} className="text-blue-900" />{profile.experience} Yrs Exp</span>}
                                    {avgRating > 0 && <span className="flex items-center gap-1.5 text-amber-500"><Star size={16} fill="currentColor" />{avgRating} Rating</span>}
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {(profile?.subjects || []).map(s => (
                                    <span key={s} className="bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">
                                        {s}
                                    </span>
                                ))}
                            </div>

                            {profile?.competitiveExpert && profile?.expertSubject && (
                                <div className="inline-flex items-center gap-3 bg-blue-900 text-white px-5 py-3 rounded-2xl shadow-xl shadow-blue-900/10">
                                    <Zap size={18} fill="currentColor" className="text-amber-400" />
                                    <div className="text-left">
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-0.5">Competitive Expert</p>
                                        <p className="text-sm font-black">{profile.expertSubject}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Monthly Fees (Desktop) */}
                        <div className="hidden lg:block shrink-0 bg-blue-50 border-2 border-blue-100 p-8 rounded-3xl text-center">
                            <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">Starting From</p>
                            <p className="text-4xl font-black text-blue-900 flex items-center justify-center gap-1">
                                <IndianRupee size={24} /> {profile.fees || 'TBD'}
                            </p>
                            <p className="text-[10px] text-blue-400 font-bold uppercase mt-1">Per Month</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="page-container py-12">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Mobile Stats / Fees */}
                        <div className="lg:hidden bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between text-center">
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Monthly Fees</p>
                                <p className="text-xl font-black text-blue-900 tracking-tight">₹{profile.fees || 'TBD'}</p>
                            </div>
                            <div className="w-px h-8 bg-slate-100"></div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Experience</p>
                                <p className="text-xl font-black text-blue-900 tracking-tight">{profile.experience} Yrs</p>
                            </div>
                        </div>

                        {/* Details Tabs */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="flex border-b border-slate-100 p-2">
                                <button onClick={() => setActiveTab('about')} className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-2xl transition-all ${activeTab === 'about' ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>
                                    Profile
                                </button>
                                <button onClick={() => setActiveTab('reviews')} className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-2xl transition-all ${activeTab === 'reviews' ? 'bg-blue-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>
                                    Reviews ({reviews.length})
                                </button>
                            </div>

                            <div className="p-8 md:p-12">
                                {activeTab === 'about' ? (
                                    <div className="space-y-12">
                                        {profile?.bio && (
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 mb-4">Professional Biography</h3>
                                                <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">{profile.bio}</p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qualification</p>
                                                <p className="font-bold text-slate-900">{profile.qualification || 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level</p>
                                                <p className="font-bold text-slate-900">{profile.teachingClass || 'Any'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teaching Mode</p>
                                                <p className="font-bold text-slate-900 capitalize">{profile.availability || 'Online/Offline'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weekly Frequency</p>
                                                <p className="font-bold text-slate-900">{profile.feesType || 'Discuss'}</p>
                                            </div>
                                        </div>

                                        {profile?.youtubeChannel && (
                                            <div className="bg-red-50 border border-red-100 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                                                <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-600/20"><Youtube size={32} /></div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <h4 className="font-black text-red-900">Demo Lectures</h4>
                                                    <p className="text-red-700/60 text-sm mb-4">Experience my teaching style on YouTube</p>
                                                    <a href={profile.youtubeChannel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all">
                                                        Visit Channel <ExternalLink size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {user?.role === 'student' && (
                                            <div className="bg-slate-50 p-8 rounded-3xl mb-8">
                                                <h4 className="font-black text-slate-900 mb-6">Leave a Review</h4>
                                                <form onSubmit={handleReview} className="space-y-6">
                                                    <StarRating value={reviewForm.rating} onChange={r => setReviewForm(f => ({ ...f, rating: r }))} />
                                                    <textarea className="w-full p-6 rounded-2xl border-2 border-white focus:border-blue-900 outline-none h-32 text-slate-600 transition-all"
                                                        placeholder="How was your experience?" value={reviewForm.comment}
                                                        onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))} required />
                                                    <button type="submit" disabled={submitting} className="btn bg-blue-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest w-full">
                                                        {submitting ? 'Posting...' : 'Post Review'}
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                        {reviews.length === 0 ? (
                                            <div className="text-center py-12 opacity-50"><MessageSquare size={48} className="mx-auto mb-4" /><p className="font-bold">No reviews yet.</p></div>
                                        ) : (
                                            reviews.map(r => (
                                                <div key={r._id} className="border-b border-slate-100 last:border-0 pb-8 last:pb-0">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400">{r.student?.name?.charAt(0)}</div>
                                                            <div><p className="font-black text-slate-900 text-sm">{r.student?.name}</p><p className="text-[10px] font-bold text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</p></div>
                                                        </div>
                                                        <div className="flex gap-0.5"><Star size={14} className="fill-amber-400 text-amber-400" /><span className="text-xs font-black text-amber-900 ml-1">{r.rating}</span></div>
                                                    </div>
                                                    <p className="text-slate-600 italic">"{r.comment}"</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 sticky top-24">
                            <h3 className="text-xl font-black text-blue-900">Direct Contact</h3>
                            
                            {tutor.showPhone && tutor.phone ? (
                                <a href={`tel:${tutor.phone}`} className="flex items-center gap-4 bg-emerald-50 border-2 border-emerald-100 p-6 rounded-2xl hover:bg-emerald-100 transition-all group">
                                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"><Phone size={20} /></div>
                                    <div className="flex-1"><p className="text-[10px] font-black text-emerald-600 uppercase mb-0.5 tracking-widest">Call Now</p><p className="text-lg font-black text-emerald-950">{tutor.phone}</p></div>
                                </a>
                            ) : contactUnlocked && tutor.phone ? (
                                <div className="flex items-center gap-4 bg-blue-50 border-2 border-blue-100 p-6 rounded-2xl">
                                    <div className="w-12 h-12 bg-blue-900 text-white rounded-xl flex items-center justify-center"><CheckCircle2 size={20} /></div>
                                    <div><p className="text-[10px] font-black text-blue-900 uppercase mb-0.5 tracking-widest">Unlocked</p><p className="text-lg font-black text-blue-950">{tutor.phone}</p></div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl opacity-60">
                                        <div className="w-12 h-12 bg-slate-300 text-white rounded-xl flex items-center justify-center"><Lock size={20} /></div>
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase mb-0.5">Phone Hidden</p><p className="text-lg font-black text-slate-400">+91 ••••• •••••</p></div>
                                    </div>
                                    <button onClick={handleUnlock} disabled={unlocking} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 transition-all active:scale-95">
                                        {unlocking ? <Loader2 size={20} className="animate-spin" /> : <Lock size={18} />}
                                        {unlocking ? 'Processing...' : 'Unlock Now — ₹200'}
                                    </button>
                                </div>
                            )}

                            <div className="pt-6 border-t border-slate-50 space-y-4">
                                <div className="flex items-center gap-3 text-emerald-600">
                                    <Shield size={18} className="shrink-0" />
                                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Verified Platform Account</p>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">Payments are processed securely via Razorpay. One-time unlock fee.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TutorPublicProfile;
