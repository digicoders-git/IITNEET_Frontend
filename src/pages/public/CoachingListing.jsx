import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Search, MapPin, Building2, Filter, X, ChevronLeft, ChevronRight, SlidersHorizontal, GraduationCap } from 'lucide-react';

const CoachingCard = ({ profile }) => (
    <Link to={`/coachings/${profile.user._id}`}
        className="bg-white border-2 border-gray-200 hover:border-amber-500 transition-all group block">
        <div className="bg-blue-900 p-5">
            <div className="min-w-0">
                <h3 className="font-bold text-white text-base leading-tight truncate">{profile.user.name}</h3>
                {profile.location && (
                    <div className="flex items-center gap-1 mt-1 text-blue-300 text-xs">
                        <MapPin size={11} />{profile.location}
                    </div>
                )}
            </div>
        </div>
        <div className="p-5">
            <div className="flex flex-wrap gap-1.5 mb-4">
                {(profile.courses || []).slice(0, 3).map(c => (
                    <span key={c} className="bg-blue-50 text-blue-900 text-xs font-semibold px-2.5 py-1 border border-blue-200">{c}</span>
                ))}
            </div>
            {profile.bio && (
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{profile.bio}</p>
            )}
            <div className="pt-4 border-t-2 border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                    {(profile.courses || []).length} courses
                </span>
                <span className="bg-amber-500 group-hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 transition-colors">
                    View Details
                </span>
            </div>
        </div>
    </Link>
);

const CoachingListing = () => {
    const [coachings, setCoachings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ search: '', location: '', course: '' });
    const [applied, setApplied] = useState({ search: '', location: '', course: '' });

    const fetchCoachings = useCallback(async (f, p = 1) => {
        setLoading(true);
        try {
            const params = { page: p, limit: 12, ...f };
            Object.keys(params).forEach(k => !params[k] && delete params[k]);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/coachings`, { params });
            setCoachings(res.data.coachings);
            setTotal(res.data.total);
            setPages(res.data.pages);
        } catch { setCoachings([]); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchCoachings(applied, page); }, [applied, page]);

    const handleApply = () => { setPage(1); setApplied({ ...filters }); setShowFilters(false); };
    const handleClear = () => {
        const e = { search: '', location: '', course: '' };
        setFilters(e); setApplied(e); setPage(1);
    };
    const activeFilterCount = [applied.location, applied.course].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-blue-900 pt-20 border-b-4 border-amber-500">
                <div className="page-container py-10">
                    <h1 className="text-3xl font-bold text-white mb-1">Coaching Institutes</h1>
                    <p className="text-blue-300 text-sm">
                        {loading ? 'Searching...' : `${total} institutes listed`}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                className="w-full pl-11 pr-4 py-3 bg-white text-gray-800 outline-none border-2 border-white focus:border-amber-400 placeholder:text-gray-400"
                                placeholder="Search institutes or courses..."
                                value={filters.search}
                                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
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
                {/* Filters */}
                {showFilters && (
                    <div className="bg-white border-2 border-gray-200 p-6 mb-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-2 block">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                    <input className="input-field pl-10" placeholder="City or area..."
                                        value={filters.location} onChange={e => setFilters(f => ({ ...f, location: e.target.value }))} />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-bold text-blue-900 mb-2 block">Category</label>
                                <select className="input-field" value={filters.course}
                                    onChange={e => setFilters(f => ({ ...f, course: e.target.value }))}>
                                    <option value="">All Categories</option>
                                    <option value="IIT/NEET & Academic">IIT/NEET &amp; Academic</option>
                                    <option value="IIT & NEET">IIT &amp; NEET</option>
                                    <option value="IIT-JEE">IIT-JEE</option>
                                    <option value="NEET">NEET</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5 pt-4 border-t-2 border-gray-100">
                            <button onClick={handleApply} className="btn btn-secondary px-6">Apply Filters</button>
                            <button onClick={handleClear} className="btn btn-outline px-6 flex items-center gap-2"><X size={14} /> Clear All</button>
                        </div>
                    </div>
                )}

                {/* Active tags */}
                {activeFilterCount > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {applied.location && (
                            <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1.5 flex items-center gap-1 border border-blue-200">
                                📍 {applied.location}
                                <button onClick={() => { setApplied(a => ({ ...a, location: '' })); setFilters(f => ({ ...f, location: '' })); }}><X size={12} /></button>
                            </span>
                        )}
                        {applied.course && (
                            <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1.5 flex items-center gap-1 border border-blue-200">
                                {applied.course}
                                <button onClick={() => { setApplied(a => ({ ...a, course: '' })); setFilters(f => ({ ...f, course: '' })); }}><X size={12} /></button>
                            </span>
                        )}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white border-2 border-gray-200 animate-pulse">
                                <div className="h-20 bg-gray-200"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-gray-100 w-3/4"></div>
                                    <div className="h-3 bg-gray-100 w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : coachings.length === 0 ? (
                    <div className="text-center py-20 bg-white border-2 border-gray-200">
                        <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-blue-900 font-bold text-lg mb-1">No institutes found</p>
                        <p className="text-gray-400 text-sm">Try adjusting your filters</p>
                        <button onClick={handleClear} className="mt-4 btn btn-outline px-6">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {coachings.map(c => <CoachingCard key={c._id} profile={c} />)}
                    </div>
                )}

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

export default CoachingListing;




