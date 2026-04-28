import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronRight, GraduationCap, Building2, Users } from 'lucide-react';

const ROLES = [
    { value: 'student', label: 'Student', desc: 'Find tutors & institutes', icon: Users },
    { value: 'tutor', label: 'Tutor', desc: 'Offer your expertise', icon: GraduationCap },
    { value: 'coaching', label: 'Coaching Institute', desc: 'List your institute', icon: Building2 },
];

const Register = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: searchParams.get('role') || 'student' });
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
            if (role === 'tutor') navigate('/tutor');
            else if (role === 'coaching') navigate('/coaching');
            else navigate('/student');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
                            <h1 className="text-3xl font-bold text-blue-900 mb-2">Create Account</h1>
                            <p className="text-gray-500">Join thousands of students and educators</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-600 text-sm font-semibold">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Role Selector */}
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-2 block">I am a...</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {ROLES.map(role => (
                                        <button key={role.value} type="button"
                                            onClick={() => setFormData(f => ({ ...f, role: role.value }))}
                                            className={`p-3 border-2 text-center transition-all ${formData.role === role.value ? 'border-blue-900 bg-blue-900 text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-blue-900'}`}>
                                            <role.icon size={20} className="mx-auto mb-1" />
                                            <p className="text-xs font-bold">{role.label}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Full Name</label>
                                <input name="name" placeholder="Your full name"
                                    className="input-field"
                                    value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} required />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Email Address</label>
                                <input name="email" type="email" placeholder="you@example.com"
                                    className="input-field"
                                    value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} required />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-1.5 block">Password</label>
                                <input name="password" type="password" placeholder="Min. 6 characters"
                                    className="input-field"
                                    value={formData.password} onChange={e => setFormData(f => ({ ...f, password: e.target.value }))} required />
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full btn btn-secondary py-4 flex items-center justify-center gap-2">
                                {loading ? 'Creating Account...' : 'Create Account'}
                                {!loading && <ChevronRight size={18} />}
                            </button>
                        </form>

                        <p className="text-center text-gray-500 text-sm mt-6">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-900 font-bold hover:text-amber-500">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
