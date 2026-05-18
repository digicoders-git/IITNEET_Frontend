import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState({ admin: null, tutor: null, coaching: null, student: null });
    const [loading, setLoading] = useState(true);

    const getActiveRoleFromPath = (pathname) => {
        const path = pathname || window.location.pathname;
        if (path.startsWith('/admin')) return 'admin';
        if (path.startsWith('/tutor')) return 'tutor';
        if (path.startsWith('/coaching')) return 'coaching';
        if (path.startsWith('/student')) return 'student';
        return null;
    };

    useEffect(() => {
        // Migrate legacy 'user' key if present
        const legacyUser = localStorage.getItem('user');
        if (legacyUser) {
            try {
                const parsed = JSON.parse(legacyUser);
                if (parsed && parsed.role) {
                    localStorage.setItem(`user_${parsed.role}`, legacyUser);
                }
            } catch(e) {}
            localStorage.removeItem('user');
        }

        const roles = ['admin', 'tutor', 'coaching', 'student'];
        const loadedUsers = { admin: null, tutor: null, coaching: null, student: null };
        const promises = [];

        roles.forEach(role => {
            const stored = localStorage.getItem(`user_${role}`);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    const p = axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${parsed.token}` }
                    }).then(res => {
                        loadedUsers[role] = { ...parsed, ...res.data };
                    }).catch(() => {
                        localStorage.removeItem(`user_${role}`);
                    });
                    promises.push(p);
                } catch (e) {
                    localStorage.removeItem(`user_${role}`);
                }
            }
        });

        Promise.all(promises).finally(() => {
            setAllUsers(loadedUsers);
            const activeRole = getActiveRoleFromPath();
            if (activeRole && loadedUsers[activeRole]) {
                setUser(loadedUsers[activeRole]);
            } else {
                setUser(loadedUsers.student || loadedUsers.tutor || loadedUsers.coaching || loadedUsers.admin || null);
            }
            setLoading(false);
        });
    }, []);

    const updateActiveUserForPath = (path) => {
        const active = getActiveRoleFromPath(path);
        setAllUsers(currentAll => {
            if (active && currentAll[active]) {
                setUser(currentAll[active]);
            } else {
                setUser(currentAll.student || currentAll.tutor || currentAll.coaching || currentAll.admin || null);
            }
            return currentAll;
        });
    };

    const login = (userData) => {
        const role = userData.role;
        localStorage.setItem(`user_${role}`, JSON.stringify(userData));
        setAllUsers(prev => ({ ...prev, [role]: userData }));
        setUser(userData);
    };

    const logout = (specificRole) => {
        const roleToLogout = specificRole || getActiveRoleFromPath();
        if (roleToLogout) {
            localStorage.removeItem(`user_${roleToLogout}`);
            setAllUsers(prev => {
                const updated = { ...prev, [roleToLogout]: null };
                const active = getActiveRoleFromPath();
                if (active && updated[active]) setUser(updated[active]);
                else setUser(updated.student || updated.tutor || updated.coaching || updated.admin || null);
                return updated;
            });
        } else {
            ['admin', 'tutor', 'coaching', 'student'].forEach(r => localStorage.removeItem(`user_${r}`));
            setAllUsers({ admin: null, tutor: null, coaching: null, student: null });
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, allUsers, login, logout, loading, updateActiveUserForPath }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);




