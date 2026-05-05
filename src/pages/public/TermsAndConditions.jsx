import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">

                        {/* Header */}
                        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 px-8 py-14 text-center">
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">Terms and Conditions</h1>
                            <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">
                                Before entering to our services, please read the terms and conditions of IITNEET to avoid any confusion at later stages. Before registering with us, you are advised to read these terms and conditions carefully.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="px-8 md:px-12 py-12 space-y-10 text-slate-600 leading-relaxed">

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">1</span>
                                    Registration Requirement
                                </h2>
                                <p>
                                    To avail any service or services from our website <strong className="text-slate-800">iitneet.com</strong>, you are required to register with us, except if you are interested to see contact numbers of those tutors which are visible for everyone.
                                </p>
                            </section>

                            <section className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                                    <span className="bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">2</span>
                                    User Activity & Content Policy
                                </h2>
                                <p className="text-red-700 font-medium">
                                    Any activity done by the users over this site is subject to approval from the administrator side.
                                </p>
                                <p className="mt-4 text-red-700">
                                    <strong>Every user of this website is strictly advised that do not try to create any fake profile or any illegal content including any type of porn images or videos</strong>, which will lead to cancellation of membership without any notice.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">3</span>
                                    Tutors & Advertisers — Service Terms
                                </h2>
                                <p>
                                    Tutors and advertisers may enjoy our services unless they follow our terms and conditions. Tutors and advertisers have to pay an amount in order to use the services provided by this website.
                                </p>
                                <p className="mt-4">
                                    However, if they do not follow our terms and conditions, then they will be liable for his/her activities, <strong className="text-slate-800">which will lead to cancellation of membership without any notice</strong>.
                                </p>
                            </section>

                            <section className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                                <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                                    <span className="bg-amber-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">4</span>
                                    Student & Parent Responsibility
                                </h2>
                                <p className="text-amber-900">
                                    Students and parents are advised that whenever they call any tutor for a demo class and thereafter, if they agree for a settlement with the tutor, then it is their responsibility that they check everything about the tutor, like:
                                </p>
                                <ul className="mt-4 space-y-2 text-amber-900 list-disc list-inside">
                                    <li>His/her identity proof</li>
                                    <li>Body language</li>
                                    <li>Attitude</li>
                                    <li>Show of any bad behaviour</li>
                                </ul>
                                <p className="mt-4 text-amber-900 font-semibold">
                                    Our website will not be liable for any type of misconduct by tutor.
                                </p>
                            </section>

                            <section className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <span className="bg-slate-700 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">5</span>
                                    Disclaimer & Limitation of Liability
                                </h2>
                                <p className="text-slate-700 font-medium">
                                    Content and services of this site are provided "as is" without warranty or condition of any kind.
                                </p>
                                <p className="mt-4 text-slate-700">
                                    <strong>IITNEET.com shall not be liable for any direct, indirect, special, punitive, consequential damages whatsoever</strong>, including, but not limited to, damages for loss of profits, goodwill, use data, or other intangible losses resulting from the use or the inability to use our services.
                                </p>
                                <p className="mt-4 text-slate-700 font-semibold">
                                    Any matter subject to the court of law will have exclusive jurisdiction of the court.
                                </p>
                            </section>

                            <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                                    <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">6</span>
                                    Contact Us
                                </h2>
                                <p className="text-blue-800">
                                    If you have any questions about our Terms and Conditions, please contact us at{' '}
                                    <a href="mailto:support@iitneet.com" className="font-semibold underline hover:text-blue-600">
                                        support@iitneet.com
                                    </a>.
                                </p>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
