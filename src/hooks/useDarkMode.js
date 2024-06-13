import { enable } from 'aws-amplify/analytics';
import { useState, useEffect } from 'react';
/** Custom Hook - That way we keep with DRY (Don't Repeat Yourself) 
 * Custom Hook is a JavaScript function used to encapsulate and reuse logic across multiple components.
 * . Custom hooks use React's built-in hooks like useState, useEffect, useContext,
 */

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(
        sessionStorage.getItem('darkMode') === 'true'
    );
    const enableDarkMode = () => {
        setDarkMode(true);
        sessionStorage.setItem('darkMode', 'true');
    }
    const disableDarkMode = () => {
        setDarkMode(false);
        sessionStorage.setItem('darkMode', 'false');
    }
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        sessionStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setDarkMode(sessionStorage.getItem('darkMode') === 'true');
        };

        if (sessionStorage.getItem('darkMode') === null) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setDarkMode(darkModeQuery.matches);
            sessionStorage.setItem('darkMode', darkModeQuery.matches ? 'true' : 'false');
        }

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return [darkMode, toggleDarkMode, disableDarkMode, enableDarkMode];
};
