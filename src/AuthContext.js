// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';//https://ui.docs.amplify.aws/react/getting-started/migration
import { signOut } from 'aws-amplify/auth';
import { deleteUser } from 'aws-amplify/auth';

/**
 * AuthContext  provides a way to share authentication state and user information across different components
 */
const AuthContext = createContext(); // createContext(). This Obejct holds the authentication state and user information.

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
    // Because localStorage persists across page reloads, isAuthenticated
    // will retain its value even if the user refreshes the page or closes and reopens the browser.
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // checkAuthStatus calls fetchUserAttributes() from AWS Amplify to check if the user is authenticated.
        const checkAuthStatus = async () => {
            try {
                const user = await fetchUserAttributes();
                localStorage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);
                setCurrentUser(user);
                // console.log(user)

            } catch (error) {
                localStorage.setItem('isAuthenticated', 'false');
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        };

        checkAuthStatus();
    }, []);
    async function AuthHandleSignOut() {
        try {
            await signOut();
            localStorage.setItem('isAuthenticated', 'false');
            setIsAuthenticated(false);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
    async function AuthLogin(guestUser) {
        if (guestUser === true) {
            // don't fetch user attributes
            setIsAuthenticated(false);
            setCurrentUser(null);
        } else {
            // checkAuthStatus();
        }
    }
    const DeleteUser = async () => {
        try {
            await deleteUser(); // 'aws-amplify/auth deleteUser function
            localStorage.setItem('isAuthenticated', 'false');
            setIsAuthenticated(false);
            setCurrentUser(null);
            return "SUCCESS";
        } catch (error) {
            console.log(error);
            return "FAILURE";
        }
    };

    return (
        //AuthProvider is a component that wraps around other components to provide them with authentication context.
        <AuthContext.Provider value={{ isAuthenticated, currentUser, setIsAuthenticated, setCurrentUser, AuthHandleSignOut, DeleteUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); //useAuth is a custom hook that allows components to access the authentication context.
