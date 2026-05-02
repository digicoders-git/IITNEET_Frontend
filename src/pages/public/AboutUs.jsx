import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-blue-900 px-8 py-10 text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-white">About Us</h1>
                            <p className="mt-2 text-blue-200">Welcome to iitneet.com!</p>
                        </div>
                        <div className="px-8 py-12 prose prose-lg max-w-none text-slate-600 leading-relaxed">
                            <p>
                                IIT and NEET are two prestigious names which are responsible for conducting examinations 
                                in the fields of engineering and medical respectively. Mr. Kamal Kishore Verma, proprietor of 
                                this website, aims to provide quality tutors and information about coaching institutes to 
                                students and their parents in nearby areas.
                            </p>
                            <p>
                                iitneet.com is a platform where students can search and find their best tutor for academic 
                                and competitive examinations. The sole aim of launching this website is to provide quality 
                                education to our students through quality tutors.
                            </p>
                            <p>
                                This website also provides a space where educational institutions can advertise themselves to 
                                attract students. Contact numbers will be available for most tutors directly to students 
                                and their parents. It is often quite difficult for students and parents to find a good tutor 
                                for academic and competitive examinations, but iitneet.com will definitely help students 
                                achieve their goals.
                            </p>
                            <p>
                                We believe that quality education for early child care is crucial, and parents are often 
                                worried about their children's schooling and finding a tutor who can teach them at home. 
                                This site endeavors to help them find the best tutor for their child.
                            </p>
                            <p>
                                Tutors expert in any particular subject will have the option to highlight their expertise 
                                so they can receive more attention. We advise students and parents to always show respect 
                                to tutors during communication or when they visit for a demo class.
                            </p>
                            <p>
                                This website also assists coaching institute owners who are dedicated to nurturing the 
                                future of students. They can advertise and popularize their institutes by sharing information 
                                on this platform, allowing interested students and parents to contact them directly via the 
                                details provided.
                            </p>
                            <p>
                                Finally, I hope that students, parents, and coaching institute owners will find this 
                                website helpful in achieving their goals.
                            </p>
                            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                                <p className="font-bold text-blue-900 text-xl">Thank You and Good Luck!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
