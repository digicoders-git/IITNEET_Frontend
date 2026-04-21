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
        className="bg-white border-2 border-gray-200 hover:border-amber-500 transition-all group block">
        <div className="bg-blue-900 p-5">
            <div className="flex items-start justify-between">
                <div className="min-w-0">
                    <h3 className="font-bold text-white text-base leading-tight truncate">{profile.user.name}</h3>
                    {profile.experience && (
                        <p className="text-blue-300 text-xs mt-1">{profile.experience} yrs experience</p>
                    )}
                </div>
                {profile.ratings > 0 && (
                    <span className="flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2 py-1 shrink-0">
                        <Star size={10} className="fill-white" />{profile.ratings}
                    </span>
                )}
            </div>
        </div>
        <div className="p-5">
            <div className="flex flex-wrap gap-1.5 mb-4">
                {(profile.subjects || []).slice(0, 3).map(s => (
                    <span key={s} className="bg-blue-50 text-blue-900 text-xs font-semibold px-2.5 py-1 border border-blue-200">{s}</span>
                ))}
            </div>
            <div className="space-y-1.5 mb-4">
                {profile.location && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin size={13} className="text-gray-400 shrink-0" />
                        <span>{profile.location}</span>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                {profile.fees ? (
                    <p className="font-bold text-blue-900 flex items-center gap-0.5 text-sm">
                        <IndianRupee size={13} />{profile.fees}<span className="text-gray-400 font-normal text-xs">/mo</span>
                    </p>
                ) : <span className="text-gray-400 text-sm">Fees on request</span>}
                <span className="bg-amber-500 group-hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 transition-colors">
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
        teachingClass: searchParams.get('class') || '',
        city: searchParams.get('search') || '',
        experience: ''
    });
    const [applied, setApplied] = useState({
        search: searchParams.get('search') || '',
        subject: searchParams.get('subject') || '',
        teachingClass: searchParams.get('class') || '',
        city: searchParams.get('search') || '',
        experience: ''
    });

    const fetchTutors = useCallback(async (f, p = 1) => {
        setLoading(true);
        try {
            const params = { page: p, limit: 12 };
            if (f.search) params.search = f.search;
            if (f.subject) params.subject = f.subject;
            if (f.teachingClass) params.teachingClass = f.teachingClass;
            if (f.experience) params.experience = f.experience;
            // city searches both search (name/bio) and location field
            if (f.city) params.search = f.city;
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
        const empty = { search: '', subject: '', teachingClass: '', city: '', experience: '' };
        setFilters(empty); setApplied(empty); setPage(1);
    };
    const activeFilterCount = [applied.subject, applied.teachingClass, applied.city, applied.experience].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Page Header */}
            <div className="bg-blue-900 pt-20 border-b-4 border-amber-500">
                <div className="page-container py-10">
                    <h1 className="text-3xl font-bold text-white mb-1">Find Expert Tutors</h1>
                    <p className="text-blue-300 text-sm">
                        {loading ? 'Searching...' : `${total} verified tutors available`}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-3xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                className="w-full pl-11 pr-4 py-3 bg-white text-gray-800 outline-none border-2 border-white focus:border-amber-400 placeholder:text-gray-400"
                                placeholder="Search by name or subject..."
                                value={filters.search}
                                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                                onKeyDown={e => e.key === 'Enter' && handleApply()}
                            />
                        </div>
                        <div className="relative flex-1">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                className="w-full pl-11 pr-4 py-3 bg-white text-gray-800 outline-none border-2 border-white focus:border-amber-400 placeholder:text-gray-400"
                                placeholder="Enter city name..."
                                value={filters.city}
                                onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
                                onKeyDown={e => e.key === 'Enter' && handleApply()}
                            />
                        </div>
                        <button onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all border-2 ${showFilters || activeFilterCount > 0 ? 'bg-amber-500 text-white border-amber-500' : 'bg-transparent text-white border-white hover:bg-blue-800'}`}>
                            <SlidersHorizontal size={16} />
                            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                        </button>
                        <button onClick={handleApply} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 transition-all">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="page-container py-8">
                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-white border-2 border-gray-200 p-6 mb-6">
                        <div className="grid md:grid-cols-4 gap-5">
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-2 block">Class / Level</label>
                                <select className="input-field" value={filters.teachingClass}
                                    onChange={e => setFilters(f => ({ ...f, teachingClass: e.target.value }))}>
                                    <option value="">All Classes</option>
                                    {['KG','Class I','Class II','Class III','Class IV','Class V','Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII','Class XI & XII - Foundation','IIT-JEE','IIT & NEET','NEET','BSc.','MSc.','BCA','BBA','MBA','NDA','CSAT','Banking','Other'].map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-2 block">Subject</label>
                                <select className="input-field" value={filters.subject}
                                    onChange={e => setFilters(f => ({ ...f, subject: e.target.value }))}>
                                    <option value="">All Subjects</option>
                                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-2 block">City</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                    <input className="input-field pl-10" placeholder="Enter city name..."
                                        value={filters.city} onChange={e => setFilters(f => ({ ...f, city: e.target.value }))} />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-2 block">Experience</label>
                                <select className="input-field" value={filters.experience}
                                    onChange={e => setFilters(f => ({ ...f, experience: e.target.value }))}>
                                    {EXPERIENCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5 pt-4 border-t-2 border-gray-100">
                            <button onClick={handleApply} className="btn btn-secondary px-6">Apply Filters</button>
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
                            <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1.5 flex items-center gap-1 border border-blue-200">
                                {applied.subject}
                                <button onClick={() => { setApplied(a => ({ ...a, subject: '' })); setFilters(f => ({ ...f, subject: '' })); }}>
                                    <X size={12} />
                                </button>
                            </span>
                        )}
                        {applied.city && (
                            <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1.5 flex items-center gap-1 border border-blue-200">
                                📍 {applied.city}
                                <button onClick={() => { setApplied(a => ({ ...a, city: '' })); setFilters(f => ({ ...f, city: '' })); }}>
                                    <X size={12} />
                                </button>
                            </span>
                        )}
                        {applied.experience && (
                            <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1.5 flex items-center gap-1 border border-blue-200">
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
                            <div key={i} className="bg-white border-2 border-gray-200 animate-pulse">
                                <div className="h-20 bg-gray-200"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-gray-100 w-3/4"></div>
                                    <div className="h-3 bg-gray-100 w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : tutors.length === 0 ? (
                    <div className="text-center py-20 bg-white border-2 border-gray-200">
                        <GraduationCap size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-blue-900 font-bold text-lg mb-1">No tutors found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your filters or search term</p>
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
                            className="p-2.5 border-2 border-gray-200 disabled:opacity-40 hover:border-blue-900 transition-all">
                            <ChevronLeft size={18} />
                        </button>
                        <span className="font-bold text-blue-900 px-2">Page {page} of {pages}</span>
                        <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                            className="p-2.5 border-2 border-gray-200 disabled:opacity-40 hover:border-blue-900 transition-all">
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




