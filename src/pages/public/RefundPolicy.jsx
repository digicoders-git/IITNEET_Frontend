import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-blue-900 px-8 py-10">
                            <h1 className="text-3xl font-bold text-white">Refund and Cancellation Policy</h1>
                            <p className="mt-2 text-blue-200">Last updated: May 2026</p>
                        </div>
                        <div className="px-8 py-12 prose prose-lg max-w-none text-slate-600 leading-relaxed">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Subscription Fees</h2>
                            <p>
                                IITNEET.com offers subscription-based services for tutors and coaching institutes. All payments made for subscriptions are final and non-refundable once the service has been activated.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Cancellation Policy</h2>
                            <p>
                                Users can cancel their subscription at any time through their dashboard. Upon cancellation, the service will remain active until the end of the current billing cycle. No partial refunds will be provided for the remaining period.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Exceptional Circumstances</h2>
                            <p>
                                In rare cases of technical errors where a double payment is processed or a service is not delivered despite a successful transaction, users may request a refund within 7 working days. Such requests will be reviewed by our team on a case-by-case basis.
                            </p>

                            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Contact Us</h2>
                            <p>
                                If you have any questions about our Refund and Cancellation Policy, please contact us at support@iitneet.com.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RefundPolicy;
