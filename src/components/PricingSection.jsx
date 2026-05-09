import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, GraduationCap, BookOpen, Building2, Star, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PricingSection = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [modal, setModal] = useState(null);

    const plans = [
        {
            name: "For Students",
            price: "₹200",
            period: "per two contacts",
            validity: "Unlimited Validity",
            description: "Access hidden tutor contact numbers and connect directly with the best tutors near you.",
            features: [
                "Access 2 hidden tutor contacts",
                "Unlimited validity — never expires",
                "Search verified tutors",
                "Filter by subject & location",
                "Instant contact unlock"
            ],
            icon: GraduationCap,
            recommended: false,
            role: "student"
        },
        {
            name: "For Tutors",
            price: "₹500",
            period: "per year",
            validity: "Renewal after one year",
            description: "Get your profile listed publicly and connect with thousands of students looking for tutors.",
            features: [
                "Public profile listing",
                "Appear in tutor search results",
                "Receive student inquiries",
                "1 year active membership",
                "Re-activate within 15 days of expiry"
            ],
            icon: BookOpen,
            recommended: true,
            role: "tutor"
        },
        {
            name: "For Coachings",
            price: "₹2000",
            period: "per year",
            validity: "Renewal after one year",
            description: "Showcase your coaching institute to thousands of IIT-JEE & NEET aspirants across India.",
            features: [
                "Full advertising page",
                "Appear on homepage carousel",
                "1 year public visibility",
                "Social media links display",
                "Re-activate within 15 days of expiry"
            ],
            icon: Building2,
            recommended: false,
            role: "coaching"
        }
    ];

    const handlePlanClick = (planRole) => {
        if (!user) { setModal({ type: 'login', role: planRole }); return; }
        if (planRole === 'student' && user.role === 'student') { navigate('/student/profile'); return; }
        if (planRole === 'tutor' && user.role === 'tutor') { navigate('/tutor/subscription'); return; }
        if (planRole === 'coaching' && user.role === 'coaching') { navigate('/coaching/subscription'); return; }
        setModal({ type: 'wrong-role', role: planRole });
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="page-container">
                <div className="text-center mb-16">
                    <p className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">Our Pricing Plans</p>
                    <h2 className="text-3xl md:text-4xl font-black text-blue-900 uppercase tracking-tight">Simple & Honest Pricing</h2>
                    <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mt-4"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <div key={i} className={`flex flex-col bg-white border-2 transition-all duration-300 hover:shadow-2xl ${plan.recommended ? 'border-amber-500 scale-105 z-10' : 'border-gray-200'}`}>
                            {/* Header */}
                            <div className={`${plan.recommended ? 'bg-amber-500' : 'bg-blue-900'} p-8 relative overflow-hidden`}>
                                {plan.recommended && (
                                    <div className="absolute top-4 right-4 bg-white text-amber-500 text-[9px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-widest">
                                        Popular
                                    </div>
                                )}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                                        <plan.icon size={26} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-white uppercase tracking-tight">{plan.name}</h3>
                                        <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{plan.validity}</p>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-white">{plan.price}</span>
                                    <span className="text-white/60 text-xs font-bold">{plan.period}</span>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-8 flex flex-col flex-1">
                                <p className="text-gray-500 text-xs mb-8 leading-relaxed font-medium">
                                    {plan.description}
                                </p>
                                <ul className="space-y-3.5 mb-10 flex-1">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3 text-xs text-gray-600 font-bold">
                                            <CheckCircle size={16} className={`${plan.recommended ? 'text-amber-500' : 'text-blue-900'} shrink-0 mt-0.5`} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => handlePlanClick(plan.role)} className={`w-full py-4 font-black text-xs uppercase tracking-widest transition-all ${plan.recommended ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-blue-900 hover:bg-blue-800 text-white'}`}>
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={() => setModal(null)}>
                    <div className="bg-white rounded-none border-4 border-blue-900 p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-blue-900 text-xl uppercase tracking-tighter">
                                {modal.type === 'login' ? 'Access Denied' : 'Invalid Account'}
                            </h3>
                            <button onClick={() => setModal(null)} className="text-gray-400 hover:text-blue-900 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mb-8 font-medium leading-relaxed">
                            {modal.type === 'login' 
                                ? `You must be logged in to purchase the ${modal.role} plan. Please login or create a new account.` 
                                : `This plan is specifically for ${modal.role}s. Your current account type (${user?.role}) is not eligible.`}
                        </p>
                        <div className="flex gap-4">
                            {modal.type === 'login' ? (
                                <>
                                    <Link to="/login" className="flex-1 text-center bg-blue-900 text-white py-3 font-black text-sm uppercase tracking-widest hover:bg-blue-800 transition-all">Login</Link>
                                    <Link to="/register" className="flex-1 text-center border-2 border-blue-900 text-blue-900 py-3 font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all">Register</Link>
                                </>
                            ) : (
                                <button onClick={() => setModal(null)} className="w-full bg-blue-900 text-white py-3 font-black text-sm uppercase tracking-widest">Understand</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PricingSection;
