import React, { createContext, useState, useEffect } from 'react';
import api from '../api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                // Verify if token is expired before calling API
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    throw new Error('Token expired');
                }
                const response = await api.get('auth/me/');
                setUser(response.data);
            } catch (error) {
                // api interceptor might try to refresh, if it fails user is logged out
                if (error.message === 'Token expired') {
                     // The interceptor doesn't catch manual token decode checks, 
                     // so just let the interceptor handle 401s on actual requests.
                     // Actually, we'll just fetch user data directly, and if it's 401,
                     // interceptor handles refresh. If it fully fails, user is null.
                }
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (username, password) => {
        const response = await api.post('auth/login/', { username, password });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        await checkAuth();
    };

    const register = async (username, email, password, role) => {
        await api.post('auth/register/', { username, email, password, role });
        await login(username, password);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
