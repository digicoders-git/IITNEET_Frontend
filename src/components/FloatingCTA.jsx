import React from 'react';
import { Phone } from 'lucide-react';

const WHATSAPP_NUMBER = '919876543210';
const CALL_NUMBER = '+919876543210';
const WHATSAPP_MSG = encodeURIComponent('Hi! I found you on IIT-NEET platform. I want to connect with a tutor.');

const FloatingCTA = () => {
    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">

            {/* Call Button */}
            <div className="relative group flex items-center gap-3">
                <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-lg">
                    Call Us Now
                </span>
                <a
                    href={`tel:${CALL_NUMBER}`}
                    className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 animate-wiggle"
                >
                    <Phone size={24} className="text-white" />
                </a>
            </div>

            {/* WhatsApp Button */}
            <div className="relative group flex items-center gap-3">
                <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-lg">
                    Chat on WhatsApp
                </span>
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 animate-wiggle overflow-hidden"
                    style={{ animationDelay: '0.3s' }}
                >
                    <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-cover" />
                </a>
                {/* Ping ring */}
                <span className="absolute w-14 h-14 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none" />
            </div>

        </div>
    );
};

export default FloatingCTA;

