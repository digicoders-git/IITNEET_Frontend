import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PricingSection from '../../components/PricingSection';
import { Zap, Target, Award, BarChart3 } from 'lucide-react';

const Pricing = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="relative pt-32 pb-20 bg-blue-900 overflow-hidden border-b-4 border-amber-500">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-amber-500 opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
                
                <div className="page-container relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 px-4 py-1.5 rounded-full text-amber-400 text-sm font-bold mb-6">
                            <Zap size={16} className="fill-current" />
                            <span>Premium Plans for Tutors & Coachings</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                            Pricing <span className="text-amber-500">& Plans</span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
                            Transparent pricing designed to help you grow. No hidden charges, just results.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Section Component */}
            <PricingSection />

            {/* Why Choose Section */}
            <section className="py-20 bg-white">
                <div className="page-container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-blue-900 mb-4 uppercase tracking-tight">Why Premium?</h2>
                        <div className="w-20 h-2 bg-amber-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 hover:border-blue-900/10 hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-900 group-hover:text-white transition-all transform group-hover:rotate-6">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Targeted Reach</h3>
                            <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                Connect with students specifically looking for IIT-JEE and NEET coaching. No wasted impressions.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 hover:border-blue-900/10 hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all transform group-hover:-rotate-6">
                                <Award size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Verified Status</h3>
                            <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                Build trust with a verified badge and featured listing that stands out from the competition.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 hover:border-blue-900/10 hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Lead Generation</h3>
                            <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                Receive direct inquiries and contact details of interested students and parents in real-time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Pricing;
