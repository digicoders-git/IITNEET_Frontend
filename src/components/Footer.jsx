import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
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
    );
};

export default Footer;

