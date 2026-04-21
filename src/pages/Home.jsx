import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GraduationCap, Building2, ArrowRight, Star, MapPin, IndianRupee, Search, Users, Award, TrendingUp, CheckCircle, BookOpen, Phone } from 'lucide-react';

const CLASSES = ['KG','Class I','Class II','Class III','Class IV','Class V','Class VI','Class VII','Class VIII','Class IX','Class X','Class XI','Class XII','Class XI & XII - Foundation','IIT-JEE','IIT & NEET','NEET','BSc.','MSc.','BCA','BBA','MBA','NDA','CSAT','Banking','Other'];
const SUBJECTS = ['English Language','Physics','Chemistry','Mathematics','Biology','History','Geography','Accountancy','Psychology','Sociology','Political Science','Economics','Business Studies','Computer Science','Biotechnology','Sangeet','Data Interpretation & Logical Reasoning','Quantitative Aptitude','CSAT','Other'];

const Home = () => {
    const [searchClass, setSearchClass] = useState('');
    const [searchSubject, setSearchSubject] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [featured, setFeatured] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/profiles/featured`)
            .then(res => setFeatured(Array.isArray(res.data) ? res.data : []))
            .catch(() => {})
            .finally(() => setLoadingFeatured(false));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchClass) params.set('class', searchClass);
        if (searchSubject) params.set('subject', searchSubject);
        if (searchCity) params.set('search', searchCity);
        window.location.href = `/tutors?${params.toString()}`;
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ── HERO ── */}
            <section className="bg-blue-900 pt-28 pb-20">
                <div className="page-container text-center max-w-4xl">
                    <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">India's Most Trusted IIT-JEE & NEET Platform</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                        Find the Best <span className="text-amber-400">IIT-JEE</span> &amp; <span className="text-amber-400">NEET</span> Tutors<br />
                        &amp; Coaching Institutes Near You
                    </h1>
                    <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
                        Connect with verified home tutors and top coaching institutes for Physics, Chemistry, Biology, Mathematics and more. Start your preparation today.
                    </p>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            <select className="w-full px-4 py-3 bg-white text-gray-700 outline-none text-sm font-medium border-2 border-white focus:border-amber-400"
                                value={searchClass} onChange={e => setSearchClass(e.target.value)}>
                                <option value="">Select Class</option>
                                {CLASSES.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <select className="w-full px-4 py-3 bg-white text-gray-700 outline-none text-sm font-medium border-2 border-white focus:border-amber-400"
                                value={searchSubject} onChange={e => setSearchSubject(e.target.value)}>
                                <option value="">Select Subject</option>
                                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                            </select>
                            <input className="w-full px-4 py-3 bg-white text-gray-800 outline-none text-sm border-2 border-white focus:border-amber-400 placeholder:text-gray-400"
                                placeholder="Enter City Name"
                                value={searchCity} onChange={e => setSearchCity(e.target.value)} />
                            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 transition-all text-sm">
                                Search Tutors
                            </button>
                        </div>
                    </form>

                    {/* Quick Subject Links */}
                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                        {['Physics', 'Chemistry', 'Biology', 'Mathematics', 'IIT-JEE', 'NEET'].map(s => (
                            <Link key={s} to={`/tutors?subject=${s}`}
                                className="bg-blue-800 hover:bg-amber-500 text-blue-100 hover:text-white border border-blue-700 hover:border-amber-500 px-4 py-1.5 transition-all font-medium">
                                {s}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="page-container mt-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {[
                            { value: '500+', label: 'Expert Tutors', icon: GraduationCap },
                            { value: '200+', label: 'Coaching Institutes', icon: Building2 },
                            { value: '10,000+', label: 'Students Helped', icon: Users },
                            { value: '95%', label: 'Success Rate', icon: TrendingUp },
                        ].map(s => (
                            <div key={s.label} className="bg-blue-800 border-2 border-blue-700 p-5 text-center hover:border-amber-500 transition-all">
                                <s.icon size={22} className="text-amber-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold text-white">{s.value}</p>
                                <p className="text-blue-300 text-xs font-medium mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SUBJECTS ── */}
            <section className="py-16 bg-gray-50">
                <div className="page-container">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-blue-900 mb-2">Find Tutors by Subject</h2>
                        <p className="text-gray-500">Search expert tutors for every subject — school, competitive &amp; professional</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Physics', desc: 'Mechanics, Optics, Modern Physics', link: '/tutors?subject=Physics' },
                            { name: 'Chemistry', desc: 'Organic, Inorganic, Physical Chemistry', link: '/tutors?subject=Chemistry' },
                            { name: 'Biology', desc: 'Botany, Zoology, Genetics', link: '/tutors?subject=Biology' },
                            { name: 'Mathematics', desc: 'Calculus, Algebra, Coordinate Geometry', link: '/tutors?subject=Mathematics' },
                            { name: 'English Language', desc: 'Grammar, Writing, Communication', link: '/tutors?subject=English Language' },
                            { name: 'Accountancy', desc: 'Financial Accounting, Taxation', link: '/tutors?subject=Accountancy' },
                            { name: 'Economics', desc: 'Micro, Macro, Statistics', link: '/tutors?subject=Economics' },
                            { name: 'Computer Science', desc: 'Programming, Data Structures', link: '/tutors?subject=Computer Science' },
                        ].map(sub => (
                            <Link key={sub.name} to={sub.link}
                                className="bg-white border-2 border-gray-200 p-5 hover:border-amber-500 hover:bg-amber-50 transition-all group">
                                <h3 className="font-bold text-blue-900 text-base mb-1 group-hover:text-amber-600">{sub.name}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{sub.desc}</p>
                                <p className="text-amber-500 text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Find Tutors →</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── EXAM CATEGORIES ── */}
            <section className="py-16 bg-white">
                <div className="page-container">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-blue-900 mb-2">Prepare for Your Exam</h2>
                        <p className="text-gray-500">Targeted preparation for India's most competitive entrance exams</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: 'IIT-JEE', tag: 'Engineering Entrance',
                                link: '/tutors?subject=Physics',
                                points: ['JEE Mains & Advanced', 'Physics, Chemistry, Mathematics', 'Expert IIT-JEE Tutors Available'],
                                desc: 'Crack IIT-JEE with expert tutors specializing in Physics, Chemistry and Mathematics. Get personalized coaching for JEE Mains and Advanced.'
                            },
                            {
                                name: 'NEET', tag: 'Medical Entrance',
                                link: '/tutors?subject=Biology',
                                points: ['NEET UG & PG Preparation', 'Biology, Chemistry, Physics', 'AIIMS & Top Medical College'],
                                desc: 'Prepare for NEET with verified tutors for Biology, Chemistry and Physics. Get into AIIMS and top medical colleges.'
                            },
                            {
                                name: 'Coaching Institutes', tag: 'Batch Classes',
                                link: '/coachings',
                                points: ['IIT-JEE & NEET Coaching', 'Batch & Individual Classes', 'Top Rated Institutes Listed'],
                                desc: 'Find the best IIT-JEE and NEET coaching institutes in your city. Compare fees, faculty, and results.'
                            },
                        ].map(exam => (
                            <Link key={exam.name} to={exam.link}
                                className="bg-blue-900 text-white p-8 hover:bg-blue-800 transition-all group border-b-4 border-amber-500">
                                <span className="text-xs font-bold uppercase tracking-widest bg-amber-500 text-white px-3 py-1">{exam.tag}</span>
                                <h3 className="text-2xl font-bold mt-4 mb-3 text-white">{exam.name}</h3>
                                <p className="text-blue-200 text-sm mb-4 leading-relaxed">{exam.desc}</p>
                                <ul className="space-y-2 mb-6">
                                    {exam.points.map(p => (
                                        <li key={p} className="flex items-center gap-2 text-sm text-blue-100">
                                            <CheckCircle size={14} className="text-amber-400 shrink-0" /> {p}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center gap-2 font-bold text-sm text-amber-400 group-hover:gap-3 transition-all">
                                    Explore Now <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED TUTORS ── */}
            <section className="py-16 bg-gray-50">
                <div className="page-container">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-1">Top Educators</p>
                            <h2 className="text-3xl font-bold text-blue-900">Featured Tutors</h2>
                        </div>
                        <Link to="/tutors" className="flex items-center gap-1 text-sm font-bold text-blue-900 hover:text-amber-500 transition-colors">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loadingFeatured ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white border-2 border-gray-200 p-6 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                                    <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
                                    <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                                </div>
                            ))
                        ) : featured.length === 0 ? (
                            <div className="col-span-3 text-center py-10 text-gray-400">
                                <GraduationCap size={40} className="mx-auto mb-3 text-gray-300" />
                                <p>No featured tutors yet. <Link to="/register?role=tutor" className="text-blue-900 font-bold hover:text-amber-500">Be the first to register!</Link></p>
                            </div>
                        ) : featured.slice(0, 3).map(profile => (
                            <Link key={profile._id} to={`/tutors/${profile.user._id}`}
                                className="group bg-white border-2 border-gray-200 hover:border-amber-500 transition-all flex flex-col">
                                {/* Header */}
                                <div className="bg-blue-900 p-5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-bold text-white text-lg leading-tight">{profile.user?.name}</h3>
                                            {profile.experience && (
                                                <p className="text-blue-300 text-xs mt-1">{profile.experience} years experience</p>
                                            )}
                                        </div>
                                        {profile.ratings > 0 && (
                                            <span className="flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2 py-1">
                                                <Star size={11} className="fill-white" />{profile.ratings}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Body */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {(profile.subjects || []).slice(0, 3).map(s => (
                                            <span key={s} className="bg-blue-50 text-blue-900 text-xs font-semibold px-2.5 py-1 border border-blue-200">{s}</span>
                                        ))}
                                    </div>
                                    {profile.location && (
                                        <p className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                                            <MapPin size={12} />{profile.location}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-gray-100">
                                        {profile.fees ? (
                                            <p className="font-bold text-blue-900 flex items-center gap-0.5 text-sm">
                                                <IndianRupee size={13} />{profile.fees}
                                                <span className="text-gray-400 font-normal text-xs">/mo</span>
                                            </p>
                                        ) : <span />}
                                        <span className="bg-amber-500 group-hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 transition-colors flex items-center gap-1">
                                            View Profile <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="py-16 bg-white">
                <div className="page-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-900 mb-2">How It Works</h2>
                        <p className="text-gray-500">Find and connect with your ideal tutor in 3 simple steps</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { step: '01', title: 'Search & Filter', desc: 'Search tutors by class, subject, city, and experience. Use smart filters to find the perfect match.', icon: Search },
                            { step: '02', title: 'View Full Profile', desc: 'Check detailed bio, subjects, qualifications, ratings, student reviews, fees, and availability.', icon: BookOpen },
                            { step: '03', title: 'Unlock & Connect', desc: 'Pay a one-time ₹200 fee to unlock the tutor\'s mobile number and connect directly for a demo class.', icon: Phone },
                        ].map((item) => (
                            <div key={item.step} className="text-center border-2 border-gray-200 p-8 hover:border-amber-500 transition-all">
                                <div className="w-14 h-14 bg-blue-900 text-white flex items-center justify-center mx-auto mb-4">
                                    <item.icon size={24} />
                                </div>
                                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Step {item.step}</span>
                                <h3 className="font-bold text-blue-900 text-lg mt-1 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BECOME A TUTOR ── */}
            <section className="py-16 bg-amber-500">
                <div className="page-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <Award size={40} className="text-white mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-3">Are You a Teacher or Tutor?</h2>
                        <p className="text-amber-100 text-lg mb-8">
                            Join IIT-NEET.com and reach thousands of students looking for expert tutors. Register free and get your first year subscription at no cost.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register?role=tutor"
                                className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-4 transition-all text-center">
                                Register as Tutor
                            </Link>
                            <Link to="/register?role=coaching"
                                className="bg-white hover:bg-gray-100 text-blue-900 font-bold px-8 py-4 transition-all text-center border-2 border-white">
                                Register Coaching Institute
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-16 bg-gray-50">
                <div className="page-container">
                    <div className="text-center mb-12">
                        <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-1">Student Success Stories</p>
                        <h2 className="text-3xl font-bold text-blue-900">Real Results, Real Students</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { name: 'Aryan Mehta', exam: 'IIT-JEE 2024 — AIR 342', text: 'Found Dr. Rajesh sir through this platform. His Physics teaching completely changed my approach. Cleared JEE Advanced in first attempt!', rating: 5 },
                            { name: 'Sneha Patel', exam: 'NEET 2024 — 680/720', text: "Priya ma'am's Biology notes and teaching style is unmatched. Got into AIIMS Delhi. Forever grateful!", rating: 5 },
                            { name: 'Rohan Gupta', exam: 'IIT-JEE 2024 — AIR 891', text: 'The platform made it so easy to find a Chemistry tutor in my city. Unlocking contact was worth every rupee.', rating: 5 },
                        ].map((t, i) => (
                            <div key={i} className="bg-white border-2 border-gray-200 p-6 hover:border-amber-500 transition-all">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <Star key={j} size={14} className="text-amber-500 fill-amber-500" />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                                <div className="border-t-2 border-gray-100 pt-4">
                                    <p className="font-bold text-blue-900 text-sm">{t.name}</p>
                                    <p className="text-amber-500 text-xs font-semibold mt-0.5">{t.exam}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 bg-blue-900">
                <div className="page-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-3">Start Your IIT-JEE / NEET Journey Today</h2>
                        <p className="text-blue-200 text-lg mb-8">Join 10,000+ students already preparing with top educators on IIT-NEET.com</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 transition-all text-center">
                                Register Free
                            </Link>
                            <Link to="/tutors" className="border-2 border-white text-white font-bold px-8 py-4 hover:bg-blue-800 transition-all text-center">
                                Browse Tutors
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
