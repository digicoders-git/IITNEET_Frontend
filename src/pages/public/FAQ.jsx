import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FAQ = () => {
    const faqs = [
        {
            q: "How can I find a tutor?",
            a: "You can find a tutor by navigating to the 'Tutors' page and using the search filters to search by subject, city, and class level. You can also search directly from the home page using the search bar."
        },
        {
            q: "Is it free for students?",
            a: "Yes, students can search and browse verified tutor profiles on iitneet.com for free. To unlock a tutor's contact number, a one-time fee of \u20b9200 (for 2 contacts) is charged."
        },
        {
            q: "How do I register as a tutor?",
            a: "Click on the 'Become a Tutor' button in the navbar, fill out the registration form with your details, and submit. Your profile will go under admin review before it is published for students to find."
        },
        {
            q: "What is the benefit of a paid subscription for tutors?",
            a: "A paid subscription gives tutors higher visibility in search results, a verified badge, and a highlighted profile listing. Only tutors with an active subscription appear in student searches."
        },
        {
            q: "How does the tutor photo change work?",
            a: "Tutors can upload a new profile photo from their profile dashboard. The new photo is sent for admin review first and will only appear publicly after it is approved by an administrator. Until then, the previous approved photo remains visible to students."
        },
        {
            q: "Can I save or download a tutor's profile photo?",
            a: "No. Profile photos on iitneet.com are protected and cannot be right-clicked, saved, or downloaded. This is to protect the privacy and intellectual property of our registered tutors."
        },
        {
            q: "How do I list my coaching institute?",
            a: "Register an account as a coaching institute, fill in your institute details in the dashboard, and your institute will be listed in the 'Coaching Institute' section. An active subscription is recommended for maximum visibility."
        },
        {
            q: "How do I unlock a tutor's contact number?",
            a: "Purchase a student contact plan (\u20b9200 for 2 contacts) from your Student Dashboard under 'Buy Contacts'. Once purchased, you can unlock any tutor's phone number by visiting their profile and clicking 'Unlock Now'. Contacts never expire."
        },
        {
            q: "How long does admin approval take for a new profile or photo?",
            a: "Admin review is typically completed within 24\u201348 hours. You will be notified once your profile or photo has been approved. In the meantime, your previous approved content remains visible."
        },
        {
            q: "Can I change my registered name or email?",
            a: "Email cannot be changed once registered. Tutor names, once set and approved, also cannot be changed to protect platform integrity. For any corrections, please contact our support team."
        },
        {
            q: "How do I change my mobile number as a tutor?",
            a: "Mobile number changes for tutors require OTP verification via your registered email. Go to your Tutor Profile page, enter the new number, and click 'Verify via OTP'. An OTP will be sent to your email which must be entered to confirm the change."
        },
        {
            q: "Is my personal information safe?",
            a: "Yes, we take data privacy seriously. Your contact details are only shared according to your visibility settings. Mobile numbers are only revealed to students who have paid to unlock them, unless you set your visibility to 'For all users'."
        },
        {
            q: "What payment methods are accepted?",
            a: "We accept all major payment methods through Razorpay including UPI, credit/debit cards, net banking, and wallets. All transactions are 100% secure and encrypted."
        },
        {
            q: "How do I get a refund?",
            a: "Please refer to our Refund Policy page for detailed information on refund eligibility and the process. You can also reach out to our support team via the Contact page for assistance."
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
