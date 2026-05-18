import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
    Megaphone, Target, BarChart3, Users, CheckCircle, ArrowRight, Star, Zap, Award, 
    ExternalLink, MapPin, Building2, Instagram, Globe, Twitter, Youtube, Facebook,
    GraduationCap, BookOpen, Clock, Loader2, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdvertisingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [purchasing, setPurchasing] = useState(null);
    const [modal, setModal] = useState(null); // { type: 'login' | 'wrong-role', role }

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ads/active`);
                setAds(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error('Failed to fetch ads', err);
                setAds([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);

    useEffect(() => {
        if (ads.length > 1) {
            const timer = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % ads.length);
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

    const nextAd = () => setActiveIndex((prev) => (prev + 1) % ads.length);
    const prevAd = () => setActiveIndex((prev) => (prev - 1 + ads.length) % ads.length);

    const handlePlanClick = async (planRole) => {
        // Not logged in
        if (!user) { setModal({ type: 'login', role: planRole }); return; }

        // Student clicking student plan
        if (planRole === 'student' && user.role === 'student') {
            navigate('/student/profile');
            return;
        }

        // Tutor clicking tutor plan
        if (planRole === 'tutor' && user.role === 'tutor') {
            navigate('/tutor/subscription');
            return;
        }

        // Coaching clicking advertiser plan
        if (planRole === 'coaching' && user.role === 'coaching') {
            navigate('/coaching/subscription');
            return;
        }

        // Wrong role logged in
        setModal({ type: 'wrong-role', role: planRole });
    };

    const plans = [
        {
            name: "For Students",
            price: "₹200",
            period: "per two contacts",
            validity: "Unlimited Validity",
            description: "Access hidden tutor contact numbers and connect directly with the best tutors near you.",
            features: [
                "Access 2 hidden tutor contacts",
                "Unlimited validity — never expires",
                "Search verified tutors",
                "Filter by subject & location",
                "Instant contact unlock"
            ],
            color: "blue",
            icon: GraduationCap,
            recommended: false,
            role: "student"
        },
        {
            name: "For Tutors",
            price: "₹500",
            period: "per year",
            validity: "Renewal after one year",
            description: "Get your profile listed publicly and connect with thousands of students looking for tutors.",
            features: [
                "Public profile listing",
                "Appear in tutor search results",
                "Receive student inquiries",
                "1 year active membership",
                "Re-activate within 15 days of expiry"
            ],
            color: "amber",
            icon: BookOpen,
            recommended: true,
            role: "tutor"
        },
        {
            name: "For Advertisers",
            price: "₹2000",
            period: "per year",
            validity: "Renewal after one year",
            description: "Showcase your coaching institute to thousands of IIT-JEE & NEET aspirants across India.",
            features: [
                "Full advertising page",
                "Appear on homepage carousel",
                "1 year public visibility",
                "Social media links display",
                "Re-activate within 15 days of expiry"
            ],
            color: "indigo",
            icon: Building2,
            recommended: false,
            role: "coaching"
        }
    ];

    const stats = [
        { label: "Monthly Students", value: "50,000+" },
        { label: "Active Tutors", value: "2,000+" },
        { label: "Success Stories", value: "10,000+" },
        { label: "Cities Reached", value: "150+" }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-blue-900 overflow-hidden border-b-4 border-amber-500">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-amber-500 opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>
                
                <div className="page-container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 px-4 py-1.5 rounded-full text-amber-400 text-sm font-bold mb-6">
                            <Megaphone size={16} />
                            <span>Grow Your Institute with iitneet.com</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Target the Right Students at the <span className="text-amber-500">Right Time</span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            The most trusted platform for IIT-JEE and NEET aspirants. Connect with thousands of serious students looking for the best coaching.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/contact?subject=Advertising Query" className="btn bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg font-bold w-full sm:w-auto transition-transform hover:scale-105">
                                Start Advertising Now
                            </Link>
                            <a href="#plans" className="text-white font-bold hover:text-amber-400 transition-colors flex items-center gap-2">
                                View Pricing Plans <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Advertisements Carousel Section */}
            {ads.length > 0 ? (
                <section className="py-24 bg-gray-50/50 border-b border-gray-100 overflow-hidden">
                    <div className="page-container">
                        <div className="text-center mb-16 relative">
                            <h2 className="text-4xl font-black text-blue-900 mb-4 uppercase tracking-tighter">Premium Partners</h2>
                            <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full shadow-sm shadow-amber-500/20"></div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-50/50 font-black text-7xl -z-10 select-none">PARTNERS</div>
                        </div>

                        <div className="max-w-5xl mx-auto relative group">
                            {/* Tabular Advertisement Card matching user image */}
                            <div className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-2xl transition-all">
                                {/* Top Banner Image */}
                                <div 
                                    className="w-full aspect-[16/7] md:aspect-[21/9] relative overflow-hidden bg-slate-100 cursor-pointer group/banner"
                                    onClick={() => handleAdClick(ads[activeIndex]._id, ads[activeIndex].link)}
                                >
                                    <img 
                                        src={`${import.meta.env.VITE_API_URL}${ads[activeIndex].imageUrl}`} 
                                        alt={ads[activeIndex].title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105"
                                    />
                                    <div className="absolute top-6 left-6 bg-amber-500 text-blue-900 text-[10px] font-black px-4 py-1.5 rounded uppercase tracking-widest shadow-lg border border-blue-900/10">
                                        Featured Partner
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
                                                    {ads[activeIndex].coachingId?.name || ads[activeIndex].title}
                                                </span>
                                            </div>
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</span>
                                                <span className="font-black text-slate-900 text-sm md:text-base tracking-tight">
                                                    {ads[activeIndex].category || 'IIT & NEET'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 2: City, Pincode, Street */}
                                        <div className="grid grid-cols-3 divide-x-2 divide-slate-300 text-center">
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">City</span>
                                                <span className="font-black text-slate-800 text-xs md:text-sm truncate w-full">
                                                    {ads[activeIndex].coachingId?.city || 'Kolkata'}
                                                </span>
                                            </div>
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pincode</span>
                                                <span className="font-black text-slate-800 text-xs md:text-sm">
                                                    {ads[activeIndex].coachingId?.pincode || '700042'}
                                                </span>
                                            </div>
                                            <div className="p-4 flex flex-col justify-center items-center bg-white">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Street/Locality/Mohalla</span>
                                                <span className="font-black text-slate-800 text-xs md:text-sm truncate w-full px-1">
                                                    {ads[activeIndex].coachingId?.address || ads[activeIndex].coachingId?.locality || '40E, Dharmatala Road'}
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
                                                {ads[activeIndex].socialLinks?.instagram && (
                                                    <a href={`https://instagram.com/${ads[activeIndex].socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center bg-white text-pink-600 border border-slate-200 rounded-lg hover:bg-pink-50 transition-all">
                                                        <Instagram size={14} />
                                                    </a>
                                                )}
                                                {ads[activeIndex].socialLinks?.facebook && (
                                                    <a href={ads[activeIndex].socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center bg-white text-blue-600 border border-slate-200 rounded-lg hover:bg-blue-50 transition-all">
                                                        <Facebook size={14} />
                                                    </a>
                                                )}
                                                {ads[activeIndex].socialLinks?.youtube && (
                                                    <a href={ads[activeIndex].socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center bg-white text-red-600 border border-slate-200 rounded-lg hover:bg-red-50 transition-all">
                                                        <Youtube size={14} />
                                                    </a>
                                                )}
                                                {ads[activeIndex].link && (
                                                    <a href={ads[activeIndex].link.startsWith('http') ? ads[activeIndex].link : `https://${ads[activeIndex].link}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all">
                                                        <Globe size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Half: Video & Description */}
                                    <div className="p-6 flex flex-col justify-center items-center bg-slate-50/50 text-center">
                                        {ads[activeIndex].videoUrl ? (
                                            <div className="w-full aspect-video rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner mb-4 bg-black">
                                                <video src={`${import.meta.env.VITE_API_URL}${ads[activeIndex].videoUrl}`} controls className="w-full h-full object-contain" />
                                            </div>
                                        ) : (
                                            <div className="w-full py-8 px-4 border-2 border-dashed border-slate-300 rounded-xl bg-white mb-4 flex flex-col items-center justify-center text-slate-400 shadow-sm">
                                                <p className="text-sm font-bold text-slate-700 mb-1">Please upload video here</p>
                                                <p className="text-xs text-slate-500 mb-1">About you and your institute</p>
                                                <p className="text-[11px] text-slate-400">Not more than 5 minutes</p>
                                            </div>
                                        )}
                                        
                                        <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-md line-clamp-3 mb-5">
                                            {ads[activeIndex].description || 'Best Coaching Center providing expert guidance, small batches, skilled teachers, monthly mock tests, and guaranteed results.'}
                                        </p>
                                        
                                        <button 
                                            onClick={() => {
                                                if (ads[activeIndex].coachingId?._id) {
                                                    navigate(`/coachings/${ads[activeIndex].coachingId._id}`);
                                                }
                                            }}
                                            className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-500 hover:text-blue-900 transition-all shadow-md mt-auto"
                                        >
                                            View Complete Profile <ArrowRight size={14} />
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
                                        className="absolute right-0 top-1/3 md:top-1/2 translate-x-1/2 md:translate-x-6 -translate-y-1/2 w-12 h-12 bg-white border-2 border-slate-200 rounded-full shadow-2xl flex items-center justify-center text-blue-900 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all z-20 group-hover/btn"
                                    >
                                        <ArrowRight size={24} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                    
                                    <div className="flex justify-center gap-3 mt-10">
                                        {ads.map((_, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => setActiveIndex(i)}
                                                className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-amber-500 shadow-md shadow-amber-500/30' : 'w-2.5 bg-gray-200 hover:bg-gray-300'}`}
                                                aria-label={`Go to slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="py-20 bg-gray-50 border-b border-gray-200">
                    <div className="page-container text-center">
                        <div className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] border-2 border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Megaphone size={40} />
                            </div>
                            <h2 className="text-2xl font-black text-blue-900 mb-4 uppercase">No Active Advertisements</h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Join our premium partners and showcase your coaching institute to thousands of students across India.
                            </p>
                            <Link to="/register?role=coaching" className="btn bg-blue-900 text-white px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-blue-800 transition-all">
                                Promote Your Institute <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Stats Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="page-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-black text-blue-900 mb-1">{stat.value}</div>
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Advertise Section */}
            <section className="py-20">
                <div className="page-container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-blue-900 mb-4 uppercase tracking-tight">Why Advertise with Us?</h2>
                        <div className="w-20 h-2 bg-amber-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 hover:border-blue-900/10 hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-900 group-hover:text-white transition-all transform group-hover:rotate-6">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Laser-Focused Audience</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Reach students specifically looking for IIT-JEE and NEET coaching. No wasted impressions on irrelevant traffic.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 hover:border-blue-900/10 hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all transform group-hover:-rotate-6">
                                <Award size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Build Brand Authority</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Get featured alongside top names in the industry. Establish your institute as a leader in medical and engineering prep.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-gray-50 hover:border-blue-900/10 hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                                <BarChart3 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Measurable Results</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Track every click, view, and lead. Our advanced dashboard shows exactly how your ads are performing in real-time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Testimonial Section */}
            <section className="py-20 bg-amber-500">
                <div className="page-container">
                    <div className="bg-blue-900 rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 shadow-2xl">
                        <div className="md:w-1/3">
                            <div className="w-40 h-40 bg-amber-500 rounded-[2.5rem] flex items-center justify-center text-blue-900 mx-auto rotate-12">
                                <Zap size={80} fill="currentColor" />
                            </div>
                        </div>
                        <div className="md:w-2/3 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight italic">"iitneet.com helped us increase our student walk-ins by 40% in just two months. The quality of leads is exceptional."</h2>
                            <div>
                                <div className="font-black text-amber-500 text-2xl uppercase tracking-tight">Director of Zenith Coaching</div>
                                <div className="text-blue-300 font-bold uppercase tracking-widest text-xs mt-1">Mumbai, India</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Plans Section */}
            <section id="plans" className="py-24 bg-slate-50">
                <div className="page-container">
                    <div className="text-center mb-16">
                        <p className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">Transparent Pricing</p>
                        <h2 className="text-4xl font-black text-blue-900 uppercase tracking-tight mb-4">Our Prices</h2>
                        <p className="text-gray-500 font-medium">All prices are inclusive of GST</p>
                        <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={`relative bg-white rounded-[2.5rem] border-2 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                                    plan.recommended
                                        ? 'border-amber-400 shadow-xl shadow-amber-100'
                                        : 'border-gray-100 shadow-lg'
                                }`}
                            >
                                {plan.recommended && (
                                    <div className="bg-amber-500 text-white text-xs font-black uppercase tracking-widest text-center py-2.5 px-4 flex items-center justify-center gap-1.5">
                                        <Star size={12} fill="currentColor" /> Most Popular
                                    </div>
                                )}

                                <div className={`px-8 pt-10 pb-8 ${
                                    plan.recommended ? 'bg-gradient-to-br from-blue-900 to-indigo-900' : 'bg-white'
                                }`}>
                                    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-2xl bg-white/10">
                                        <plan.icon size={28} className={plan.recommended ? 'text-amber-400' : 'text-blue-900'} />
                                    </div>
                                    <h3 className={`text-2xl font-black mb-2 ${
                                        plan.recommended ? 'text-white' : 'text-blue-900'
                                    }`}>{plan.name}</h3>
                                    <p className={`text-sm leading-relaxed mb-6 ${
                                        plan.recommended ? 'text-blue-200' : 'text-gray-500'
                                    }`}>{plan.description}</p>

                                    <div className="flex items-end gap-2 mb-1">
                                        <span className={`text-5xl font-black ${
                                            plan.recommended ? 'text-amber-400' : 'text-blue-900'
                                        }`}>{plan.price}</span>
                                    </div>
                                    <p className={`text-sm font-semibold ${
                                        plan.recommended ? 'text-blue-300' : 'text-gray-400'
                                    }`}>{plan.period}</p>
                                    <div className={`inline-flex items-center gap-1.5 mt-3 text-xs font-bold px-3 py-1 rounded-full ${
                                        plan.recommended
                                            ? 'bg-white/20 text-white'
                                            : 'bg-blue-50 text-blue-700'
                                    }`}>
                                        <Clock size={12} /> {plan.validity}
                                    </div>
                                </div>

                                <div className="px-8 py-6 flex flex-col flex-1">
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                                                <CheckCircle size={17} className="text-green-500 mt-0.5 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handlePlanClick(plan.role)}
                                        disabled={purchasing === plan.role}
                                        className={`w-full text-center py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all hover:scale-105 disabled:opacity-60 flex items-center justify-center gap-2 ${
                                            plan.recommended
                                                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200'
                                                : 'bg-blue-900 hover:bg-blue-800 text-white'
                                        }`}
                                    >
                                        {purchasing === plan.role
                                            ? <><Loader2 size={15} className="animate-spin" /> Processing...</>
                                            : 'Get Started'
                                        }
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32">
                <div className="page-container max-w-5xl">
                    <div className="bg-gray-900 rounded-[4rem] p-12 md:p-16 relative overflow-hidden text-center md:text-left">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="md:w-1/2">
                                <h2 className="text-4xl font-black text-white mb-6 leading-tight uppercase tracking-tight">Ready to reach more students?</h2>
                                <p className="text-gray-400 text-lg leading-relaxed">Contact our advertising team for a custom quote or more information.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 md:shrink-0">
                                <Link to="/contact" className="bg-white text-gray-900 px-10 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all text-center">
                                    Send Inquiry
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-black text-blue-900 text-lg">
                                {modal.type === 'login' ? 'Login Required' : 'Wrong Account Type'}
                            </h3>
                            <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        {modal.type === 'login' ? (
                            <>
                                <p className="text-gray-500 text-sm mb-6">
                                    Please login or register to purchase the
                                    <strong className="text-blue-900"> {modal.role === 'student' ? 'Student' : modal.role === 'tutor' ? 'Tutor' : 'Advertiser'} </strong>
                                    plan.
                                </p>
                                <div className="flex gap-3">
                                    <Link to={`/login`} className="flex-1 text-center bg-blue-900 text-white py-3 rounded-xl font-black text-sm hover:bg-blue-800 transition-all">
                                        Login
                                    </Link>
                                    <Link
                                        to={modal.role === 'student' ? '/register' : `/register?role=${modal.role}`}
                                        className="flex-1 text-center border-2 border-blue-900 text-blue-900 py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition-all"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-500 text-sm mb-6">
                                    You are logged in as <strong className="text-blue-900">{user?.role}</strong>. This plan is for
                                    <strong className="text-blue-900"> {modal.role === 'student' ? 'Students' : modal.role === 'tutor' ? 'Tutors' : 'Coaching Institutes'}</strong>.
                                    Please login with the correct account.
                                </p>
                                <button
                                    onClick={() => setModal(null)}
                                    className="w-full bg-blue-900 text-white py-3 rounded-xl font-black text-sm hover:bg-blue-800 transition-all"
                                >
                                    OK, Got it
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AdvertisingPage;
