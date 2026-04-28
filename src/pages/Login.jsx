import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Lock, ChevronRight } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center px-6 py-20">
                <div className="w-full max-w-md">
                    <div className="bg-white border-2 border-gray-200 p-8">
                        <div className="mb-8 text-center">
                            <img 
                                src="/logo.png" 
                                alt="IIT-NEET.com Logo" 
                                className="h-12 w-auto mx-auto mb-6"
                            />
                            <h1 className="text-3xl font-bold text-blue-900 mb-2">Login to IIT-NEET.com</h1>
                            <p className="text-gray-500">Enter your credentials to access your account</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-600 text-sm font-semibold">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Email Address</label>
                                <input type="email" placeholder="you@example.com"
                                    className="input-field"
                                    value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Password</label>
                                <input type="password" placeholder="••••••••"
                                    className="input-field"
                                    value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full btn btn-secondary py-4 flex items-center justify-center gap-2 mt-2">
                                {loading ? 'Signing in...' : 'Sign In'}
                                {!loading && <ChevronRight size={18} />}
                            </button>
                        </form>

                        <div className="mt-6 p-4 bg-gray-50 border-2 border-gray-200">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Demo Accounts</p>
                            <div className="space-y-1 text-xs text-gray-500">
                                <p><span className="font-bold text-blue-900">Admin:</span> admin@iitneet.com / admin123</p>
                                <p><span className="font-bold text-blue-900">Tutor:</span> rajesh@iitneet.com / tutor123</p>
                                <p><span className="font-bold text-blue-900">Student:</span> aryan@student.com / student123</p>
                            </div>
                        </div>

                        <p className="text-center text-gray-500 text-sm mt-6">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-900 font-bold hover:text-amber-500">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
