import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { MapPin, GraduationCap, Users, Phone, Mail, ArrowLeft, CheckCircle2, BookOpen, Megaphone, Instagram, Facebook, Youtube, Globe, ArrowRight } from 'lucide-react';

const CoachingPublicProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState([]);
    const [adsLoading, setAdsLoading] = useState(true);
    const [activeAdIndex, setActiveAdIndex] = useState(0);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/coaching/${userId}`)
            .then(res => { setData(res.data); setLoading(false); })
            .catch(() => setLoading(false));
        
        // Fetch ads for this coaching
        axios.get(`${import.meta.env.VITE_API_URL}/api/ads/coaching/${userId}`)
            .then(res => { setAds(res.data); setAdsLoading(false); })
            .catch(() => setAdsLoading(false));
    }, [userId]);

    useEffect(() => {
        if (ads.length > 1) {
            const timer = setInterval(() => {
                setActiveAdIndex((prev) => (prev + 1) % ads.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [ads]);

    const handleAdClick = async (id, link) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/ads/click/${id}`);
            if (link) {
                const url = link.startsWith('http') ? link : `https://${link}`;
                window.open(url, '_blank');
            }
        } catch (err) {
            console.error('Click tracking failed', err);
            if (link) {
                const url = link.startsWith('http') ? link : `https://${link}`;
                window.open(url, '_blank');
            }
        }
    };

    const nextAd = () => setActiveAdIndex((prev) => (prev + 1) % ads.length);
    const prevAd = () => setActiveAdIndex((prev) => (prev - 1 + ads.length) % ads.length);

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
                            src={profile?.instituteImage 
                                ? `${import.meta.env.VITE_API_URL}${profile.instituteImage}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(coaching.name)}&size=100&background=e0e7ff&color=3730a3&bold=true&rounded=true`
                            }
                            alt={coaching.name}
                            className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-xl object-cover"
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
                                    <MapPin size={14} />{profile.location}, {profile.locality} {profile.pincode}
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

            <div className="page-container py-8 max-w-5xl px-4">
                {/* Institute Image - Full Width */}
                {profile?.instituteImage && (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
                        <img 
                            src={`${import.meta.env.VITE_API_URL}${profile.instituteImage}`}
                            alt={coaching.name}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                )}

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
                                            <p className="text-[10px] text-slate-400 font-medium">{profile.locality}, {profile.pincode}</p>
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

                {/* Advertisements Section - Full Width */}
                {!adsLoading && ads.length > 0 && (
                    <div className="mt-12">
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-black text-blue-900 mb-3 uppercase tracking-tight flex items-center justify-center gap-2">
                                <Megaphone size={28} className="text-amber-500" /> Current Offers & Announcements
                            </h3>
                            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="max-w-5xl mx-auto relative group">
                            {/* Tabular Advertisement Card */}
                            <div className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-2xl transition-all">
                                {/* Top Banner Image */}
                                <div 
                                    className="w-full aspect-[16/7] md:aspect-[21/9] relative overflow-hidden bg-slate-100 cursor-pointer group/banner"
                                    onClick={() => handleAdClick(ads[activeAdIndex]._id, ads[activeAdIndex].link)}
                                >
                                    <img 
                                        src={`${import.meta.env.VITE_API_URL}${ads[activeAdIndex].imageUrl}`} 
                                        alt={ads[activeAdIndex].title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105"
                                    />
                                    <div className="absolute top-6 left-6 bg-amber-500 text-blue-900 text-[10px] font-black px-4 py-1.5 rounded uppercase tracking-widest shadow-lg border border-blue-900/10">
                                        Featured Offer
                                    </div>
                                </div>

                                {/* Bottom Tabular Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 border-t-2 border-slate-300 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-300 bg-white">
                                    {/* Left Half */}
                                    <div className="flex flex-col divide-y-2 divide-slate-300">
                                        {/* Row 1: Name & Category */}
                                        <div className="grid grid-cols-2 divide-x-2 divide-slate-300 text-center">
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Name of Institute</span>
                                                <span className="font-black text-slate-900 text-sm md:text-base tracking-tight truncate w-full px-2">
                                                    {coaching.name}
                                                </span>
                                            </div>
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</span>
                                                <span className="font-black text-slate-900 text-sm md:text-base tracking-tight">
                                                    {ads[activeAdIndex].category || 'IIT & NEET'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 2: City, Pincode, Street */}
                                        <div className="grid grid-cols-3 divide-x-2 divide-slate-300 text-center">
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">City</span>
                                                <span className="font-black text-slate-800 text-xs md:text-sm truncate w-full">
                                                    {coaching.city || profile?.location || 'India'}
                                                </span>
                                            </div>
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pincode</span>
                                                <span className="font-black text-slate-800 text-xs md:text-sm">
                                                    {profile?.pincode || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Street/Locality/Mohalla</span>
                                                <span className="font-black text-slate-800 text-xs md:text-sm truncate w-full px-1">
                                                    {profile?.locality || 'N/A'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 3: Address & Contact info bar */}
                                        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/80 mt-auto">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                                <MapPin size={14} className="text-amber-500 shrink-0" />
                                                <span className="truncate">Address with contact numbers & website (if any)</span>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {ads[activeAdIndex].socialLinks?.instagram && (
                                                    <a href={`https://instagram.com/${ads[activeAdIndex].socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center bg-white text-pink-600 border border-slate-200 rounded-lg hover:bg-pink-50 transition-all">
                                                        <Instagram size={14} />
                                                    </a>
                                                )}
                                                {ads[activeAdIndex].socialLinks?.facebook && (
                                                    <a href={ads[activeAdIndex].socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center bg-white text-blue-600 border border-slate-200 rounded-lg hover:bg-blue-50 transition-all">
                                                        <Facebook size={14} />
                                                    </a>
                                                )}
                                                {ads[activeAdIndex].socialLinks?.youtube && (
                                                    <a href={ads[activeAdIndex].socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center bg-white text-red-600 border border-slate-200 rounded-lg hover:bg-red-50 transition-all">
                                                        <Youtube size={14} />
                                                    </a>
                                                )}
                                                {ads[activeAdIndex].link && (
                                                    <a href={ads[activeAdIndex].link.startsWith('http') ? ads[activeAdIndex].link : `https://${ads[activeAdIndex].link}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all">
                                                        <Globe size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Half: Video & Description */}
                                    <div className="p-6 flex flex-col justify-center items-center bg-slate-50/50 text-center">
                                        {ads[activeAdIndex].videoUrl ? (
                                            <div className="w-full aspect-video rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner mb-4 bg-black">
                                                <video src={`${import.meta.env.VITE_API_URL}${ads[activeAdIndex].videoUrl}`} controls className="w-full h-full object-contain" />
                                            </div>
                                        ) : (
                                            <div className="w-full py-8 px-4 border-2 border-dashed border-slate-300 rounded-xl bg-white mb-4 flex flex-col items-center justify-center text-slate-400 shadow-sm">
                                                <p className="text-sm font-bold text-slate-700 mb-1">No Video Available</p>
                                            </div>
                                        )}
                                        
                                        <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-md line-clamp-3 mb-5">
                                            {ads[activeAdIndex].description || 'Best Coaching Center providing expert guidance, small batches, skilled teachers, monthly mock tests, and guaranteed results.'}
                                        </p>
                                        
                                        <button 
                                            onClick={() => handleAdClick(ads[activeAdIndex]._id, ads[activeAdIndex].link)}
                                            className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-500 hover:text-blue-900 transition-all shadow-md mt-auto"
                                        >
                                            Learn More <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Controls */}
                            {ads.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevAd}
                                        className="absolute left-0 top-1/3 md:top-1/2 -translate-x-1/2 md:-translate-x-6 -translate-y-1/2 w-12 h-12 bg-white border-2 border-slate-200 rounded-full shadow-2xl flex items-center justify-center text-blue-900 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all z-20 group/btn"
                                    >
                                        <ArrowRight size={24} className="rotate-180 group-hover/btn:-translate-x-0.5 transition-transform" />
                                    </button>
                                    <button 
                                        onClick={nextAd}
                                        className="absolute right-0 top-1/3 md:top-1/2 translate-x-1/2 md:translate-x-6 -translate-y-1/2 w-12 h-12 bg-white border-2 border-slate-200 rounded-full shadow-2xl flex items-center justify-center text-blue-900 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all z-20 group/btn"
                                    >
                                        <ArrowRight size={24} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                    
                                    <div className="flex justify-center gap-3 mt-10">
                                        {ads.map((_, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => setActiveAdIndex(i)}
                                                className={`h-2 rounded-full transition-all duration-500 ${i === activeAdIndex ? 'w-12 bg-amber-500 shadow-md shadow-amber-500/30' : 'w-2.5 bg-gray-200 hover:bg-gray-300'}`}
                                                aria-label={`Go to slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CoachingPublicProfile;




