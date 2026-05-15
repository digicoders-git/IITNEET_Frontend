import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Building2, MapPin, GraduationCap, Plus, Save, FileText, Users, X, Camera } from 'lucide-react';

const CoachingDetails = () => {
    const { user } = useAuth();
    const fileRef = useRef();
    const [form, setForm] = useState({
        bio: '', location: '', courses: [], facultyDetails: '', phone: '',
        mobileVisibility: 'paid', profileVisibility: 'all'
    });
    const [courseInput, setCourseInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState('');
    const [instituteImage, setInstituteImage] = useState('');
    const [pendingInstituteImage, setPendingInstituteImage] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/me`, {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => {
            const { profile, user: u } = res.data;
            setForm({
                bio: profile?.bio || '',
                location: profile?.location || '',
                courses: profile?.courses || [],
                facultyDetails: profile?.facultyDetails || '',
                phone: u?.phone || '',
                mobileVisibility: profile?.mobileVisibility || 'paid',
                profileVisibility: profile?.profileVisibility || 'all',
            });
            if (profile?.instituteImage) {
                setInstituteImage(`${import.meta.env.VITE_API_URL}${profile.instituteImage}`);
            }
            if (profile?.pendingInstituteImage) {
                setPendingInstituteImage(`${import.meta.env.VITE_API_URL}${profile.pendingInstituteImage}`);
            }
        }).catch(() => {}).finally(() => setLoading(false));
    }, [user]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 10 * 1024 * 1024) {
            setMsg('Image too large. Maximum size is 10MB');
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            setMsg('Please select an image file');
            return;
        }
        
        setUploading(true);
        setMsg('');
        
        const data = new FormData();
        data.append('instituteImage', file);
        
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/profiles/upload-institute-image`,
                data,
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            setPendingInstituteImage(`${import.meta.env.VITE_API_URL}${res.data.imageUrl}`);
            setMsg('Institute image uploaded successfully and is waiting for admin approval!');
        } catch (err) {
            setMsg(err.response?.data?.message || 'Image upload failed');
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    const addCourse = () => {
        const c = courseInput.trim();
        const currentCourses = Array.isArray(form.courses) ? form.courses : [];
        if (c && !currentCourses.includes(c)) setForm(f => ({ ...f, courses: [...currentCourses, c] }));
        setCourseInput('');
    };

    const removeCourse = (c) => setForm(f => ({ ...f, courses: f.courses.filter(x => x !== c) }));

    const handleSave = async () => {
        setSaving(true);
        setMsg('');
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/profiles/me`, form, {
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
                <div className={`p-4 rounded-2xl text-sm font-semibold ${String(msg).includes('success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {msg}
                </div>
            )}

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                {/* Institute Image */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Building2 size={18} className="text-violet-600" /> Institute Image
                    </h4>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="relative">
                            <div className="w-48 h-48 border-2 border-slate-200 rounded-2xl bg-slate-50 overflow-hidden">
                                {pendingInstituteImage ? (
                                    <div className="relative w-full h-full">
                                        <img src={pendingInstituteImage} alt="Pending" className="w-full h-full object-cover opacity-60" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="bg-amber-500 text-[10px] font-black text-white px-2 py-1 uppercase tracking-widest shadow-lg">Pending Approval</span>
                                        </div>
                                    </div>
                                ) : instituteImage ? (
                                    <img src={instituteImage} alt="Institute" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Building2 size={48} />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileRef.current.click()}
                                disabled={uploading}
                                className="absolute -bottom-3 -right-3 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-xl shadow-lg transition-all disabled:opacity-50"
                            >
                                {uploading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Camera size={20} />
                                )}
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-600 mb-2">
                                Upload a professional image of your institute building, classroom, or logo.
                            </p>
                            <ul className="text-xs text-slate-500 space-y-1">
                                <li>• Maximum file size: 10MB</li>
                                <li>• Supported formats: JPG, PNG, WEBP</li>
                                <li>• Recommended size: 800x800 pixels</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div>
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Building2 size={18} className="text-violet-600" /> Basic Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-1.5 block">Institute Category</label>
                            <select className="input-field"
                                value={form.courses[0] || ''}
                                onChange={e => {
                                    const val = e.target.value;
                                    setForm(f => ({ ...f, courses: val ? [val, ...f.courses.filter((_, i) => i !== 0)] : f.courses.slice(1) }));
                                }}>
                                <option value="">Select Category</option>
                                <option value="IIT/NEET & Academic">IIT/NEET &amp; Academic</option>
                                <option value="IIT & NEET">IIT &amp; NEET</option>
                                <option value="IIT-JEE">IIT-JEE</option>
                                <option value="NEET">NEET</option>
                                <option value="Academic">Academic (KG-XII)</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
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
                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Verified by OTP</p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-50 grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-3 block">Visibility of Mobile Number</label>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="mobileVis" 
                                        checked={form.mobileVisibility === 'paid'}
                                        onChange={() => setForm(f => ({ ...f, mobileVisibility: 'paid' }))}
                                        className="w-4 h-4 accent-violet-600"
                                    />
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">1) Only to paid users</span>
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="mobileVis" 
                                        checked={form.mobileVisibility === 'all'}
                                        onChange={() => {
                                            if (window.confirm("Warning: Your mobile number will be visible to all users. Are you sure?")) {
                                                setForm(f => ({ ...f, mobileVisibility: 'all' }));
                                            }
                                        }}
                                        className="w-4 h-4 accent-violet-600"
                                    />
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">2) For all users</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-3 block">Profile Visibility (Search Results)</label>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="profileVis" 
                                        checked={form.profileVisibility === 'all'}
                                        onChange={() => setForm(f => ({ ...f, profileVisibility: 'all' }))}
                                        className="w-4 h-4 accent-violet-600"
                                    />
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">1) Visible to all</span>
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="profileVis" 
                                        checked={form.profileVisibility === 'paid'}
                                        onChange={() => setForm(f => ({ ...f, profileVisibility: 'paid' }))}
                                        className="w-4 h-4 accent-violet-600"
                                    />
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">2) Only to paid users</span>
                                </label>
                            </div>
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




