import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { MapPin, GraduationCap, Users, Phone, Mail, ArrowLeft, CheckCircle2, BookOpen } from 'lucide-react';

const CoachingPublicProfile = () => {
    const { userId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`import.meta.env.VITE_API_URL/api/profiles/coaching/${userId}`)
            .then(res => { setData(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [userId]);

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!data) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <p className="text-slate-500 font-medium">Institute not found.</p>
                <Link to="/coachings" className="text-indigo-600 font-bold text-sm mt-2 inline-block">← Back to Institutes</Link>
            </div>
        </div>
    );

    const { user: coaching, profile } = data;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 pt-20">
                <div className="page-container py-10 max-w-5xl">
                    <Link to="/coachings" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-semibold mb-6 transition-colors">
                        <ArrowLeft size={16} /> All Institutes
                    </Link>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(coaching.name)}&size=100&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                            alt={coaching.name}
                            className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-xl"
                        />
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-2xl font-black text-white">{coaching.name}</h1>
                                {coaching.subscriptionStatus === 'active' && (
                                    <span className="bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">⭐ Premium</span>
                                )}
                            </div>
                            {profile?.location && (
                                <div className="flex items-center gap-2 text-blue-300 text-sm">
                                    <MapPin size={14} />{profile.location}
                                </div>
                            )}
                            {profile?.courses?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {profile.courses.slice(0, 4).map(c => (
                                        <span key={c} className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">{c}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-container py-8 max-w-5xl">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* About */}
                        {profile?.bio && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <BookOpen size={18} className="text-indigo-600" /> About Institute
                                </h3>
                                <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
                            </div>
                        )}

                        {/* Courses */}
                        {profile?.courses?.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <GraduationCap size={18} className="text-indigo-600" /> Courses Offered
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {profile.courses.map(c => (
                                        <div key={c} className="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
                                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                            <span className="font-semibold text-slate-700 text-sm">{c}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Faculty */}
                        {profile?.facultyDetails && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-violet-600" /> Faculty Details
                                </h3>
                                <p className="text-slate-600 leading-relaxed">{profile.facultyDetails}</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Sidebar */}
                    <div>
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
                            <h3 className="font-black text-slate-900 mb-5">Contact Institute</h3>
                            <div className="space-y-3">
                                {coaching.phone && (
                                    <a href={`tel:${coaching.phone}`}
                                        className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4 hover:bg-indigo-100 transition-colors group">
                                        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                                            <Phone size={16} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">Phone</p>
                                            <p className="font-black text-slate-800">{coaching.phone}</p>
                                        </div>
                                    </a>
                                )}
                                <a href={`mailto:${coaching.email}`}
                                    className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 hover:bg-blue-100 transition-colors">
                                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                                        <Mail size={16} className="text-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Email</p>
                                        <p className="font-bold text-slate-800 text-sm truncate">{coaching.email}</p>
                                    </div>
                                </a>
                                {profile?.location && (
                                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                                        <div className="w-9 h-9 bg-slate-600 rounded-lg flex items-center justify-center shrink-0">
                                            <MapPin size={16} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Location</p>
                                            <p className="font-bold text-slate-800 text-sm">{profile.location}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-5 border-t border-slate-100">
                                <Link to="/coachings" className="btn btn-outline w-full text-sm justify-center">
                                    ← Browse More Institutes
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CoachingPublicProfile;



