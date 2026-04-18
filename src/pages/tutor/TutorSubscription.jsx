import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Zap, Star, Clock, AlertCircle, CreditCard } from 'lucide-react';

const TutorSubscription = () => {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [currentSub, setCurrentSub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(null);

    const token = user?.token;

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

    const handlePurchase = async (plan) => {
        setPurchasing(plan._id);
        try {
            // Create Razorpay order
            const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/subscriptions/create-order`,
                { planId: plan._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { orderId, amount, currency, keyId } = orderRes.data;

            const options = {
                key: keyId,
                amount,
                currency,
                name: 'IIT-NEET Platform',
                description: `${plan.name} - ${plan.duration} days`,
                order_id: orderId,
                handler: async (response) => {
                    try {
                        await axios.post(`${import.meta.env.VITE_API_URL}/api/subscriptions/verify-purchase`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                planId: plan._id
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        // Refresh subscription
                        const subRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/subscriptions/mine`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        setCurrentSub(subRes.data);
                        alert('Subscription activated successfully!');
                    } catch (err) {
                        alert(err.response?.data?.message || 'Payment verification failed');
                    } finally {
                        setPurchasing(null);
                    }
                },
                prefill: { name: user.name, email: user.email },
                theme: { color: '#4f46e5' },
                modal: { ondismiss: () => setPurchasing(null) }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to initiate payment');
            setPurchasing(null);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-black text-slate-900">Subscription Plans</h2>
                <p className="text-slate-500 text-sm mt-1">Activate a plan to appear in public listings</p>
            </div>

            {/* Current Subscription */}
            {currentSub ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-emerald-100 p-2 rounded-xl shrink-0">
                        <CheckCircle2 size={20} className="text-emerald-600" />
                    </div>
                    <div>
                        <h4 className="font-black text-emerald-900">Active: {currentSub.plan?.name}</h4>
                        <p className="text-emerald-700 text-sm mt-0.5">
                            Valid until {new Date(currentSub.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-xl shrink-0">
                        <AlertCircle size={20} className="text-amber-600" />
                    </div>
                    <div>
                        <h4 className="font-black text-amber-900">No Active Subscription</h4>
                        <p className="text-amber-700 text-sm mt-0.5">Your profile is not visible to students. Purchase a plan to get listed.</p>
                    </div>
                </div>
            )}

            {/* Plans */}
            {plans.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <CreditCard size={40} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500 font-medium">No plans available yet.</p>
                    <p className="text-slate-400 text-sm mt-1">Contact admin to create subscription plans.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map(plan => {
                        const isActive = currentSub?.plan?._id === plan._id;
                        return (
                            <div key={plan._id}
                                className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col ${isActive ? 'border-emerald-300 ring-2 ring-emerald-200' : 'border-slate-100'}`}>
                                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-6">
                                    {isActive && (
                                        <span className="bg-emerald-400 text-emerald-900 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 inline-block">
                                            ✓ Current Plan
                                        </span>
                                    )}
                                    <h3 className="font-black text-white text-xl">{plan.name}</h3>
                                    <p className="text-blue-300 text-xs mt-1 capitalize">
                                        {plan.forRole === 'both' ? 'Tutor & Coaching' : plan.forRole}
                                    </p>
                                    <div className="flex items-baseline gap-1 mt-4">
                                        <span className="text-4xl font-black text-white">₹{plan.price}</span>
                                        <span className="text-blue-300 text-sm flex items-center gap-1">
                                            <Clock size={12} /> {plan.duration} days
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <ul className="space-y-3 mb-6 flex-1">
                                        {(plan.features || []).map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => !isActive && handlePurchase(plan)}
                                        disabled={isActive || purchasing === plan._id}
                                        className={`w-full py-3 rounded-xl font-black text-sm transition-all ${
                                            isActive
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
                                        }`}
                                    >
                                        {isActive ? '✓ Active Plan' : purchasing === plan._id ? 'Processing...' : `Buy Now — ₹${plan.price}`}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TutorSubscription;




