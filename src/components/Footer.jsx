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
                                alt="IIT-NEET.com Logo" 
                                className="h-8 w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-sm leading-relaxed">India's trusted platform for IIT-JEE and NEET preparation. Find verified tutors and top coaching institutes near you.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">For Students</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/tutors" className="hover:text-amber-400 transition-colors">Find Tutors</Link></li>
                            <li><Link to="/coachings" className="hover:text-amber-400 transition-colors">Coaching Institutes</Link></li>
                            <li><Link to="/register" className="hover:text-amber-400 transition-colors">Register Free</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">For Educators</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/register?role=tutor" className="hover:text-amber-400 transition-colors">Join as Tutor</Link></li>
                            <li><Link to="/register?role=coaching" className="hover:text-amber-400 transition-colors">List Your Institute</Link></li>
                            <li><Link to="/advertising" className="hover:text-amber-400 transition-colors">Advertise With Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Help & Support</Link></li>
                            <li><Link to="/advertising" className="hover:text-amber-400 transition-colors">Advertising</Link></li>
                            <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
                    <p>© 2026 IIT-NEET.com — Made by <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-white transition-colors font-bold">#digicoders</a></p>
                    <div className="flex gap-6">
                        <Link to="/tutors" className="hover:text-amber-400 transition-colors">Tutors</Link>
                        <Link to="/coachings" className="hover:text-amber-400 transition-colors">Institutes</Link>
                        <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
