import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { MapPin, Clock, Star, IndianRupee, GraduationCap, Phone, Lock, ArrowLeft, Send, CheckCircle2, MessageSquare, Shield } from 'lucide-react';

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
            // Step 1: Create Razorpay order
            const orderRes = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
                { tutorId: userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { orderId, amount, currency, keyId, tutorName } = orderRes.data;

            // Step 2: Open Razorpay checkout
            const options = {
                key: keyId,
                amount,
                currency,
                name: 'IIT-NEET Platform',
                description: `Unlock contact of ${tutorName}`,
                order_id: orderId,
                handler: async (response) => {
                    try {
                        // Step 3: Verify payment & unlock
                        const verifyRes = await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/payment/verify-unlock`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                tutorId: userId
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setData(d => ({ ...d, contactUnlocked: true, user: { ...d.user, phone: verifyRes.data.phone } }));
                    } catch (err) {
                        alert(err.response?.data?.message || 'Payment verification failed');
                    } finally {
                        setUnlocking(false);
                    }
                },
                prefill: { name: user.name, email: user.email },
                theme: { color: '#4f46e5' },
                modal: { ondismiss: () => setUnlocking(false) }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to initiate payment');
            setUnlocking(false);
        }
    };

    const handleReview = async (e) => {
        e.preventDefault();
        if (!user) return navigate('/login');
        setSubmitting(true);
        setReviewMsg('');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviews/${userId}`, reviewForm,
                { headers: { Authorization: `Bearer ${token}` } });
            setData(d => ({ ...d, reviews: [res.data, ...d.reviews] }));
            setReviewForm({ rating: 5, comment: '' });
            setReviewMsg('success');
        } catch (err) {
            setReviewMsg(err.response?.data?.message || 'Failed to submit');
        } finally { setSubmitting(false); }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!data) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <p className="text-slate-500 font-medium">Tutor not found.</p>
                <Link to="/tutors" className="text-indigo-600 font-bold text-sm mt-2 inline-block">← Back to Tutors</Link>
            </div>
        </div>
    );

    const { user: tutor, profile, reviews, avgRating, contactUnlocked } = data;
    const avatarUrl = profile?.profileImage
        ? `${import.meta.env.VITE_API_URL}${profile.profileImage}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&size=100&background=e0e7ff&color=3730a3&bold=true&rounded=true`;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 pt-20">
                <div className="page-container py-10 max-w-5xl">
                    <Link to="/tutors" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-semibold mb-6 transition-colors">
                        <ArrowLeft size={16} /> All Tutors
                    </Link>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <img
                            src={avatarUrl}
                            alt={tutor.name}
                            className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-xl shrink-0 object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-2xl font-black text-white">{tutor.name}</h1>
                                {tutor.subscriptionStatus === 'active' && (
                                    <span className="bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">⭐ Featured</span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-blue-300">
                                {profile?.location && <span className="flex items-center gap-1"><MapPin size={13} />{profile.location}</span>}
                                {profile?.experience && <span className="flex items-center gap-1"><Clock size={13} />{profile.experience} yrs experience</span>}
                                {avgRating > 0 && (
                                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                                        <Star size={13} fill="currentColor" />{avgRating} ({reviews.length} reviews)
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {(profile?.subjects || []).map(s => (
                                    <span key={s} className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">{s}</span>
                                ))}
                            </div>
                        </div>
                        {profile?.fees && (
                            <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-center shrink-0">
                                <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">Monthly Fees</p>
                                <p className="text-2xl font-black text-white flex items-center gap-1 justify-center">
                                    <IndianRupee size={18} />{profile.fees}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="page-container py-8 max-w-5xl">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Tabs */}
                        <div className="flex gap-1 bg-white rounded-xl border border-slate-100 p-1 shadow-sm">
                            {['about', 'reviews'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}>
                                    {tab === 'reviews' ? `Reviews (${reviews.length})` : 'About'}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'about' && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 space-y-6">
                                {profile?.bio && (
                                    <div>
                                        <h3 className="font-black text-slate-900 mb-3">About</h3>
                                        <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
                                    </div>
                                )}

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {profile?.experience && (
                                        <div className="bg-indigo-50 rounded-xl p-4 text-center">
                                            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Experience</p>
                                            <p className="font-black text-indigo-900 text-lg">{profile.experience} Yrs</p>
                                        </div>
                                    )}
                                    {profile?.fees && (
                                        <div className="bg-emerald-50 rounded-xl p-4 text-center">
                                            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Fees/Month</p>
                                            <p className="font-black text-emerald-900 text-lg">₹{profile.fees}</p>
                                        </div>
                                    )}
                                    {avgRating > 0 && (
                                        <div className="bg-amber-50 rounded-xl p-4 text-center">
                                            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Rating</p>
                                            <p className="font-black text-amber-900 text-lg flex items-center justify-center gap-1">
                                                <Star size={14} className="fill-amber-400 text-amber-400" />{avgRating}
                                            </p>
                                        </div>
                                    )}
                                    {reviews.length > 0 && (
                                        <div className="bg-violet-50 rounded-xl p-4 text-center">
                                            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-1">Reviews</p>
                                            <p className="font-black text-violet-900 text-lg">{reviews.length}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    {profile?.teachingClass && (
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Teaching Class</p>
                                            <p className="font-bold text-slate-800">{profile.teachingClass}</p>
                                        </div>
                                    )}
                                    {profile?.qualification && (
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Qualification</p>
                                            <p className="font-bold text-slate-800">{profile.qualification}</p>
                                        </div>
                                    )}
                                    {profile?.availability && (
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Mode</p>
                                            <p className="font-bold text-slate-800 capitalize">{profile.availability === 'both' ? 'Online & Offline' : profile.availability}</p>
                                        </div>
                                    )}
                                    {profile?.feesType && (
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Schedule</p>
                                            <p className="font-bold text-slate-800">{profile.feesType === '3days' ? '3 days/week' : profile.feesType === '6days' ? '6 days/week' : 'To be discussed'}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Expert Subject */}
                                {profile?.competitiveExpert && profile?.expertSubject && (
                                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                                        <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Competitive Exam Expert</p>
                                        <p className="font-bold text-amber-900">{profile.expertSubject}</p>
                                    </div>
                                )}

                                {/* Schedule Table */}
                                {profile?.schedule && Object.keys(profile.schedule).length > 0 && (
                                    <div>
                                        <h4 className="font-black text-slate-900 mb-3">Weekly Schedule</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50">
                                                        <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-600">Day</th>
                                                        <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-600">Status</th>
                                                        <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-600">Timing</th>
                                                        <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-600">From</th>
                                                        <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-600">To</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(profile.schedule).map(([day, s]) => (
                                                        <tr key={day} className="hover:bg-slate-50/50">
                                                            <td className="border border-slate-200 px-3 py-2 font-semibold text-slate-700">{day}</td>
                                                            <td className="border border-slate-200 px-3 py-2">
                                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                                                    {s.available ? 'Available' : 'Not Available'}
                                                                </span>
                                                            </td>
                                                            <td className="border border-slate-200 px-3 py-2 text-slate-600">{s.available ? s.timing : '—'}</td>
                                                            <td className="border border-slate-200 px-3 py-2 text-slate-600">{s.available && s.from ? s.from : '—'}</td>
                                                            <td className="border border-slate-200 px-3 py-2 text-slate-600">{s.available && s.to ? s.to : '—'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* YouTube */}
                                {profile?.youtubeChannel && (
                                    <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                                        <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shrink-0">
                                            <span className="text-white font-black text-xs">YT</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-red-600 uppercase tracking-widest">YouTube Channel</p>
                                            <a href={profile.youtubeChannel} target="_blank" rel="noopener noreferrer"
                                                className="font-bold text-slate-800 text-sm hover:text-red-600 transition-colors">
                                                {profile.youtubeChannel}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-4">
                                {user?.role === 'student' && (
                                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                        <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                            <MessageSquare size={18} className="text-indigo-600" /> Write a Review
                                        </h3>
                                        <form onSubmit={handleReview} className="space-y-4">
                                            <StarRating value={reviewForm.rating} onChange={r => setReviewForm(f => ({ ...f, rating: r }))} />
                                            <textarea className="input-field resize-none h-24"
                                                placeholder="Share your experience with this tutor..."
                                                value={reviewForm.comment}
                                                onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))} required />
                                            {reviewMsg === 'success' && (
                                                <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold bg-emerald-50 p-3 rounded-xl">
                                                    <CheckCircle2 size={16} /> Review submitted successfully!
                                                </div>
                                            )}
                                            {reviewMsg && reviewMsg !== 'success' && (
                                                <p className="text-red-500 text-sm font-semibold">{reviewMsg}</p>
                                            )}
                                            <button type="submit" disabled={submitting} className="btn btn-primary gap-2">
                                                <Send size={15} /> {submitting ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                        </form>
                                    </div>
                                )}
                                {reviews.length === 0 ? (
                                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                                        <Star size={36} className="mx-auto text-slate-200 mb-3" />
                                        <p className="text-slate-500 font-medium">No reviews yet. Be the first to review!</p>
                                    </div>
                                ) : reviews.map(r => (
                                    <div key={r._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(r.student?.name || 'U')}&size=40&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                                                    alt={r.student?.name} className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">{r.student?.name}</p>
                                                    <p className="text-xs text-slate-400">{new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={13} className={i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{r.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Contact */}
                    <div>
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
                            <h3 className="font-black text-slate-900 mb-5">Contact Tutor</h3>

                            {tutor.showPhone && tutor.phone ? (
                                <a href={`tel:${tutor.phone}`} className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4 hover:bg-emerald-100 transition-colors">
                                    <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                                        <Phone size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Phone</p>
                                        <p className="font-black text-slate-800">{tutor.phone}</p>
                                    </div>
                                </a>
                            ) : contactUnlocked && tutor.phone ? (
                                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
                                    <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                                        <CheckCircle2 size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Unlocked</p>
                                        <p className="font-black text-slate-800">{tutor.phone}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 mb-3">
                                        <div className="w-9 h-9 bg-slate-300 rounded-lg flex items-center justify-center shrink-0">
                                            <Lock size={16} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Phone Hidden</p>
                                            <p className="font-black text-slate-400 tracking-widest">+91 ••••••••••</p>
                                        </div>
                                    </div>
                                    <button onClick={handleUnlock} disabled={unlocking}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
                                        <Lock size={15} />
                                        {unlocking ? 'Processing...' : 'Unlock Contact — ₹200'}
                                    </button>
                                    <p className="text-xs text-slate-400 text-center mt-2">One-time payment. Instant access.</p>
                                </div>
                            )}

                            {!user && (
                                <p className="text-xs text-slate-400 text-center bg-slate-50 rounded-xl p-3 mb-4">
                                    <Link to="/login" className="text-indigo-600 font-bold">Login</Link> as student to unlock contact
                                </p>
                            )}

                            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 rounded-xl p-3">
                                <Shield size={14} className="text-emerald-500 shrink-0" />
                                <span>Verified tutor. Safe & secure platform.</span>
                            </div>

                            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-500">
                                {profile?.subjects?.length > 0 && (
                                    <div className="flex items-start gap-2">
                                        <GraduationCap size={15} className="mt-0.5 text-indigo-400 shrink-0" />
                                        <span>{profile.subjects.join(', ')}</span>
                                    </div>
                                )}
                                {profile?.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin size={15} className="text-indigo-400 shrink-0" />
                                        <span>{profile.location}</span>
                                    </div>
                                )}
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






