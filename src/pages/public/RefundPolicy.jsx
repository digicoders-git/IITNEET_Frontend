import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">

                        {/* Header */}
                        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 px-8 py-14 text-center">
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">Refund and Payment Policy</h1>
                            <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">
                                Please read the following instructions carefully before making a payment, as it is related to your purchases and rights with regard to refund and cancellation policy.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="px-8 md:px-12 py-12 space-y-10 text-slate-600 leading-relaxed">

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">1</span>
                                    Tutor Registration & Profile Activation
                                </h2>
                                <p>
                                    Any tutor who wants to register and create his/her profile with our website has to pay an amount when his/her registration form gets approved from our side. Tutors will receive an email after approval and will be asked to pay in order to activate his/her profile.
                                </p>
                                <p className="mt-4">
                                    As soon as we receive the payment, his/her profile would be available publicly for appearance over the website. Once his/her profile is activated, it would be valid for a period of <strong className="text-slate-800">one year</strong> from the date of activation.
                                </p>
                                <p className="mt-4">
                                    Tutor may re-activate his/her profile before the date of expiration or within <strong className="text-slate-800">15 days</strong> from the date of expiration. Failing to do so, the tutor's profile will become inactive.
                                </p>
                            </section>

                            <section className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                                    <span className="bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">2</span>
                                    Tutor Profile Deactivation — No Refund
                                </h2>
                                <p className="text-red-700">
                                    Tutors may send a request to deactivate his/her profile before the time of expiration. However, <strong>they will not be eligible for any refund</strong> in such cases.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">3</span>
                                    Student / Parent / Guardian — Contact Access
                                </h2>
                                <p>
                                    Students, parents, and guardians can see a tutor's <strong className="text-slate-800">visible contact number</strong> without being registered with us. However, they cannot access contact numbers that are set as invisible.
                                </p>
                                <p className="mt-4">
                                    If someone is interested in accessing an invisible contact number, <strong className="text-slate-800">registration is compulsory</strong>. After registering, you have to recharge your account, after which you would be able to take <strong className="text-slate-800">two contact numbers</strong> within any time duration.
                                </p>
                                <p className="mt-4 text-red-600 font-medium">
                                    You cannot get back any refund of money once the recharge is done.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">4</span>
                                    Coaching Institute Advertising
                                </h2>
                                <p>
                                    Owners of coaching institutes can advertise with us. As an advertiser, owners have to create an account with us. Thereafter, they may create an advertising page and after approval they have to make a payment.
                                </p>
                                <p className="mt-4">
                                    As soon as we receive the payment, the advertisement would be available publicly for <strong className="text-slate-800">one year</strong> from the date of activation for appearance over the website.
                                </p>
                                <p className="mt-4">
                                    Owner may re-activate the advertising page before the date of expiration or within <strong className="text-slate-800">15 days</strong> from the date of expiration. Failing to do so, the advertisement will become inactive.
                                </p>
                                <p className="mt-4 text-red-600 font-medium">
                                    You cannot get back any refund of money once the payment is made.
                                </p>
                            </section>

                            <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                                    <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">5</span>
                                    Contact Us
                                </h2>
                                <p className="text-blue-800">
                                    If you have any questions about our Refund and Payment Policy, please contact us at{' '}
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

export default RefundPolicy;
