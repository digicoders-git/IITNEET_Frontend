import React from 'react';
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
import TutorDashboard from './pages/tutor/TutorDashboard';
import TutorProfile from './pages/tutor/TutorProfile';
import TutorSubscription from './pages/tutor/TutorSubscription';
import CoachingDashboard from './pages/coaching/CoachingDashboard';
import CoachingDetails from './pages/coaching/CoachingDetails';
import CoachingSubscription from './pages/coaching/CoachingSubscription';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import DashboardLayout from './components/DashboardLayout';
import TutorListing from './pages/public/TutorListing';
import TutorPublicProfile from './pages/public/TutorPublicProfile';
import CoachingListing from './pages/public/CoachingListing';
import CoachingPublicProfile from './pages/public/CoachingPublicProfile';
import ContactPage from './pages/public/ContactPage';
import FloatingCTA from './components/FloatingCTA';



const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div></div>;
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
    return children;
};

const AppContent = () => {
    const location = useLocation();
    const { user } = useAuth();
    const isDashboard = ['/admin', '/tutor', '/coaching'].some(p => location.pathname.startsWith(p));


    return (
        <>
            {!isDashboard && <FloatingCTA />}
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


