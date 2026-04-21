import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle2, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/contact-form`, form);
            setSuccess(true);
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-blue-900 pt-20 border-b-4 border-amber-500">
                <div className="page-container py-12 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Help & Contact Us</h1>
                    <p className="text-blue-300">Have a question? We're here to help you.</p>
                </div>
            </div>

            <div className="page-container py-12 max-w-5xl">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Info Cards */}
                    <div className="space-y-4">
                        <div className="bg-white border-2 border-gray-200 p-6 hover:border-amber-500 transition-all">
                            <Mail size={22} className="text-blue-900 mb-3" />
                            <h4 className="font-bold text-blue-900 mb-1">Email Us</h4>
                            <p className="text-gray-500 text-sm">support@iitneet.com</p>
                        </div>
                        <div className="bg-white border-2 border-gray-200 p-6 hover:border-amber-500 transition-all">
                            <Phone size={22} className="text-blue-900 mb-3" />
                            <h4 className="font-bold text-blue-900 mb-1">Call Us</h4>
                            <p className="text-gray-500 text-sm">+91 98765 43210</p>
                        </div>
                        <div className="bg-white border-2 border-gray-200 p-6 hover:border-amber-500 transition-all">
                            <Clock size={22} className="text-blue-900 mb-3" />
                            <h4 className="font-bold text-blue-900 mb-1">Working Hours</h4>
                            <p className="text-gray-500 text-sm">Mon–Sat, 9AM – 6PM</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-2">
                        <div className="bg-white border-2 border-gray-200 p-8">
                            {success ? (
                                <div className="text-center py-12">
                                    <CheckCircle2 size={48} className="text-amber-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                                    <button onClick={() => setSuccess(false)} className="btn btn-secondary px-8">Send Another</button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-bold text-blue-900 text-xl mb-6">Send a Message</h3>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Full Name</label>
                                                <input className="input-field" placeholder="Your name"
                                                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Email</label>
                                                <input type="email" className="input-field" placeholder="you@email.com"
                                                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Phone (optional)</label>
                                                <input className="input-field" placeholder="+91 98765 43210"
                                                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Subject</label>
                                                <input className="input-field" placeholder="How can we help?"
                                                    value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold text-blue-900 mb-1.5 block">Message</label>
                                            <textarea className="input-field h-32 resize-none" placeholder="Write your message..."
                                                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                                        </div>
                                        {error && <p className="text-red-600 text-sm font-semibold bg-red-50 border border-red-200 p-3">{error}</p>}
                                        <button type="submit" disabled={loading}
                                            className="btn btn-secondary w-full py-4 gap-2">
                                            <Send size={16} /> {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactPage;




