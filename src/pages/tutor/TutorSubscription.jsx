import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
    CheckCircle2, Clock, AlertCircle, CreditCard, BookOpen,
    CalendarCheck, RefreshCw, Users, IndianRupee, ShieldCheck, Loader2, X
} from 'lucide-react';

const TutorSubscription = () => {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [currentSub, setCurrentSub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(false);

    const token = user?.token;

    const TUTOR_PLAN = {
        name: 'Tutor Membership',
        price: 500,
        duration: 365,
        validity: '1 Year',
        features: [
            'Public profile listing for 1 year',
            'Appear in tutor search results',
            'Receive student inquiries',
            'Show/hide contact number',
            'Re-activate within 15 days of expiry',
        ],
    };

    useEffect(() => {
        Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/subscriptions/plans`, {
                headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${import.meta.env.VITE_API_URL}/api/subscriptions/mine`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ]).then(([plansRes, subRes]) => {
            setPlans(plansRes.data);
            setCurrentSub(subRes.data);
        }).catch(() => {}).finally(() => setLoading(false));
    }, [token]);

    const handlePurchase = async (planId = null, price = TUTOR_PLAN.price, name = TUTOR_PLAN.name, duration = TUTOR_PLAN.duration) => {
        if (!user?.isApproved) {
            setShowApprovalModal(true);
            return;
        }
        setPurchasing(planId || 'default');
        try {
            let orderId, amount, currency, keyId;

            if (planId) {
                const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/subscriptions/create-order`,
                    { planId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                ({ orderId, amount, currency, keyId } = orderRes.data);
            } else {
                const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/subscriptions/create-order-default`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                ({ orderId, amount, currency, keyId } = orderRes.data);
            }

            const options = {
                key: keyId,
                amount,
                currency,
                name: 'IIT-NEET Platform',
                description: `${name} — ${duration} days`,
                order_id: orderId,
                handler: async (response) => {
                    try {
                        await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/subscriptions/${planId ? 'verify-purchase' : 'verify-default'}`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                ...(planId ? { planId } : {})
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        const subRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/subscriptions/mine`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        setCurrentSub(subRes.data);
                    } catch (err) {
                        alert(err.response?.data?.message || 'Payment verification failed');
                    } finally {
                        setPurchasing(false);
                    }
                },
                prefill: { name: user.name, email: user.email },
                theme: { color: '#1e3a8a' },
                modal: { ondismiss: () => setPurchasing(false) }
            };

            new window.Razorpay(options).open();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to initiate payment');
            setPurchasing(false);
        }
    };

    const isDefaultActive = currentSub && !currentSub.plan?._id;
    const daysLeft = currentSub
        ? Math.max(0, Math.ceil((new Date(currentSub.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
        : 0;

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-blue-900 animate-spin" />
        </div>
    );

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-black text-slate-900">Subscription</h2>
                <p className="text-slate-500 text-sm mt-1">Activate your membership to appear in public listings</p>
            </div>

            {/* Current Subscription Status */}
            {currentSub ? (
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-emerald-100 p-2.5 rounded-xl shrink-0">
                        <ShieldCheck size={22} className="text-emerald-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-black text-emerald-900 text-lg">
                            Active — {currentSub.plan?.name || TUTOR_PLAN.name}
                        </h4>
                        <p className="text-emerald-700 text-sm mt-0.5">
                            Valid until {new Date(currentSub.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 bg-emerald-200 rounded-full h-2">
                                <div
                                    className="bg-emerald-500 h-2 rounded-full transition-all"
                                    style={{ width: `${Math.min(100, (daysLeft / 365) * 100)}%` }}
                                />
                            </div>
                            <span className="text-xs font-black text-emerald-700 shrink-0">{daysLeft} days left</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-amber-100 p-2.5 rounded-xl shrink-0">
                        <AlertCircle size={22} className="text-amber-600" />
                    </div>
                    <div>
                        <h4 className="font-black text-amber-900">No Active Subscription</h4>
                        <p className="text-amber-700 text-sm mt-0.5">
                            Your profile is not visible to students. Purchase a plan to get listed.
                        </p>
                    </div>
                </div>
            )}

            {/* Default Tutor Plan Card */}
            <div className="bg-white rounded-2xl border-2 border-blue-900 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-blue-900 to-indigo-900 px-8 py-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                            <BookOpen size={26} className="text-amber-400" />
                        </div>
                        <div>
                            <p className="text-blue-300 text-xs font-black uppercase tracking-widest">Standard Plan</p>
                            <h3 className="text-2xl font-black text-white">{TUTOR_PLAN.name}</h3>
                        </div>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-5xl font-black text-amber-400">₹{TUTOR_PLAN.price}</span>
                        <span className="text-blue-300 text-sm mb-1.5">/ year</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        <Clock size={12} /> Renewal after 1 year
                    </div>
                </div>

                <div className="p-8">
                    <ul className="space-y-3 mb-8">
                        {TUTOR_PLAN.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                <CheckCircle2 size={17} className="text-emerald-500 shrink-0" /> {f}
                            </li>
                        ))}
                    </ul>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { icon: CalendarCheck, label: 'Duration', value: '365 Days' },
                            { icon: RefreshCw, label: 'Renewal', value: '15 Day Grace' },
                            { icon: Users, label: 'Visibility', value: 'All Students' },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                                <Icon size={18} className="mx-auto text-blue-900 mb-2" />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                                <p className="font-black text-slate-800 text-sm mt-0.5">{value}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePurchase(null)}
                        disabled={purchasing !== false}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                    >
                        {purchasing === 'default'
                            ? <><Loader2 size={16} className="animate-spin" /> Processing...</>
                            : <><IndianRupee size={16} /> {currentSub ? 'Renew Membership — ₹500' : 'Activate Membership — ₹500'}</>
                        }
                    </button>
                    <p className="text-xs text-slate-400 text-center mt-3">
                        Secure payment via Razorpay · GST inclusive · No hidden charges
                    </p>
                </div>
            </div>

            {/* Admin Plans (if any) */}
            {plans.length > 0 && (
                <div>
                    <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest mb-4">Other Available Plans</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {plans.map(plan => {
                            const isActive = currentSub?.plan?._id === plan._id;
                            return (
                                <div key={plan._id}
                                    className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden flex flex-col ${isActive ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-100'}`}>
                                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-5">
                                        {isActive && (
                                            <span className="bg-emerald-400 text-emerald-900 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 inline-flex items-center gap-1">
                                                <CheckCircle2 size={10} /> Current Plan
                                            </span>
                                        )}
                                        <h3 className="font-black text-white text-lg">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1 mt-3">
                                            <span className="text-3xl font-black text-white">₹{plan.price}</span>
                                            <span className="text-slate-400 text-sm flex items-center gap-1">
                                                <Clock size={11} /> {plan.duration} days
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <ul className="space-y-2.5 mb-5 flex-1">
                                            {(plan.features || []).map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => !isActive && handlePurchase(plan._id, plan.price, plan.name, plan.duration)}
                                            disabled={isActive || purchasing !== false}
                                            className={`w-full py-3 rounded-xl font-black text-sm transition-all ${
                                                isActive
                                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                                                    : 'bg-blue-900 hover:bg-blue-800 text-white'
                                            }`}
                                        >
                                            {isActive ? '✓ Active' : purchasing === plan._id ? 'Processing...' : `Buy — ₹${plan.price}`}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Approval Pending Modal */}
            {showApprovalModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative border-4 border-amber-400">
                        <button 
                            onClick={() => setShowApprovalModal(false)}
                            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle size={40} className="text-amber-600" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Verification Pending</h3>
                            <p className="text-slate-500 leading-relaxed font-medium mb-8">
                                Your account is currently under review by our team. You can activate your membership once your profile has been verified. 
                                <br/><br/>
                                <span className="text-blue-900 font-bold italic">Usually takes 24-48 hours.</span>
                            </p>
                            <button 
                                onClick={() => setShowApprovalModal(false)}
                                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-4 rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg"
                            >
                                Got it, I'll wait
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TutorSubscription;
