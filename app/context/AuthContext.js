import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = (email, password) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            // Mock user data
            const mockUser = {
                id: '1',
                name: 'Farmer John', // Default name if not provided
                email: email,
            };
            setUser(mockUser);
            setIsLoading(false);
        }, 1000);
    };

    const signup = (name, email, password) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
            };
            setUser(newUser);
            setIsLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (newData) => {
        setUser((prevUser) => ({ ...prevUser, ...newData }));
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
