import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    defaultDarkModeOverride,
    ThemeProvider,
    Card,
    Text,
    ToggleButton,
    ToggleButtonGroup,
} from '@aws-amplify/ui-react';

const ShoppingList = () => {
    const [darkMode, setDarkMode] = useState(
        sessionStorage.getItem('darkMode') === 'true',
    );

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        sessionStorage.setItem('darkMode', newDarkMode ? 'true' : 'false'); // Store darkMode in sessionStorage
        console.log(newDarkMode)
        console.log(sessionStorage.getItem('darkMode'));
    }

    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
    };
    // Update darkMode state when sessionStorage item changes
    useEffect(() => {
        const handleStorageChange = () => {
            setDarkMode(sessionStorage.getItem('darkMode') === 'true');
        };
        console.log("useffect" + sessionStorage.getItem('darkMode'));
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    return (
        <div className={`${darkMode && "dark"}`}>
            <ThemeProvider theme={theme} colorMode={darkMode ? 'dark' : 'light'} >
                <div className="login-container min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center">
                    <Card>
                        <ToggleButtonGroup
                            value={darkMode ? 'dark' : 'light'}
                            isExclusive
                            onChange={toggleDarkMode}
                        >
                            <ToggleButton value="light">Light</ToggleButton>
                            <ToggleButton value="dark">Dark</ToggleButton>
                        </ToggleButtonGroup>
                        <Text>Current color mode: {darkMode ? 'dark' : 'light'}</Text>
                    </Card>
                    <div className="shopping-list">
                        <h1>Shopping List</h1>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                    </div>
                    <Link to="/" className="back-link">
                        Back to Login
                    </Link>
                    <button
                        className="toggle-dark-mode-button"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? "LHT" : "DRK"}
                    </button>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default ShoppingList;
