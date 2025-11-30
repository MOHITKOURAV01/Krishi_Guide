import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = (email, password) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            // Extract name from email (part before @)
            const emailName = email.split('@')[0];
            // Capitalize first letter and replace dots/underscores with spaces
            const formattedName = emailName
                .replace(/[._]/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Mock user data
            const mockUser = {
                id: '1',
                name: formattedName, // Name extracted from email
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
