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
            await axios.post('$env:VITE_API_URL/api/payment/contact-form', form);
            setSuccess(true);
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 pt-20">
                <div className="page-container py-12 text-center">
                    <h1 className="text-3xl font-black text-white mb-2">Contact Us</h1>
                    <p className="text-blue-300">Have a question? We're here to help.</p>
                </div>
            </div>

            <div className="page-container py-12 max-w-5xl">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Info Cards */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                <Mail size={20} className="text-indigo-600" />
                            </div>
                            <h4 className="font-black text-slate-900 mb-1">Email Us</h4>
                            <p className="text-slate-500 text-sm">support@iitneet.com</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                                <Phone size={20} className="text-emerald-600" />
                            </div>
                            <h4 className="font-black text-slate-900 mb-1">Call Us</h4>
                            <p className="text-slate-500 text-sm">+91 98765 43210</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                <Clock size={20} className="text-amber-600" />
                            </div>
                            <h4 className="font-black text-slate-900 mb-1">Working Hours</h4>
                            <p className="text-slate-500 text-sm">Mon–Sat, 9AM – 6PM</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                            {success ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 size={32} className="text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">Message Sent!</h3>
                                    <p className="text-slate-500 mb-6">We'll get back to you within 24 hours.</p>
                                    <button onClick={() => setSuccess(false)} className="btn btn-primary px-8">Send Another</button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-black text-slate-900 text-xl mb-6">Send a Message</h3>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Full Name</label>
                                                <div className="relative">
                                                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input className="input-field pl-10" placeholder="Your name"
                                                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Email</label>
                                                <div className="relative">
                                                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input type="email" className="input-field pl-10" placeholder="you@email.com"
                                                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Phone (optional)</label>
                                                <div className="relative">
                                                    <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input className="input-field pl-10" placeholder="+91 98765 43210"
                                                        value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Subject</label>
                                                <input className="input-field" placeholder="How can we help?"
                                                    value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Message</label>
                                            <div className="relative">
                                                <MessageSquare size={15} className="absolute left-4 top-4 text-slate-400" />
                                                <textarea className="input-field pl-10 h-32 resize-none pt-3" placeholder="Write your message..."
                                                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                                            </div>
                                        </div>
                                        {error && <p className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-xl">{error}</p>}
                                        <button type="submit" disabled={loading}
                                            className="btn btn-primary w-full py-4 gap-2 shadow-lg shadow-indigo-200">
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

