import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-blue-900 px-8 py-10">
                            <h1 className="text-3xl font-bold text-white">Terms and Conditions</h1>
                            <p className="mt-2 text-blue-200">Please read these terms carefully before using our services.</p>
                        </div>
                        <div className="px-8 py-12 prose prose-lg max-w-none text-slate-600 leading-relaxed">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using iitneet.com, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using the website.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Use of Platform</h2>
                            <p>
                                Our platform serves as a directory and advertising space for tutors and coaching institutes. We do not guarantee the quality or accuracy of the information provided by third-party users.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. User Responsibility</h2>
                            <p>
                                Students and parents are advised to perform their own due diligence before hiring a tutor or enrolling in an institute. IITNEET.com is not liable for any disputes or issues arising between students and tutors/institutes.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Respect and Conduct</h2>
                            <p>
                                Users must maintain a respectful attitude while communicating through the platform. Any form of harassment or misconduct will lead to immediate account termination.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Intellectual Property</h2>
                            <p>
                                All content on this website, including logos, text, and design, is the property of IITNEET.com and may not be reproduced without prior permission.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
