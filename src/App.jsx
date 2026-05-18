import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import AdminCoachings from './pages/admin/AdminCoachings';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import AdminAds from './pages/admin/AdminAds';
import AdminPhotoApprovals from './pages/admin/AdminPhotoApprovals';
import TutorDashboard from './pages/tutor/TutorDashboard';
import TutorProfile from './pages/tutor/TutorProfile';
import TutorSubscription from './pages/tutor/TutorSubscription';
import CoachingDashboard from './pages/coaching/CoachingDashboard';
import CoachingDetails from './pages/coaching/CoachingDetails';
import CoachingSubscription from './pages/coaching/CoachingSubscription';
import CoachingAds from './pages/coaching/CoachingAds';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import DashboardLayout from './components/DashboardLayout';
import TutorListing from './pages/public/TutorListing';
import TutorPublicProfile from './pages/public/TutorPublicProfile';
import CoachingListing from './pages/public/CoachingListing';
import CoachingPublicProfile from './pages/public/CoachingPublicProfile';
import ContactPage from './pages/public/ContactPage';
import AdvertisingPage from './pages/public/AdvertisingPage';
import AboutUs from './pages/public/AboutUs';
import Pricing from './pages/public/Pricing';
import RefundPolicy from './pages/public/RefundPolicy';
import TermsAndConditions from './pages/public/TermsAndConditions';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Help from './pages/public/Help';



const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, allUsers, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div></div>;
    
    if (allowedRoles && Array.isArray(allowedRoles)) {
        const hasRole = allowedRoles.some(role => allUsers && allUsers[role]);
        if (!hasRole) return <Navigate to="/login" />;
        return children;
    }

    if (!user && (!allUsers || !Object.values(allUsers).some(Boolean))) return <Navigate to="/login" />;
    return children;
};

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
    return null;
};

const AppContent = () => {
    const location = useLocation();
    const { updateActiveUserForPath } = useAuth();
    
    useEffect(() => {
        if (updateActiveUserForPath) {
            updateActiveUserForPath(location.pathname);
        }
    }, [location.pathname]);
    
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tutors" element={<TutorListing />} />
                <Route path="/tutors/:userId" element={<TutorPublicProfile />} />
                <Route path="/coachings" element={<CoachingListing />} />
                <Route path="/coachings/:userId" element={<CoachingPublicProfile />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/advertising" element={<AdvertisingPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/pricing" element={<Navigate to="/help" replace />} />
                <Route path="/faq" element={<Navigate to="/help" replace />} />
                <Route path="/help" element={<Help />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />

                {/* Admin Routes */}
                <Route path="/admin/*" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <DashboardLayout role="admin">
                            <Routes>
                                <Route path="/" element={<AdminDashboard />} />
                                <Route path="/users" element={<UserManagement />} />
                                <Route path="/coachings" element={<AdminCoachings />} />
                                <Route path="/payments" element={<AdminPayments />} />
                                <Route path="/subscriptions" element={<AdminSubscriptions />} />
                                <Route path="/ads" element={<AdminAds />} />
                                <Route path="/photo-approvals" element={<AdminPhotoApprovals />} />
                            </Routes>
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* Tutor Routes */}
                <Route path="/tutor/*" element={
                    <ProtectedRoute allowedRoles={['tutor']}>
                        <DashboardLayout role="tutor">
                            <Routes>
                                <Route path="/" element={<TutorDashboard />} />
                                <Route path="/profile" element={<TutorProfile />} />
                                <Route path="/subscription" element={<TutorSubscription />} />
                            </Routes>
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* Coaching Routes */}
                <Route path="/coaching/*" element={
                    <ProtectedRoute allowedRoles={['coaching']}>
                        <DashboardLayout role="coaching">
                            <Routes>
                                <Route path="/" element={<CoachingDashboard />} />
                                <Route path="/details" element={<CoachingDetails />} />
                                <Route path="/subscription" element={<CoachingSubscription />} />
                                <Route path="/ads" element={<CoachingAds />} />
                            </Routes>
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* Student Routes */}
                <Route path="/student" element={
                    <ProtectedRoute allowedRoles={['student']}>
                        <Navigate to="/student/profile" />
                    </ProtectedRoute>
                } />
                <Route path="/student/profile" element={
                    <ProtectedRoute allowedRoles={['student']}>
                        <StudentProfile />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;


