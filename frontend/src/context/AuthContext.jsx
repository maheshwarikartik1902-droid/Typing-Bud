import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null);
    const [token, setToken]     = useState(null);
    const [loading, setLoading] = useState(true);
    const refreshTimerRef       = useRef(null);

    const scheduleRefresh = (ms = 14 * 60 * 1000) => {
        clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = setTimeout(refreshAccessToken, ms);
    };

    const refreshAccessToken = async () => {
        try {
            const res = await fetch(`${API}/auth/refresh-token`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!res.ok) { logout(); return null; }
            const data = await res.json();
            setToken(data.accessToken);
            scheduleRefresh();
            return data.accessToken;
        } catch {
            logout();
            return null;
        }
    };

    // on mount — restore session via refresh token cookie
    useEffect(() => {
        refreshAccessToken().finally(() => setLoading(false));
        return () => clearTimeout(refreshTimerRef.current);
    }, []);

    // fetch user whenever token changes
    useEffect(() => {
        if (!token) return;
        fetch(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
            credentials: 'include',
        })
            .then(r => r.json())
            .then(data => setUser(data))
            .catch(() => logout());
    }, [token]);

    const register = async (username, email, password) => {
        const res = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setToken(data.accessToken);
        setUser(data.user);
        scheduleRefresh();
    };

    const login = async (email, password) => {
        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setToken(data.accessToken);
        setUser(data.user);
        scheduleRefresh();
    };

    const logout = async () => {
        try {
            await fetch(`${API}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch { /* ignore */ }
        setToken(null);
        setUser(null);
        clearTimeout(refreshTimerRef.current);
    };

    const saveResult = async (result) => {
        if (!token) return;
        try {
            await fetch(`${API}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify(result),
            });
        } catch (err) {
            console.error('Failed to save result:', err);
        }
    };

    return (
        <AuthContext.Provider value={{
            user, token, loading,
            login, register, logout, saveResult,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);