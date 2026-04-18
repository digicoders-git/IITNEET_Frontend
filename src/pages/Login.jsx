import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Lock, ChevronRight, BookOpen, GraduationCap, Shield, Star } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
            login(res.data);
            const role = res.data.role;
            if (role === 'admin') navigate('/admin');
            else if (role === 'tutor') navigate('/tutor');
            else if (role === 'coaching') navigate('/coaching');
            else if (role === 'student') navigate('/student');
            else navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="min-h-screen flex pt-16">
                {/* Left Panel */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-indigo-900 flex-col justify-center px-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="bg-indigo-600 p-2.5 rounded-xl text-white"><BookOpen size={24} /></div>
                            <span className="text-2xl font-black text-white">IIT-NEET</span>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                            Welcome Back to<br />Your Learning Hub
                        </h2>
                        <p className="text-blue-300 text-lg mb-12 leading-relaxed">
                            Access your dashboard, connect with tutors, and continue your preparation journey.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: GraduationCap, text: '500+ verified expert tutors' },
                                { icon: Star, text: 'Top-rated coaching institutes' },
                                { icon: Shield, text: 'Safe & secure platform' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-blue-200">
                                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                                        <item.icon size={16} />
                                    </div>
                                    <span className="font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 mb-2">Sign In</h1>
                            <p className="text-slate-500">Enter your credentials to access your account</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-semibold flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Email Address</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="email" placeholder="you@example.com"
                                        className="input-field pl-11"
                                        value={email} onChange={e => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="password" placeholder="••••••••"
                                        className="input-field pl-11"
                                        value={password} onChange={e => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 mt-2">
                                {loading ? 'Signing in...' : 'Sign In'}
                                {!loading && <ChevronRight size={18} />}
                            </button>
                        </form>

                        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Demo Accounts</p>
                            <div className="space-y-1 text-xs text-slate-500">
                                <p><span className="font-bold text-slate-700">Admin:</span> admin@iitneet.com / admin123</p>
                                <p><span className="font-bold text-slate-700">Tutor:</span> rajesh@iitneet.com / tutor123</p>
                                <p><span className="font-bold text-slate-700">Student:</span> aryan@student.com / student123</p>
                            </div>
                        </div>

                        <p className="text-center text-slate-500 text-sm mt-6">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;




