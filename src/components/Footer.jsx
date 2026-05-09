import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-blue-200 pt-12 pb-6">
            <div className="page-container">
                <div className="grid md:grid-cols-4 gap-8 mb-10">
                    <div>
                        <div className="mb-4">
                            <img 
                                src="/logo.png" 
                                alt="iitneet.com Logo" 
                                className="h-10 w-auto mb-6 brightness-0 invert"
                            />
                            <p className="text-blue-300 text-sm leading-relaxed mb-8">
                                iitneet.com is India's most trusted platform connecting students with expert home tutors and coaching institutes for IIT-JEE, NEET, and academic excellence.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">For Students</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/tutors" className="hover:text-amber-400 transition-colors">Find Tutors</Link></li>
                            <li><Link to="/coachings" className="hover:text-amber-400 transition-colors">Advertisers</Link></li>
                            <li><Link to="/register" className="hover:text-amber-400 transition-colors">Register </Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">For Educators</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/register?role=tutor" className="hover:text-amber-400 transition-colors">Join as Tutor</Link></li>
                            <li><Link to="/register?role=coaching" className="hover:text-amber-400 transition-colors">List as Advertiser</Link></li>
                            <li><Link to="/advertising" className="hover:text-amber-400 transition-colors">Advertise With Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Help & Policies</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
                            <li><Link to="/pricing" className="hover:text-amber-400 transition-colors">Pricing</Link></li>
                            <li><Link to="/refund-policy" className="hover:text-amber-400 transition-colors">Refund Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-amber-400 transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
                    <p><span className="text-white font-semibold">&copy;</span> 2026 iitneet.com — Made by <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-white transition-colors font-bold">#digicoders</a></p>
                    <div className="flex gap-6">
                        <Link to="/tutors" className="hover:text-amber-400 transition-colors">Tutors</Link>
                        <Link to="/coachings" className="hover:text-amber-400 transition-colors">Advertisers</Link>
                        <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
