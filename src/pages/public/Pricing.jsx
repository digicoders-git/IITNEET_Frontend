import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Pricing = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Choose the plan that's right for you and start reaching more students today.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Students Plan */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col">
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">For Students</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-slate-900">Free</span>
                                </div>
                                <p className="text-slate-600 mb-6">Search and contact verified tutors and coaching institutes.</p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        Search Tutors by Subject
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        View Coaching Details
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        Direct Contact Details
                                    </li>
                                </ul>
                            </div>
                            <div className="p-8 bg-slate-50 mt-auto border-t border-slate-100">
                                <button className="w-full py-3 px-6 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">Register Now</button>
                            </div>
                        </div>

                        {/* Tutors Plan */}
                        <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-600 overflow-hidden flex flex-col relative scale-105 z-10">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-bl-lg">Popular</div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">For Tutors</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-slate-900">₹99</span>
                                    <span className="text-slate-500">/month</span>
                                </div>
                                <p className="text-slate-600 mb-6">Create your profile and start getting leads from interested parents.</p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        Public Profile Listing
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        Verified Badge
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        Subject Highlighting
                                    </li>
                                </ul>
                            </div>
                            <div className="p-8 bg-blue-50 mt-auto border-t border-blue-100">
                                <button className="w-full py-3 px-6 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">Start Trial</button>
                            </div>
                        </div>

                        {/* Coaching Plan */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col">
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">For Coachings</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-slate-900">₹499</span>
                                    <span className="text-slate-500">/month</span>
                                </div>
                                <p className="text-slate-600 mb-6">Boost your institute's visibility and attract more students.</p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        Featured Institute Listing
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        Banner Advertising
                                    </li>
                                    <li className="flex items-center gap-2 text-slate-600">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path></svg>
                                        Unlimited Student Contacts
                                    </li>
                                </ul>
                            </div>
                            <div className="p-8 bg-slate-50 mt-auto border-t border-slate-100">
                                <button className="w-full py-3 px-6 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors">Contact Sales</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Pricing;
