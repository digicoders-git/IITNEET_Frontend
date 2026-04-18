import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Clock, IndianRupee, FileText, Camera, Eye, EyeOff, Phone, Plus, X, Save, User } from 'lucide-react';

const TutorProfile = () => {
    const { user } = useAuth();
    const fileRef = useRef();
    const [form, setForm] = useState({
        bio: '', subjects: [], experience: '', fees: '', location: '', phone: '', showPhone: true
    });
    const [subjectInput, setSubjectInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const fetchProfile = () => {
        axios.get('$env:VITE_API_URL/api/profiles/me', {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => {
            const { profile, user: u } = res.data;
            setForm({
                bio: profile?.bio || '',
                subjects: profile?.subjects || [],
                experience: profile?.experience || '',
                fees: profile?.fees || '',
                location: profile?.location || '',
                phone: u?.phone || '',
                showPhone: u?.showPhone ?? true,
            });
            if (profile?.profileImage) setPhotoUrl(`$env:VITE_API_URL${profile.profileImage}`);
        }).catch(() => {}).finally(() => setLoading(false));
    };

    useEffect(() => { fetchProfile(); }, [user]);

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append('photo', file);
        try {
            const res = await axios.post('$env:VITE_API_URL/api/profiles/upload-photo', data, {
                headers: { Authorization: `Bearer ${user?.token}`, 'Content-Type': 'multipart/form-data' }
            });
            setPhotoUrl(`$env:VITE_API_URL${res.data.imageUrl}`);
            setMsg('Photo uploaded!');
        } catch {
            setMsg('Photo upload failed');
        } finally {
            setUploading(false);
        }
    };

    const addSubject = () => {
        const s = subjectInput.trim();
        if (s && !form.subjects.includes(s)) setForm(f => ({ ...f, subjects: [...f.subjects, s] }));
        setSubjectInput('');
    };

    const removeSubject = (s) => setForm(f => ({ ...f, subjects: f.subjects.filter(x => x !== s) }));

    const handleSave = async () => {
        setSaving(true);
        setMsg('');
        try {
            await axios.put('$env:VITE_API_URL/api/profiles/me', form, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setMsg('Profile saved successfully!');
            fetchProfile();
        } catch (err) {
            setMsg(err.response?.data?.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Edit Profile</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage your public listing details</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="btn btn-primary px-8 gap-2">
                    <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {msg && (
                <div className={`p-4 rounded-xl text-sm font-semibold ${msg.includes('success') || msg.includes('uploaded') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {msg}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                    {/* Photo Upload */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                        <div className="relative mb-4">
                            {photoUrl ? (
                                <img src={photoUrl} alt="Profile" className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl" />
                            ) : (
                                <div className="w-28 h-28 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-4xl border-4 border-white shadow-xl">
                                    {user?.name?.charAt(0)}
                                </div>
                            )}
                            <button
                                onClick={() => fileRef.current.click()}
                                disabled={uploading}
                                className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl shadow-lg transition-all"
                            >
                                {uploading ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Camera size={14} />}
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        </div>
                        <p className="font-bold text-slate-800">{user?.name}</p>
                        <p className="text-xs text-slate-400 capitalize mt-1">{user?.role}</p>
                        <p className="text-xs text-slate-400 mt-2">Max 2MB · JPG, PNG</p>
                    </div>

                    {/* Phone Visibility */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Phone size={16} className="text-indigo-600" /> Contact
                        </h4>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Phone Number</label>
                                <input className="input-field" placeholder="+91 98765 43210"
                                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                            </div>
                            <button type="button"
                                onClick={() => setForm(f => ({ ...f, showPhone: !f.showPhone }))}
                                className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${form.showPhone ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="flex items-center gap-2.5">
                                    {form.showPhone ? <Eye size={16} className="text-emerald-600" /> : <EyeOff size={16} className="text-slate-400" />}
                                    <div className="text-left">
                                        <p className={`text-sm font-bold ${form.showPhone ? 'text-emerald-700' : 'text-slate-600'}`}>
                                            {form.showPhone ? 'Visible to all' : 'Hidden (₹200 unlock)'}
                                        </p>
                                    </div>
                                </div>
                                <div className={`w-9 h-5 rounded-full transition-all relative ${form.showPhone ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                    <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${form.showPhone ? 'left-4.5' : 'left-0.5'}`}></div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="md:col-span-2">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                        {/* Bio */}
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Professional Bio</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-4 text-slate-400" size={15} />
                                <textarea className="input-field pl-11 h-28 resize-none pt-3 overflow-hidden"
                                    placeholder="Tell students about your teaching style..."
                                    value={form.bio} onChange={e => {
                                        setForm(f => ({ ...f, bio: e.target.value }));
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }} />
                            </div>
                        </div>

                        {/* Subjects */}
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                                Subjects <span className="text-slate-400 font-normal">({form.subjects.length} added)</span>
                            </label>
                            {form.subjects.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    {form.subjects.map(s => (
                                        <span key={s} className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                            {s}
                                            <button onClick={() => removeSubject(s)} className="hover:text-red-300 transition-colors">
                                                <X size={11} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input className="input-field flex-1" placeholder="Type subject and press Enter or +"
                                    value={subjectInput}
                                    onChange={e => setSubjectInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSubject())} />
                                <button onClick={addSubject} className="btn btn-primary px-4">
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Experience (Years)</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                    <input type="number" className="input-field pl-11" placeholder="e.g. 5"
                                        value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Monthly Fees (₹)</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                    <input type="number" className="input-field pl-11" placeholder="e.g. 1500"
                                        value={form.fees} onChange={e => setForm(f => ({ ...f, fees: e.target.value }))} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                <input className="input-field pl-11" placeholder="e.g. Kota, Rajasthan"
                                    value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorProfile;

