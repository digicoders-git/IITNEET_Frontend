import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                        {/* Header Section */}
                        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 px-8 py-14 text-center">
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
                            <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">
                                Your personal data is completely protected with iitneet. We are committed to transparency and security.
                            </p>
                        </div>

                        {/* Content Section */}
                        <div className="px-8 md:px-12 py-12 prose prose-lg max-w-none text-slate-600 leading-relaxed">
                            <section className="mb-10">
                                <p className="text-lg">
                                    It is our endeavour to provide you this privacy policy in the most clear and transparent form. We want to assure you that your personal data is completely safe with us. Your consent is required when you provide personal data in any form over this site for processing.
                                </p>
                                <p className="mt-4">
                                    You may access our website without registration, but for complete access of our website you must register with us. Please read this privacy policy carefully, because only you can assure me that you completely understand our privacy policy. Whenever we make any changes in our privacy policy we will update this page, so please check back from time to time to ensure that you are happy with any changes.
                                </p>
                            </section>

                            <div className="space-y-12">
                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                        <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">1</span>
                                        Information Collection & Processing
                                    </h2>
                                    <p>
                                        We collect information directly related to you such as <strong>username, age, sex, location, phone number, and email</strong> at the time of registration. This information helps us maintain and operate the functionality of our services effectively.
                                    </p>
                                    <p className="mt-4 text-slate-600">
                                        When you perform a transaction with us, we collect additional information such as credit or debit card numbers, card expiration dates, billing addresses, and details from other payment modes like cheques or money orders.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                        <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                                        Student & Parent Access
                                    </h2>
                                    <p>
                                        If you are a student, parent, or guardian, you may access and collect phone numbers of registered tutors from our website without registration, but only if the tutor's phone number is set to be accessible for all users.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                        <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">3</span>
                                        Third-Party & Social Integration
                                    </h2>
                                    <p>
                                        We may collect information from third parties. When you access our website through a third-party connection like <strong>Facebook Connect, Google Login</strong>, or other similar services, we collect relevant information. We may also collect information from visitors who provide feedback or comment on tutor profiles.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                        <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">4</span>
                                        Advertisers & Institutes
                                    </h2>
                                    <p>
                                        Any person or coaching institute owner interested in advertising with us will provide additional information like address, email, website name, and digital images of the institute (which may include photos of students, buildings, or premises).
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                        <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">5</span>
                                        Data Protection & Security
                                    </h2>
                                    <p>
                                        We employ several security measures to protect your personal data. <strong>Your sensitive financial information (credit/debit card details) is never stored on our servers.</strong> We never pass sensitive information to unauthorized parties. We do not sell, trade, or transfer your information to outside parties.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                        <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">6</span>
                                        Use of Cookies
                                    </h2>
                                    <p>
                                        Cookies are small files used on our website (with your permission) that enable us to recognize your browser and remember certain information to improve your experience.
                                    </p>
                                </section>

                                <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                    <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                                        <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">7</span>
                                        Children’s Online Privacy
                                    </h2>
                                    <p className="text-blue-800">
                                        Our website strictly follows children’s online privacy protection rules. We do not knowingly collect or disclose any personal information from children under 13 years of age.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;

