import React from 'react';
import { LayoutGrid, Users, MapPin, CreditCard, Sparkles, Plus, GraduationCap, ChevronRight } from 'lucide-react';

const CoachingDashboard = () => {
    const stats = [
        { label: 'Active Courses', value: '8', icon: LayoutGrid, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Total Students', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Branch Location', value: 'Remote', icon: MapPin, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Listing Plan', value: 'Premium', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50' },
    ];

    const courses = [
        { name: 'IIT-JEE Advanced 2026', faculty: 'Dr. S. Verma', enrollment: '45 Students' },
        { name: 'NEET Crash Course', faculty: 'Dr. Anjali (MBBS)', enrollment: '79 Students' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group border-b-4 border-b-transparent hover:border-b-violet-500">
                        <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={26} />
                        </div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="grid xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Active Programs</h3>
                            <p className="text-slate-500 text-sm font-medium">Manage your classroom and online batches</p>
                        </div>
                        <button className="btn btn-primary px-5 py-2.5 rounded-2xl shadow-xl shadow-violet-200 flex items-center gap-2 text-sm">
                            <Plus size={18} /> New Batch
                        </button>
                    </div>

                    <div className="space-y-4">
                        {courses.map((course, i) => (
                            <div key={i} className="group p-6 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-violet-100 hover:shadow-xl transition-all cursor-pointer flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-violet-600">
                                        <GraduationCap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-violet-600 transition-colors">{course.name}</h4>
                                        <p className="text-slate-500 text-sm font-medium">Faculty: {course.faculty}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-slate-400 text-xs font-bold uppercase mb-0.5">Students</p>
                                        <p className="font-bold text-slate-700">{course.enrollment}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-8">Financial Overview</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium text-sm">Listing Status</span>
                                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-emerald-500/20">Active</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-medium text-sm">Yearly Payout</span>
                                    <span className="font-black">₹2,000.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20">
                            <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors">Manage Payments</button>
                            <p className="text-[10px] text-slate-500 text-center mt-3 font-medium uppercase tracking-widest">Next Due: Aug 24th, 2026</p>
                        </div>
                    </div>
                    {/* Background Glow */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-600/20 blur-3xl rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default CoachingDashboard;

