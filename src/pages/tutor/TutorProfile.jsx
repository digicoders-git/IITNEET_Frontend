import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Save, Camera, MapPin, Phone } from 'lucide-react';

const CLASSES = ['KG','Class I','Class II','Class III','Class IV','Class V','Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII','Class XI & XII - Foundation','IIT-JEE','IIT & NEET','NEET','BSc.','MSc.','BCA','BBA','MBA','NDA','CSAT','Banking','Other'];
const SUBJECTS = ['English Language','Physics','Chemistry','Mathematics','Biology','History','Geography','Accountancy','Psychology','Sociology','Political Science','Economics','Business Studies','Computer Science','Biotechnology','Sangeet','Data Interpretation & Logical Reasoning','Quantitative Aptitude','CSAT','Other'];
const QUALIFICATIONS = ['10th Pass','12th Pass','Diploma','B.A.','B.Sc.','B.Com','B.Tech / B.E.','BCA','BBA','M.A.','M.Sc.','M.Com','M.Tech / M.E.','MCA','MBA','Ph.D.','Other'];
const FEES_OPTIONS = [2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000];
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const SectionBox = ({ title, children }) => (
    <div className="bg-white border-2 border-gray-200 p-6 space-y-4">
        <h3 className="font-bold text-blue-900 text-base border-b-2 border-amber-500 pb-2">{title}</h3>
        {children}
    </div>
);

const Label = ({ children }) => (
    <label className="text-sm font-bold text-blue-900 mb-1.5 block">{children}</label>
);

const Radio = ({ name, checked, onChange, label }) => (
    <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name={name} checked={checked} onChange={onChange}
            className="accent-blue-900 w-4 h-4" />
        <span className="text-sm font-semibold text-gray-700">{label}</span>
    </label>
);

const TutorProfile = () => {
    const { user } = useAuth();
    const fileRef = useRef();
    const [form, setForm] = useState({
        firstName: '', lastName: '',
        age: '', sex: '', qualification: '',
        teachingClass: '', subjectType: 'choose', subjects: [],
        competitiveExpert: false, expertSubject: '',
        fees: '', feesType: '3days',
        availability: 'both',
        schedule: {
            Monday:    { available: true, timing: 'Morning', from: '', to: '' },
            Tuesday:   { available: true, timing: 'Morning', from: '', to: '' },
            Wednesday: { available: true, timing: 'Morning', from: '', to: '' },
            Thursday:  { available: true, timing: 'Morning', from: '', to: '' },
            Friday:    { available: true, timing: 'Morning', from: '', to: '' },
            Saturday:  { available: true, timing: 'Morning', from: '', to: '' },
        },
        hasYoutube: false, youtubeChannel: '',
        location: '', pincode: '', locality: '',
        phone: '', mobileVisibility: 'paid',
        bio: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState({ text: '', ok: true });
    const [photoUrl, setPhotoUrl] = useState('');
    const [wordCount, setWordCount] = useState(0);

    const fetchProfile = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/me`, {
            headers: { Authorization: `Bearer ${user?.token}` }
        }).then(res => {
            const { profile, user: u } = res.data;
            if (profile) {
                const nameParts = (u?.name || '').split(' ');
                setForm(f => ({
                    ...f,
                    firstName: nameParts[0] || '',
                    lastName: nameParts.slice(1).join(' ') || '',
                    age: profile.age || '',
                    sex: profile.sex || '',
                    qualification: profile.qualification || '',
                    teachingClass: profile.teachingClass || '',
                    subjectType: profile.subjectType || 'choose',
                    subjects: profile.subjects || [],
                    competitiveExpert: profile.competitiveExpert || false,
                    expertSubject: profile.expertSubject || '',
                    fees: profile.fees || '',
                    feesType: profile.feesType || '3days',
                    availability: profile.availability || 'both',
                    schedule: profile.schedule || f.schedule,
                    hasYoutube: !!profile.youtubeChannel,
                    youtubeChannel: profile.youtubeChannel || '',
                    location: profile.location || '',
                    pincode: profile.pincode || '',
                    locality: profile.locality || '',
                    phone: u?.phone || '',
                    mobileVisibility: profile.mobileVisibility || 'paid',
                    bio: profile.bio || '',
                }));
                const bio = profile.bio || '';
                setWordCount(bio.trim() === '' ? 0 : bio.trim().split(/\s+/).length);
                if (profile.profileImage) setPhotoUrl(`${import.meta.env.VITE_API_URL}${profile.profileImage}`);
            }
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
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/profiles/upload-photo`, data, {
                headers: { Authorization: `Bearer ${user?.token}`, 'Content-Type': 'multipart/form-data' }
            });
            setPhotoUrl(`${import.meta.env.VITE_API_URL}${res.data.imageUrl}`);
            setMsg({ text: 'Photo uploaded successfully!', ok: true });
        } catch { setMsg({ text: 'Photo upload failed', ok: false }); }
        finally { setUploading(false); }
    };

    const toggleSubject = (s) => {
        setForm(f => ({
            ...f,
            subjects: f.subjects.includes(s) ? f.subjects.filter(x => x !== s) : [...f.subjects, s]
        }));
    };

    const updateSchedule = (day, field, value) => {
        setForm(f => ({ ...f, schedule: { ...f.schedule, [day]: { ...f.schedule[day], [field]: value } } }));
    };

    const handleBioChange = (e) => {
        const text = e.target.value;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        if (words <= 300) { setForm(f => ({ ...f, bio: text })); setWordCount(words); }
    };

    const handleSave = async () => {
        setSaving(true); setMsg({ text: '', ok: true });
        try {
            const payload = { ...form, name: `${form.firstName} ${form.lastName}`.trim() };
            await axios.put(`${import.meta.env.VITE_API_URL}/api/profiles/me`, payload, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setMsg({ text: 'Profile saved successfully!', ok: true });
            fetchProfile();
        } catch (err) {
            setMsg({ text: err.response?.data?.message || 'Save failed', ok: false });
        } finally { setSaving(false); }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-5">

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-blue-900">Tutor Registration Form</h2>
                    <p className="text-gray-500 text-sm mt-1">Fill all details to appear in tutor listings</p>
                </div>
                <button onClick={handleSave} disabled={saving}
                    className="btn btn-secondary px-8 gap-2 flex items-center">
                    <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {msg.text && (
                <div className={`p-4 text-sm font-semibold border-2 ${msg.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                    {msg.text}
                </div>
            )}

            {/* ── 1. BASIC INFO ── */}
            <SectionBox title="1. Basic Information">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Photo Upload */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                        <Label>Photo</Label>
                        <div className="relative">
                            <div className="w-28 h-28 border-2 border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden">
                                {photoUrl ? (
                                    <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-bold text-blue-900">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <button onClick={() => fileRef.current.click()} disabled={uploading}
                                className="absolute -bottom-2 -right-2 bg-amber-500 hover:bg-amber-600 text-white p-2 transition-all">
                                {uploading
                                    ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    : <Camera size={14} />}
                            </button>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        </div>
                        <p className="text-xs text-gray-400 text-center">Max 2MB · JPG/PNG</p>
                    </div>

                    {/* Name + Basic */}
                    <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>First Name</Label>
                                <input className="input-field" placeholder="First Name"
                                    value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <input className="input-field" placeholder="Last Name"
                                    value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label>Age</Label>
                                <input type="number" className="input-field" placeholder="Age" min="18" max="80"
                                    value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
                            </div>
                            <div>
                                <Label>Sex</Label>
                                <select className="input-field" value={form.sex} onChange={e => setForm(f => ({ ...f, sex: e.target.value }))}>
                                    <option value="">Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <Label>Maximum Qualification</Label>
                                <select className="input-field" value={form.qualification} onChange={e => setForm(f => ({ ...f, qualification: e.target.value }))}>
                                    <option value="">Select</option>
                                    {QUALIFICATIONS.map(q => <option key={q}>{q}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionBox>

            {/* ── 2. TEACHING CLASS ── */}
            <SectionBox title="2. Teaching Class / Standard / Level">
                <select className="input-field" value={form.teachingClass} onChange={e => setForm(f => ({ ...f, teachingClass: e.target.value }))}>
                    <option value="">Select Class / Standard / Level</option>
                    {CLASSES.map(c => <option key={c}>{c}</option>)}
                </select>
            </SectionBox>

            {/* ── 3. TEACHING SUBJECTS ── */}
            <SectionBox title="3. Teaching Subjects">
                <div className="flex gap-6 mb-3">
                    <Radio name="subjectType" checked={form.subjectType === 'all'}
                        onChange={() => setForm(f => ({ ...f, subjectType: 'all', subjects: [] }))}
                        label="1) All Subjects" />
                    <Radio name="subjectType" checked={form.subjectType === 'choose'}
                        onChange={() => setForm(f => ({ ...f, subjectType: 'choose' }))}
                        label="2) Let me choose" />
                </div>
                {form.subjectType === 'choose' && (
                    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-2 border-gray-200">
                        {SUBJECTS.map(s => (
                            <button key={s} type="button" onClick={() => toggleSubject(s)}
                                className={`text-xs font-bold px-3 py-1.5 border-2 transition-all ${form.subjects.includes(s) ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-900'}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                )}
                {form.subjectType === 'choose' && form.subjects.length > 0 && (
                    <p className="text-xs text-blue-900 font-semibold">Selected: {form.subjects.join(', ')}</p>
                )}
            </SectionBox>

            {/* ── 4. COMPETITIVE EXPERT ── */}
            <SectionBox title="4. Competitive Exam Expert">
                <div>
                    <Label>Are you an expert teacher for competitive exams?</Label>
                    <div className="flex gap-6">
                        <Radio name="compExpert" checked={form.competitiveExpert === true}
                            onChange={() => setForm(f => ({ ...f, competitiveExpert: true }))} label="Yes" />
                        <Radio name="compExpert" checked={form.competitiveExpert === false}
                            onChange={() => setForm(f => ({ ...f, competitiveExpert: false, expertSubject: '' }))} label="No" />
                    </div>
                </div>
                {form.competitiveExpert && (
                    <div>
                        <Label>In which subject are you an expert teacher?</Label>
                        <select className="input-field" value={form.expertSubject} onChange={e => setForm(f => ({ ...f, expertSubject: e.target.value }))}>
                            <option value="">Select Subject</option>
                            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                )}
            </SectionBox>

            {/* ── 5. MONTHLY FEES ── */}
            <SectionBox title="5. Monthly Fees">
                <div>
                    <Label>Fee Schedule</Label>
                    <div className="flex gap-6 flex-wrap">
                        {[
                            { v: '3days', l: '1) 3 days in a week' },
                            { v: '6days', l: '2) 6 days in a week' },
                            { v: 'discuss', l: '3) Will discuss later' },
                        ].map(o => (
                            <Radio key={o.v} name="feesType" checked={form.feesType === o.v}
                                onChange={() => setForm(f => ({ ...f, feesType: o.v }))} label={o.l} />
                        ))}
                    </div>
                </div>
                <div>
                    <Label>Select Monthly Fees Amount</Label>
                    <div className="flex flex-wrap gap-2">
                        {FEES_OPTIONS.map(fee => (
                            <button key={fee} type="button" onClick={() => setForm(f => ({ ...f, fees: fee }))}
                                className={`text-sm font-bold px-4 py-2 border-2 transition-all ${form.fees == fee ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-900'}`}>
                                ₹{fee.toLocaleString()}
                            </button>
                        ))}
                    </div>
                    {form.fees && (
                        <p className="text-sm text-amber-600 font-bold mt-2">
                            Selected: ₹{Number(form.fees).toLocaleString()} / month
                        </p>
                    )}
                </div>
            </SectionBox>

            {/* ── 6. AVAILABILITY ── */}
            <SectionBox title="6. Availability">
                <div>
                    <Label>Mode of Teaching</Label>
                    <div className="flex gap-6 flex-wrap">
                        {[
                            { v: 'offline', l: '1) Only Offline' },
                            { v: 'both',    l: '2) Both Online / Offline' },
                            { v: 'online',  l: '3) Only Online' },
                        ].map(o => (
                            <Radio key={o.v} name="availability" checked={form.availability === o.v}
                                onChange={() => setForm(f => ({ ...f, availability: o.v }))} label={o.l} />
                        ))}
                    </div>
                </div>

                {/* Schedule Table */}
                <div>
                    <Label>Weekly Schedule</Label>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border-2 border-gray-300">
                            <thead>
                                <tr className="bg-blue-900 text-white">
                                    <th className="border border-blue-800 px-4 py-2.5 text-left font-bold">Day</th>
                                    <th className="border border-blue-800 px-4 py-2.5 text-left font-bold">Status</th>
                                    <th className="border border-blue-800 px-4 py-2.5 text-left font-bold">Timing</th>
                                    <th className="border border-blue-800 px-4 py-2.5 text-left font-bold">From</th>
                                    <th className="border border-blue-800 px-4 py-2.5 text-left font-bold">To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DAYS.map((day, i) => (
                                    <tr key={day} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border border-gray-300 px-4 py-2 font-semibold text-blue-900">{day}</td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            <select className="input-field py-1.5 text-sm"
                                                value={form.schedule[day]?.available ? 'available' : 'not'}
                                                onChange={e => updateSchedule(day, 'available', e.target.value === 'available')}>
                                                <option value="available">Available</option>
                                                <option value="not">Not Available</option>
                                            </select>
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            <select className="input-field py-1.5 text-sm"
                                                value={form.schedule[day]?.timing || 'Morning'}
                                                onChange={e => updateSchedule(day, 'timing', e.target.value)}
                                                disabled={!form.schedule[day]?.available}>
                                                <option>Morning</option>
                                                <option>Evening</option>
                                            </select>
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            <input type="time" className="input-field py-1.5 text-sm"
                                                value={form.schedule[day]?.from || ''}
                                                onChange={e => updateSchedule(day, 'from', e.target.value)}
                                                disabled={!form.schedule[day]?.available} />
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            <input type="time" className="input-field py-1.5 text-sm"
                                                value={form.schedule[day]?.to || ''}
                                                onChange={e => updateSchedule(day, 'to', e.target.value)}
                                                disabled={!form.schedule[day]?.available} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SectionBox>

            {/* ── 7. YOUTUBE ── */}
            <SectionBox title="7. Educational YouTube Channel">
                <div>
                    <Label>Do you have any educational YouTube channel?</Label>
                    <div className="flex gap-6">
                        <Radio name="yt" checked={form.hasYoutube === true}
                            onChange={() => setForm(f => ({ ...f, hasYoutube: true }))} label="Yes" />
                        <Radio name="yt" checked={form.hasYoutube === false}
                            onChange={() => setForm(f => ({ ...f, hasYoutube: false, youtubeChannel: '' }))} label="No" />
                    </div>
                </div>
                {form.hasYoutube && (
                    <div>
                        <Label>YouTube Channel URL</Label>
                        <input className="input-field" placeholder="https://youtube.com/@yourchannel"
                            value={form.youtubeChannel}
                            onChange={e => setForm(f => ({ ...f, youtubeChannel: e.target.value }))} />
                    </div>
                )}
            </SectionBox>

            {/* ── 8. LOCATION ── */}
            <SectionBox title="8. Location">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label>City Name</Label>
                        <input className="input-field" placeholder="Enter your city name"
                            value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                    </div>
                    <div>
                        <Label>Pincode</Label>
                        <input className="input-field" placeholder="Pincode"
                            value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))} />
                    </div>
                    <div>
                        <Label>Street / Locality / Mohalla</Label>
                        <input className="input-field" placeholder="Street / Locality / Mohalla"
                            value={form.locality} onChange={e => setForm(f => ({ ...f, locality: e.target.value }))} />
                    </div>
                </div>
            </SectionBox>

            {/* ── 9. CONTACT ── */}
            <SectionBox title="9. Contact Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label>Email ID</Label>
                        <input className="input-field bg-gray-50" value={user?.email || ''} disabled
                            placeholder="Email ID" />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                        <Label>Mobile Number</Label>
                        <input className="input-field" placeholder="+91 98765 43210"
                            value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                        <p className="text-xs text-gray-400 mt-1">Verified by sending OTP on Email ID</p>
                    </div>
                </div>
                <div>
                    <Label>Visibility of Mobile Number</Label>
                    <div className="flex gap-6">
                        <Radio name="mobileVis" checked={form.mobileVisibility === 'paid'}
                            onChange={() => setForm(f => ({ ...f, mobileVisibility: 'paid' }))}
                            label="1) Only to paid users" />
                        <Radio name="mobileVis" checked={form.mobileVisibility === 'all'}
                            onChange={() => setForm(f => ({ ...f, mobileVisibility: 'all' }))}
                            label="2) For all users" />
                    </div>
                </div>
            </SectionBox>

            {/* ── 10. BIO ── */}
            <SectionBox title="10. About You & Teaching Experience">
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <Label>About You (Maximum 300 Words)</Label>
                        <span className={`text-xs font-bold ${wordCount >= 290 ? 'text-red-500' : 'text-gray-400'}`}>
                            {wordCount} / 300 words
                        </span>
                    </div>
                    <textarea className="input-field resize-none h-40"
                        placeholder="Describe your teaching experience, methodology, achievements, qualifications and why students should choose you..."
                        value={form.bio} onChange={handleBioChange} />
                </div>
            </SectionBox>

            {/* Save Button */}
            <button onClick={handleSave} disabled={saving}
                className="btn btn-secondary w-full py-4 text-base gap-2 flex items-center justify-center">
                <Save size={18} /> {saving ? 'Saving...' : 'Save All Changes'}
            </button>
        </div>
    );
};

export default TutorProfile;
