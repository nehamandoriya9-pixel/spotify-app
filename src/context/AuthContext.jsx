import { useContext, useMemo, useState } from 'react'
import { createContext } from 'react';


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (email, password) => {
        if (email && password) {
            localStorage.setItem("token", "fake-token");
            setToken("fake-token")
            return true;
        }
        return false;
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null);
    }
    const signup = async (email, password) => {
        if (email && password) {
            localStorage.setItem("token", "fake-token");
            setToken("fake-token")
                return true;
        }
        return false;
    }

    const value = useMemo(() => ({
        token,
        isAuthenticated: !!token,
        login,
        logout,
        signup,
    }), [token])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth = () => useContext(AuthContext);