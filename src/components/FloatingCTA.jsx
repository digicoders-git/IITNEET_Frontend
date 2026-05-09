import React from 'react';

const WHATSAPP_NUMBER = '919876543210';
const WHATSAPP_MSG = encodeURIComponent('Hi! I found you on iitneet.com. I want to connect with a tutor.');

const FloatingCTA = () => {
    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
            {/* WhatsApp Button */}
            <div className="relative group flex items-center gap-3">
                <span className="absolute left-16 bg-blue-900 text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                    Chat on WhatsApp
                </span>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-14 h-14 bg-green-600 hover:bg-green-700 flex items-center justify-center shadow-lg transition-all hover:scale-110 overflow-hidden">
                    <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-cover" />
                </a>
            </div>
        </div>
    );
};

export default FloatingCTA;
