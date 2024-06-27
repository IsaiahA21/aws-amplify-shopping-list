// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser, fetchUserAttributes } from 'aws-amplify/auth';//https://ui.docs.amplify.aws/react/getting-started/migration

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const user = await fetchUserAttributes();
                setIsAuthenticated(true);
                setCurrentUser(user);
                console.log(user)

            } catch (error) {
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, setIsAuthenticated, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
