import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FAQ = () => {
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
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
                        <p className="text-lg text-slate-600">Find answers to common questions about our platform.</p>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-blue-900 mb-2">{faq.q}</h3>
                                <p className="text-slate-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
