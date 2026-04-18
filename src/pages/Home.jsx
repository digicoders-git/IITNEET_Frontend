import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {
    GraduationCap, Building2, ArrowRight,
    Star, MapPin, Clock, IndianRupee, Search,
    CheckCircle2, Users, Award, TrendingUp, ChevronRight,
    FlaskConical, Calculator, Microscope, Atom
} from 'lucide-react';

const testimonials = [
    { name: 'Aryan Mehta', exam: 'IIT-JEE 2024 — AIR 342', text: 'Found Dr. Rajesh sir through this platform. His Physics teaching completely changed my approach. Cleared JEE Advanced in first attempt!', rating: 5 },
    { name: 'Sneha Patel', exam: 'NEET 2024 — 680/720', text: 'Priya ma\'am\'s Biology notes and teaching style is unmatched. Got into AIIMS Delhi. Forever grateful!', rating: 5 },
    { name: 'Rohan Gupta', exam: 'IIT-JEE 2024 — AIR 891', text: 'The platform made it so easy to find a Chemistry tutor in my city. Unlocking contact was worth every rupee.', rating: 5 },
];

const Home = () => {
    const [search, setSearch] = useState('');
    const [featured, setFeatured] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);

    useEffect(() => {
        axios.get('$env:VITE_API_URL/api/profiles/featured')
            .then(res => setFeatured(res.data))
            .catch(() => {})
            .finally(() => setLoadingFeatured(false));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = `/tutors?search=${search}`;
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-900">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://resourceondemand.com/wp-content/uploads/2018/09/coaching-ROD.jpg"
                        alt=""
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-750/70 via-indigo-700/65 to-violet-700/70"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                <div className="relative page-container text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                        <Award size={14} className="text-amber-400" />
                        India's Most Trusted IIT-JEE & NEET Platform
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Crack <span className="text-amber-400">IIT-JEE</span> &{' '}
                        <span className="text-emerald-400">NEET</span> with<br />
                        Expert Guidance
                    </h1>
                    <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Connect with verified tutors and top coaching institutes. Get personalized mentorship for your dream college.
                    </p>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                className="w-full pl-11 pr-4 py-4 rounded-xl bg-white text-slate-800 outline-none text-base shadow-xl placeholder:text-slate-400"
                                placeholder="Search by subject, tutor name, or location..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-8 py-4 rounded-xl transition-all shadow-xl text-base whitespace-nowrap">
                            Find Tutors
                        </button>
                    </form>

                    {/* Quick links */}
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                        {['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Organic Chemistry'].map(s => (
                            <Link key={s} to={`/tutors?subject=${s}`}
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-1.5 rounded-full transition-all">
                                {s}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Stats bar */}
                <div className="relative page-container mt-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {[
                            { value: '500+', label: 'Expert Tutors', icon: GraduationCap },
                            { value: '200+', label: 'Coaching Institutes', icon: Building2 },
                            { value: '10,000+', label: 'Students Helped', icon: Users },
                            { value: '95%', label: 'Success Rate', icon: TrendingUp },
                        ].map(s => (
                            <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 cursor-default">
                                <s.icon size={20} className="text-amber-400 mx-auto mb-2" />
                                <p className="text-2xl font-black text-white">{s.value}</p>
                                <p className="text-blue-300 text-xs font-medium mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SUBJECTS ── */}
            <section className="py-16 bg-slate-50">
                <div className="page-container">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Explore by Subject</h2>
                        <p className="text-slate-500">Find specialized tutors for every subject you need</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Physics', icon: Atom, color: 'bg-blue-50 text-blue-600 border-blue-100', link: '/tutors?subject=Physics', desc: 'Mechanics, Optics, Modern Physics' },
                            { name: 'Chemistry', icon: FlaskConical, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', link: '/tutors?subject=Chemistry', desc: 'Organic, Inorganic, Physical' },
                            { name: 'Biology', icon: Microscope, color: 'bg-rose-50 text-rose-600 border-rose-100', link: '/tutors?subject=Biology', desc: 'Botany, Zoology, Genetics' },
                            { name: 'Mathematics', icon: Calculator, color: 'bg-violet-50 text-violet-600 border-violet-100', link: '/tutors?subject=Mathematics', desc: 'Calculus, Algebra, Coordinate' },
                        ].map(sub => (
                            <Link key={sub.name} to={sub.link}
                                className={`border-2 ${sub.color} rounded-2xl p-6 hover:shadow-lg transition-all group`}>
                                <sub.icon size={32} className="mb-3" />
                                <h3 className="font-black text-slate-900 text-lg mb-1">{sub.name}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{sub.desc}</p>
                                <div className="flex items-center gap-1 mt-3 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Find Tutors <ChevronRight size={12} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── EXAM CATEGORIES ── */}
            <section className="py-16 bg-white">
                <div className="page-container">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Prepare for Your Exam</h2>
                        <p className="text-slate-500">Targeted preparation for India's toughest entrance exams</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                name: 'IIT-JEE', tag: 'Engineering', color: 'from-blue-600/90 to-indigo-700/90',
                                link: '/tutors?subject=Physics',
                                points: ['JEE Mains & Advanced', 'Physics, Chemistry, Maths', '1200+ Tutors Available'],
                            },
                            {
                                name: 'NEET', tag: 'Medical', color: 'from-emerald-600/90 to-teal-700/90',
                                link: '/tutors?subject=Biology',
                                points: ['NEET UG & PG', 'Biology, Chemistry, Physics', '800+ Tutors Available'],
                            },
                            {
                                name: 'Coaching', tag: 'Institutes', color: 'from-violet-600/90 to-purple-700/90',
                                link: '/coachings',
                                points: ['Top Rated Institutes', 'Batch & Individual Classes', '200+ Institutes Listed'],
                            },
                        ].map(exam => (
                            <Link key={exam.name} to={exam.link}
                                className={`relative bg-gradient-to-br ${exam.color} text-white rounded-2xl p-8 hover:scale-[1.02] transition-transform shadow-lg group overflow-hidden`}>
                                <div className="absolute inset-0">
                                    <img src="scholar.jpg" alt="" className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                                </div>
                                <div className="relative z-10">
                                <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">{exam.tag}</span>
                                <h3 className="text-3xl font-black mt-4 mb-4">{exam.name}</h3>
                                <ul className="space-y-2 mb-6">
                                    {exam.points.map(p => (
                                        <li key={p} className="flex items-center gap-2 text-sm text-white/90">
                                            <CheckCircle2 size={14} className="text-white/70 shrink-0" /> {p}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all">
                                    Explore Now <ArrowRight size={16} />
                                </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED TUTORS ── */}
            <section className="py-16 bg-slate-50">
                <div className="page-container">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-1">Top Educators</p>
                            <h2 className="text-3xl font-black text-slate-900">Featured Tutors</h2>
                        </div>
                        <Link to="/tutors" className="flex items-center gap-1 text-sm font-bold text-violet-600 hover:underline">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loadingFeatured ? (
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
                                    <div className="h-24 bg-slate-200"></div>
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))
                        ) : featured.map(profile => (
                            <Link key={profile._id} to={`/tutors/${profile.user._id}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 flex flex-col">

                                {/* Full image area */}
                                <div className="relative h-48 overflow-hidden bg-slate-200">
                                    <img
                                        src={profile?.profileImage
                                            ? `$env:VITE_API_URL${profile.profileImage}`
                                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user?.name)}&size=300&background=e0e7ff&color=3730a3&bold=true`}
                                        alt={profile.user?.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Dark gradient bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                                    {/* Name on image */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="font-black text-white text-lg leading-tight">{profile.user?.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            {profile.ratings > 0 && (
                                                <span className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                                    <Star size={11} className="fill-amber-400" />{profile.ratings}
                                                </span>
                                            )}
                                            {profile.experience && (
                                                <span className="text-white/70 text-xs">{profile.experience} yrs exp</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Featured badge */}
                                    {profile.user.subscriptionStatus === 'active' && (
                                        <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                                            ⭐ Featured
                                        </span>
                                    )}
                                </div>

                                {/* Card body */}
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {(profile.subjects || []).slice(0, 3).map(s => (
                                            <span key={s} className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">{s}</span>
                                        ))}
                                    </div>
                                    {profile.location && (
                                        <p className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                                            <MapPin size={12} />{profile.location}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                                        {profile.fees ? (
                                            <p className="font-black text-slate-900 flex items-center gap-0.5">
                                                <IndianRupee size={13} />{profile.fees}
                                                <span className="text-slate-400 font-normal text-xs">/mo</span>
                                            </p>
                                        ) : <span />}
                                        <span className="bg-indigo-600 group-hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1">
                                            View <ArrowRight size={12} />
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
                        <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-1">Simple Process</p>
                        <h2 className="text-3xl font-black text-slate-900">How It Works</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { step: '01', title: 'Search & Filter', desc: 'Search tutors by subject, location, experience, and fees. Use smart filters to narrow down.', icon: Search },
                            { step: '02', title: 'View Full Profile', desc: 'Check detailed bio, subjects, ratings, student reviews, and fee structure before deciding.', icon: GraduationCap },
                            { step: '03', title: 'Unlock & Connect', desc: 'Pay a one-time ₹200 fee to unlock the tutor\'s contact number and connect directly.', icon: CheckCircle2 },
                        ].map((item, i) => (
                            <div key={item.step} className="relative text-center">
                                {i < 2 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-dashed border-t-2 border-dashed border-slate-200"></div>}
                                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                                    <item.icon size={24} />
                                </div>
                                <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Step {item.step}</span>
                                <h3 className="font-black text-slate-900 text-lg mt-1 mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-16 bg-gradient-to-br from-blue-950 to-indigo-900">
                <div className="page-container">
                    <div className="text-center mb-12">
                        <p className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-1">Student Success</p>
                        <h2 className="text-3xl font-black text-white">Real Results, Real Students</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-blue-100 text-sm leading-relaxed mb-5">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&size=40&background=1e3a5f&color=93c5fd&bold=true&rounded=true`}
                                        alt={t.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-bold text-white text-sm">{t.name}</p>
                                        <p className="text-emerald-400 text-xs font-bold">{t.exam}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 bg-white">
                <div className="page-container">
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-black text-white mb-2">Start Your Journey Today</h2>
                            <p className="text-indigo-200 text-lg">Join 10,000+ students already preparing with top educators.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <Link to="/register" className="bg-white text-indigo-700 font-black px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all text-center shadow-xl">
                                Register Free
                            </Link>
                            <Link to="/tutors" className="border-2 border-white/40 text-white font-black px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-center">
                                Browse Tutors
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bg-slate-900 text-slate-400 pt-12 pb-6">
                <div className="page-container">
                    <div className="grid md:grid-cols-4 gap-8 mb-10">
                        <div>
                            <div className="mb-4">
                                <img src="/iitneet_logo.png" alt="IIT-NEET" className="h-10 w-auto" />
                            </div>
                            <p className="text-sm leading-relaxed">India's trusted platform for IIT-JEE and NEET preparation. Connect with verified educators.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">For Students</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/tutors" className="hover:text-white transition-colors">Find Tutors</Link></li>
                                <li><Link to="/coachings" className="hover:text-white transition-colors">Coaching Institutes</Link></li>
                                <li><Link to="/register" className="hover:text-white transition-colors">Register Free</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">For Educators</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/register" className="hover:text-white transition-colors">Join as Tutor</Link></li>
                                <li><Link to="/register" className="hover:text-white transition-colors">List Your Institute</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
                        <p>© 2026 IIT-NEET Platform. Made by <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-white transition-colors font-bold">#digicoders</a></p>
                        <div className="flex gap-6">
                            <Link to="/tutors" className="hover:text-white transition-colors">Tutors</Link>
                            <Link to="/coachings" className="hover:text-white transition-colors">Institutes</Link>
                            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;

