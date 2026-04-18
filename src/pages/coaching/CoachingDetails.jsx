import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Building2, MapPin, GraduationCap, Plus, Save, FileText, Users, X } from 'lucide-react';

const CoachingDetails = () => {
    const { user } = useAuth();
    const [form, setForm] = useState({
        bio: '', location: '', courses: [], facultyDetails: '', phone: ''
    });
    const [courseInput, setCourseInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        axios.get('$env:VITE_API_URL/api/profiles/me', {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => {
            const { profile, user: u } = res.data;
            setForm({
                bio: profile?.bio || '',
                location: profile?.location || '',
                courses: profile?.courses || [],
                facultyDetails: profile?.facultyDetails || '',
                phone: u?.phone || '',
            });
        }).catch(() => {}).finally(() => setLoading(false));
    }, [user]);

    const addCourse = () => {
        const c = courseInput.trim();
        if (c && !form.courses.includes(c)) setForm(f => ({ ...f, courses: [...f.courses, c] }));
        setCourseInput('');
    };

    const removeCourse = (c) => setForm(f => ({ ...f, courses: f.courses.filter(x => x !== c) }));

    const handleSave = async () => {
        setSaving(true);
        setMsg('');
        try {
            await axios.put('$env:VITE_API_URL/api/profiles/me', form, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setMsg('Listing saved successfully!');
        } catch (err) {
            setMsg(err.response?.data?.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Coaching Profile</h2>
                    <p className="text-slate-500 font-medium text-sm mt-1">Update institute information and course listings</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="btn btn-primary px-8 gap-2 shadow-xl shadow-violet-200">
                    <Save size={16} /> {saving ? 'Saving...' : 'Save Listing'}
                </button>
            </div>

            {msg && (
                <div className={`p-4 rounded-2xl text-sm font-semibold ${msg.includes('success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {msg}
                </div>
            )}

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                {/* Basic Info */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Building2 size={18} className="text-violet-600" /> Basic Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input className="input-field pl-11" placeholder="Sector 12, Kota"
                                    value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Contact Phone</label>
                            <input className="input-field" placeholder="+91 98765 43210"
                                value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="border-t border-slate-100 pt-6">
                    <label className="text-sm font-bold text-slate-700 mb-1.5 block flex items-center gap-2">
                        <FileText size={15} className="text-violet-600" /> About Institute
                    </label>
                    <textarea className="input-field h-28 resize-none"
                        placeholder="Describe your institute, achievements, facilities..."
                        value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
                </div>

                {/* Courses */}
                <div className="border-t border-slate-100 pt-6">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <GraduationCap size={18} className="text-blue-600" /> Courses Offered
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {form.courses.map(c => (
                            <span key={c} className="bg-blue-50 text-blue-700 text-sm font-bold px-3 py-1.5 rounded-xl flex items-center gap-2">
                                {c}
                                <button onClick={() => removeCourse(c)} className="text-blue-400 hover:text-red-500">
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input className="input-field flex-1" placeholder="e.g. JEE Mains, NEET Crash Course"
                            value={courseInput} onChange={e => setCourseInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCourse())} />
                        <button onClick={addCourse} className="btn btn-outline px-4"><Plus size={18} /></button>
                    </div>
                </div>

                {/* Faculty */}
                <div className="border-t border-slate-100 pt-6">
                    <label className="text-sm font-bold text-slate-700 mb-1.5 block flex items-center gap-2">
                        <Users size={15} className="text-violet-600" /> Faculty Details
                    </label>
                    <textarea className="input-field h-24 resize-none"
                        placeholder="e.g. Dr. Sharma (IIT Delhi), 15 yrs exp in Physics..."
                        value={form.facultyDetails} onChange={e => setForm(f => ({ ...f, facultyDetails: e.target.value }))} />
                </div>
            </div>
        </div>
    );
};

export default CoachingDetails;

