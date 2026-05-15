import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PricingSection from '../../components/PricingSection';
import { HelpCircle, CreditCard, ChevronDown, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

const Help = () => {
    const [activeTab, setActiveTab] = useState('faq');

    const faqs = [
        {
            q: "How can I find a tutor?",
            a: "You can find a tutor by navigating to the 'Tutors' page and using the search filters to search by subject, city, and class level."
        },
        {
            q: "Is it free for students?",
            a: "Yes, students can search and contact verified tutors and coaching institutes for free on iitneet.com."
        },
        {
            q: "How do I register as a tutor?",
            a: "You can register as a tutor by clicking on the 'Become a Tutor' button in the navbar and filling out the registration form."
        },
        {
            q: "What is the benefit of a premium plan for tutors?",
            a: "Premium plans provide tutors with better visibility, a verified badge, and highlighted subject listings to attract more students."
        },
        {
            q: "How do I list my coaching institute?",
            a: "Register an account as a coaching institute, fill in your details in the dashboard, and your institute will be listed in the 'Coaching Institute' section."
        },
        {
            q: "Is my personal information safe?",
            a: "Yes, we take data privacy seriously. Your contact details are only shared according to your visibility settings and with authorized users."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Header */}
            <section className="pt-32 pb-20 bg-blue-900 relative overflow-hidden border-b-4 border-amber-500">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-amber-500 opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
                
                <div className="page-container relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        Help <span className="text-amber-500">Center</span>
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
                        Everything you need to know about iitneet.com. Find answers, check pricing, or get support.
                    </p>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="bg-blue-900 border-b border-blue-800 sticky top-16 z-40">
                <div className="page-container flex justify-center">
                    <button 
                        onClick={() => setActiveTab('faq')}
                        className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all border-b-4 ${activeTab === 'faq' ? 'border-amber-500 text-amber-500' : 'border-transparent text-white/60 hover:text-white'}`}
                    >
                        <div className="flex items-center gap-2">
                            <HelpCircle size={18} />
                            <span>FAQs</span>
                        </div>
                    </button>
                    <button 
                        onClick={() => setActiveTab('pricing')}
                        className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all border-b-4 ${activeTab === 'pricing' ? 'border-amber-500 text-amber-500' : 'border-transparent text-white/60 hover:text-white'}`}
                    >
                        <div className="flex items-center gap-2">
                            <CreditCard size={18} />
                            <span>Pricing</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="py-20">
                {activeTab === 'faq' ? (
                    <div className="page-container max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tight mb-4">Frequently Asked Questions</h2>
                            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-gray-50 rounded-2xl border-2 border-gray-100 open:border-blue-900/10 open:shadow-lg transition-all duration-300">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <h3 className="text-lg font-bold text-blue-900 pr-8">{faq.q}</h3>
                                        <ChevronDown className="text-blue-900 transition-transform group-open:rotate-180" size={20} />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed font-medium">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>

                        {/* Contact Support CTA */}
                        <div className="mt-20 bg-blue-50 p-10 rounded-[2.5rem] border-2 border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6 text-left">
                                <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                                    <MessageSquare size={32} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Still have questions?</h4>
                                    <p className="text-blue-700/70 font-medium">Our support team is here to help you 24/7.</p>
                                </div>
                            </div>
                            <a href="/contact" className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 font-black uppercase tracking-widest transition-all rounded-xl shadow-lg hover:shadow-amber-500/20">
                                Contact Support
                            </a>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tight mb-4">Pricing & Plans</h2>
                            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
                        </div>
                        <PricingSection />
                        
                        {/* Trust Badges */}
                        <div className="page-container mt-10">
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="flex items-center gap-4 p-6 bg-white border-2 border-gray-50 rounded-2xl">
                                    <ShieldCheck className="text-green-500" size={32} />
                                    <div>
                                        <h5 className="font-bold text-blue-900">Secure Payments</h5>
                                        <p className="text-xs text-gray-500">100% Encrypted Transactions</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-white border-2 border-gray-50 rounded-2xl">
                                    <Zap className="text-amber-500" size={32} />
                                    <div>
                                        <h5 className="font-bold text-blue-900">Instant Access</h5>
                                        <p className="text-xs text-gray-500">Immediate Plan Activation</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-white border-2 border-gray-50 rounded-2xl">
                                    <HelpCircle className="text-blue-500" size={32} />
                                    <div>
                                        <h5 className="font-bold text-blue-900">24/7 Support</h5>
                                        <p className="text-xs text-gray-500">Priority Assistance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Help;
