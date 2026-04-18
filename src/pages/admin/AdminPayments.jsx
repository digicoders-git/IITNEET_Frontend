import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, IndianRupee, TrendingUp, Users } from 'lucide-react';

const AdminPayments = () => {
    const { user } = useAuth();
    const [unlocks, setUnlocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Admin sees all unlocks - for now using mock since no admin-level unlock endpoint
        setLoading(false);
    }, []);

    const stats = [
        { label: 'Total Revenue', value: '₹0', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Contact Unlocks', value: '0', icon: CreditCard, color: 'text-violet-600', bg: 'bg-violet-50' },
        { label: 'Active Subscriptions', value: '0', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Paying Users', value: '0', icon: Users, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Payments</h2>
                <p className="text-slate-500 font-medium text-sm mt-1">Revenue from subscriptions and contact unlocks</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                            <stat.icon size={22} />
                        </div>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                        <h2 className="text-2xl font-black text-slate-900">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h3 className="font-black text-slate-900 mb-6">Recent Transactions</h3>
                <div className="text-center py-12 text-slate-400">
                    <CreditCard size={40} className="mx-auto mb-3 text-slate-300" />
                    <p className="font-medium">No transactions yet.</p>
                    <p className="text-sm mt-1">Contact unlocks and subscription payments will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminPayments;


