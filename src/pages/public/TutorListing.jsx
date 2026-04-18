import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Search, MapPin, Clock, Star, IndianRupee, GraduationCap, Filter, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

const SUBJECTS = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English'];
const EXPERIENCE_OPTIONS = [
    { label: 'Any Experience', value: '' },
    { label: '1+ Years', value: '1' },
    { label: '3+ Years', value: '3' },
    { label: '5+ Years', value: '5' },
    { label: '10+ Years', value: '10' },
];

const TutorCard = ({ profile }) => (
    <Link to={`/tutors/${profile.user._id}`}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden block">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-5 flex items-center gap-4">
            <img
                src={profile?.profileImage ? `${import.meta.env.VITE_API_URL}${profile.profileImage}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user.name)}&size=80&background=e0e7ff&color=3730a3&bold=true&rounded=true`}
                alt={profile.user.name}
                className="w-14 h-14 rounded-xl border-2 border-white/20 shadow-lg shrink-0"
            />
            <div className="min-w-0">
                <h3 className="font-black text-white text-base leading-tight truncate">{profile.user.name}</h3>
                {profile.ratings > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < Math.floor(profile.ratings) ? 'text-amber-400 fill-amber-400' : 'text-white/20'} />
                        ))}
                        <span className="text-white/70 text-xs ml-1">{profile.ratings}</span>
                    </div>
                )}
                {profile.user.subscriptionStatus === 'active' && (
                    <span className="text-[9px] font-black uppercase bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full mt-1 inline-block">⭐ Featured</span>
                )}
            </div>
        </div>
        <div className="p-5">
            <div className="flex flex-wrap gap-1.5 mb-4">
                {(profile.subjects || []).slice(0, 3).map(s => (
                    <span key={s} className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">{s}</span>
                ))}
            </div>
            <div className="space-y-1.5 mb-4">
                {profile.experience && (
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Clock size={13} className="text-slate-400 shrink-0" />
                        <span>{profile.experience} years experience</span>
                    </div>
                )}
                {profile.location && (
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MapPin size={13} className="text-slate-400 shrink-0" />
                        <span>{profile.location}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {profile.fees ? (
                    <div>
                        <p className="text-xs text-slate-400">Monthly Fees</p>
                        <p className="font-black text-slate-900 flex items-center gap-0.5">
                            <IndianRupee size={13} />{profile.fees}
                        </p>
                    </div>
                ) : <span className="text-slate-400 text-sm">Fees on request</span>}
                <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl group-hover:bg-indigo-700 transition-colors">
                    View Profile
                </span>
            </div>
        </div>
    </Link>
);

const TutorListing = () => {
    const [searchParams] = useSearchParams();
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        subject: searchParams.get('subject') || '',
        location: '',
        experience: ''
    });
    const [applied, setApplied] = useState({
        search: searchParams.get('search') || '',
        subject: searchParams.get('subject') || '',
        location: '',
        experience: ''
    });

    const fetchTutors = useCallback(async (f, p = 1) => {
        setLoading(true);
        try {
            const params = { page: p, limit: 12, ...f };
            Object.keys(params).forEach(k => !params[k] && delete params[k]);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/tutors`, { params });
            setTutors(res.data.tutors);
            setTotal(res.data.total);
            setPages(res.data.pages);
        } catch { setTutors([]); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchTutors(applied, page); }, [applied, page]);

    const handleApply = () => { setPage(1); setApplied({ ...filters }); setShowFilters(false); };
    const handleClear = () => {
        const empty = { search: '', subject: '', location: '', experience: '' };
        setFilters(empty); setApplied(empty); setPage(1);
    };
    const activeFilterCount = [applied.subject, applied.location, applied.experience].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Page Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 pt-20">
                <div className="page-container py-10">
                    <h1 className="text-3xl font-black text-white mb-1">Find Expert Tutors</h1>
                    <p className="text-blue-300 text-sm">
                        {loading ? 'Searching...' : `${total} verified tutors available`}
                    </p>
                    {/* Search inside header */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-slate-800 outline-none placeholder:text-slate-400"
                                placeholder="Search by name or subject..."
                                value={filters.search}
                                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                                onKeyDown={e => e.key === 'Enter' && handleApply()}
                            />
                        </div>
                        <button onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${showFilters || activeFilterCount > 0 ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}>
                            <SlidersHorizontal size={16} />
                            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                        </button>
                        <button onClick={handleApply} className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-8 py-3 rounded-xl transition-all">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="page-container py-8">
                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                        <div className="grid md:grid-cols-3 gap-5">
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-2 block">Subject</label>
                                <select className="input-field" value={filters.subject}
                                    onChange={e => setFilters(f => ({ ...f, subject: e.target.value }))}>
                                    <option value="">All Subjects</option>
                                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-2 block">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                    <input className="input-field pl-10" placeholder="City or area..."
                                        value={filters.location} onChange={e => setFilters(f => ({ ...f, location: e.target.value }))} />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-2 block">Experience</label>
                                <select className="input-field" value={filters.experience}
                                    onChange={e => setFilters(f => ({ ...f, experience: e.target.value }))}>
                                    {EXPERIENCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5 pt-4 border-t border-slate-100">
                            <button onClick={handleApply} className="btn btn-primary px-6">Apply Filters</button>
                            <button onClick={handleClear} className="btn btn-outline px-6 flex items-center gap-2">
                                <X size={14} /> Clear All
                            </button>
                        </div>
                    </div>
                )}

                {/* Active filter tags */}
                {activeFilterCount > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {applied.subject && (
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                {applied.subject}
                                <button onClick={() => { setApplied(a => ({ ...a, subject: '' })); setFilters(f => ({ ...f, subject: '' })); }}>
                                    <X size={12} />
                                </button>
                            </span>
                        )}
                        {applied.location && (
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                📍 {applied.location}
                                <button onClick={() => { setApplied(a => ({ ...a, location: '' })); setFilters(f => ({ ...f, location: '' })); }}>
                                    <X size={12} />
                                </button>
                            </span>
                        )}
                        {applied.experience && (
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                {applied.experience}+ yrs
                                <button onClick={() => { setApplied(a => ({ ...a, experience: '' })); setFilters(f => ({ ...f, experience: '' })); }}>
                                    <X size={12} />
                                </button>
                            </span>
                        )}
                    </div>
                )}

                {/* Results */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
                                <div className="h-20 bg-slate-200"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                    <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : tutors.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                        <GraduationCap size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-700 font-bold text-lg mb-1">No tutors found</p>
                        <p className="text-slate-400 text-sm">Try adjusting your filters or search term</p>
                        <button onClick={handleClear} className="mt-4 btn btn-outline px-6">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {tutors.map(t => <TutorCard key={t._id} profile={t} />)}
                    </div>
                )}

                {/* Pagination */}
                {pages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-10">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                            className="p-2.5 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-white hover:shadow-sm transition-all">
                            <ChevronLeft size={18} />
                        </button>
                        <span className="font-bold text-slate-700 px-2">Page {page} of {pages}</span>
                        <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                            className="p-2.5 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-white hover:shadow-sm transition-all">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default TutorListing;




