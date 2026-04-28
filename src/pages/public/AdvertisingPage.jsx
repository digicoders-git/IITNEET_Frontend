import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
    Megaphone, Target, BarChart3, Users, CheckCircle, ArrowRight, Star, Zap, Award, 
    ExternalLink, MapPin, Building2, Instagram, Globe, Twitter, Youtube, Facebook 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdvertisingPage = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ads/active`);
                setAds(res.data);
            } catch (err) {
                console.error('Failed to fetch ads', err);
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

    const plans = [
        {
            name: "Basic Growth",
            price: "₹1,999",
            period: "per month",
            description: "Perfect for local coaching centers starting their digital journey.",
            features: [
                "Profile Listing in Search",
                "Basic Contact Details",
                "Up to 5 Course Listings",
                "Basic Analytics",
                "Email Support"
            ],
            recommended: false
        },
        {
            name: "Premium Visibility",
            price: "₹4,999",
            period: "per month",
            description: "Maximize your reach with priority placement and advanced features.",
            features: [
                "Priority Search Ranking",
                "Verified Badge",
                "Unlimited Course Listings",
                "Advanced Student Analytics",
                "Direct Lead Notifications",
                "Social Media Promotion",
                "Priority Support"
            ],
            recommended: true
        },
        {
            name: "Institutional Elite",
            price: "₹9,999",
            period: "per month",
            description: "The ultimate solution for established institutes seeking market dominance.",
            features: [
                "Homepage Featured Slot",
                "Full Page Ad Placement",
                "Exclusive Branding Rights",
                "Monthly Performance Reports",
                "Dedicated Account Manager",
                "Custom Email Campaigns",
                "Webinar Hosting Rights"
            ],
            recommended: false
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
                            <span>Grow Your Institute with IIT-NEET.com</span>
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
                            {/* Decorative element */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-50/50 font-black text-7xl -z-10 select-none">PARTNERS</div>
                        </div>

                        <div className="max-w-6xl mx-auto relative group">
                            <div className="overflow-hidden rounded-[3rem] bg-white border border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0_40px_80px_-15px_rgba(30,58,138,0.15)]">
                                <div className="flex flex-col lg:flex-row">
                                    <div className="lg:w-[55%] relative aspect-[16/10] lg:aspect-auto overflow-hidden cursor-pointer group/img" onClick={() => handleAdClick(ads[activeIndex]._id, ads[activeIndex].link)}>
                                        <img 
                                            src={`${import.meta.env.VITE_API_URL}${ads[activeIndex].imageUrl}`} 
                                            alt={ads[activeIndex].title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                                        />
                                        <div className="absolute top-8 left-8 bg-blue-900/90 backdrop-blur-md text-white text-[11px] font-black px-5 py-2 rounded-full uppercase tracking-[0.15em] shadow-2xl border border-white/20">
                                            Partner Highlight
                                        </div>
                                    </div>
                                    <div className="lg:w-[45%] p-10 lg:p-16 flex flex-col justify-center bg-white relative">
                                        <div className="flex items-center gap-5 mb-8">
                                            <div className="w-16 h-16 rounded-2xl border-2 border-blue-50 overflow-hidden shadow-md shrink-0 bg-white">
                                                {ads[activeIndex].coachingLogo ? (
                                                    <img src={`${import.meta.env.VITE_API_URL}${ads[activeIndex].coachingLogo}`} alt="Logo" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-900 font-black text-2xl">
                                                        {ads[activeIndex].coachingId?.name?.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-extrabold text-blue-900 text-lg leading-tight transition-colors">{ads[activeIndex].coachingId?.name}</h4>
                                                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold uppercase tracking-[0.1em] mt-1.5">
                                                    <MapPin size={13} className="text-amber-500" /> {ads[activeIndex].coachingId?.city}
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">{ads[activeIndex].title}</h3>
                                        <p className="text-gray-500 leading-relaxed mb-10 text-lg font-medium opacity-80">{ads[activeIndex].description}</p>

                                        <div className="flex flex-wrap items-center gap-4 mt-auto">
                                            <div className="flex items-center gap-2.5">
                                                {ads[activeIndex].socialLinks?.instagram && (
                                                    <a href={`https://instagram.com/${ads[activeIndex].socialLinks.instagram}`} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-gray-50 text-gray-400 rounded-2xl hover:bg-gradient-to-tr hover:from-amber-400 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all shadow-sm">
                                                        <Instagram size={20} />
                                                    </a>
                                                )}
                                                {ads[activeIndex].socialLinks?.facebook && (
                                                    <a href={ads[activeIndex].socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-gray-50 text-gray-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                        <Facebook size={20} />
                                                    </a>
                                                )}
                                                {ads[activeIndex].socialLinks?.youtube && (
                                                    <a href={ads[activeIndex].socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                        <Youtube size={20} />
                                                    </a>
                                                )}
                                            </div>
                                            <button 
                                                onClick={() => handleAdClick(ads[activeIndex]._id, ads[activeIndex].link)}
                                                className="ml-auto bg-blue-900 text-white px-8 py-4 rounded-[1.25rem] font-bold text-sm flex items-center gap-3 hover:bg-amber-500 hover:scale-105 transition-all shadow-xl shadow-blue-900/10 active:scale-95"
                                            >
                                                Explore Program <ExternalLink size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Controls */}
                            {ads.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevAd}
                                        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-blue-900 hover:bg-amber-500 hover:text-white transition-all z-20 group/btn"
                                    >
                                        <ArrowRight size={28} className="rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
                                    </button>
                                    <button 
                                        onClick={nextAd}
                                        className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-blue-900 hover:bg-amber-500 hover:text-white transition-all z-20 group-hover/btn"
                                    >
                                        <ArrowRight size={28} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    
                                    <div className="flex justify-center gap-3 mt-12">
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
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight italic">"IIT-NEET.com helped us increase our student walk-ins by 40% in just two months. The quality of leads is exceptional."</h2>
                            <div>
                                <div className="font-black text-amber-500 text-2xl uppercase tracking-tight">Director of Zenith Coaching</div>
                                <div className="text-blue-300 font-bold uppercase tracking-widest text-xs mt-1">Mumbai, India</div>
                            </div>
                        </div>
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
                                <a href="tel:+919876543210" className="border-2 border-white/20 text-white px-10 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all text-center">
                                    Call Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AdvertisingPage;
