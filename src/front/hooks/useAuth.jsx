import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //login
    const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(`${backendUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json(); // <-- leer una sola vez

        if (!response.ok) {
            throw new Error(data.message || 'Credenciales incorrectas');
        }

        localStorage.setItem('token', data.access_token);
        setToken(data.access_token);
        setUser(data.user);

        return data;

    } catch (err) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
}, [backendUrl]);

    // Register
    const register = useCallback(async (registerData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error en el registro');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [backendUrl]);

    // Get current user
    const getCurrentUser = useCallback(async () => {
        if (!token) return null;

        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching user');
            }

            const data = await response.json();
            setUser(data);
            return data;
        } catch (err) {
            setError(err.message);
            logout();
        } finally {
            setLoading(false);
        }
    }, [token, backendUrl]);

    // Logout
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setError(null);
    }, []);

    const value = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        getCurrentUser,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
};
