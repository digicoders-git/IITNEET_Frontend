import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Mail, Lock, ChevronRight, BookOpen, GraduationCap, Building2, Users } from 'lucide-react';

const ROLES = [
    { value: 'student', label: 'Student', desc: 'Find tutors & institutes', icon: Users, color: 'border-indigo-200 bg-indigo-50 text-indigo-700' },
    { value: 'tutor', label: 'Tutor', desc: 'Offer your expertise', icon: GraduationCap, color: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
    { value: 'coaching', label: 'Coaching Institute', desc: 'List your institute', icon: Building2, color: 'border-violet-200 bg-violet-50 text-violet-700' },
];

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
            login(res.data);
            const role = res.data.role;
            if (role === 'admin') navigate('/admin');
            else if (role === 'tutor') navigate('/tutor');
            else if (role === 'coaching') navigate('/coaching');
            else navigate('/student');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="min-h-screen flex pt-16">
                {/* Left Panel */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 to-violet-900 flex-col justify-center px-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="bg-indigo-600 p-2.5 rounded-xl text-white"><BookOpen size={24} /></div>
                            <span className="text-2xl font-black text-white">IIT-NEET</span>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                            Join India's Best<br />Education Platform
                        </h2>
                        <p className="text-indigo-300 text-lg mb-12 leading-relaxed">
                            Whether you're a student, tutor, or coaching institute — we have the right tools for you.
                        </p>
                        <div className="space-y-4">
                            {ROLES.map(role => (
                                <div key={role.value} className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 border border-white/10">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                        <role.icon size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-black text-white">{role.label}</p>
                                        <p className="text-indigo-300 text-sm">{role.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 mb-2">Create Account</h1>
                            <p className="text-slate-500">Join thousands of students and educators</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Role Selector */}
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-2 block">I am a...</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {ROLES.map(role => (
                                        <button key={role.value} type="button"
                                            onClick={() => setFormData(f => ({ ...f, role: role.value }))}
                                            className={`p-3 rounded-xl border-2 text-center transition-all ${formData.role === role.value ? role.color + ' border-current' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}>
                                            <role.icon size={20} className="mx-auto mb-1" />
                                            <p className="text-xs font-black">{role.label}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Full Name</label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input name="name" placeholder="Your full name"
                                        className="input-field pl-11"
                                        value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} required />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Email Address</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input name="email" type="email" placeholder="you@example.com"
                                        className="input-field pl-11"
                                        value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} required />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input name="password" type="password" placeholder="Min. 6 characters"
                                        className="input-field pl-11"
                                        value={formData.password} onChange={e => setFormData(f => ({ ...f, password: e.target.value }))} required />
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                                {loading ? 'Creating Account...' : 'Create Account'}
                                {!loading && <ChevronRight size={18} />}
                            </button>
                        </form>

                        <p className="text-center text-slate-500 text-sm mt-6">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;




