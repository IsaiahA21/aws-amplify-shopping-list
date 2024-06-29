import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {
  defaultDarkModeOverride,
  ThemeProvider,
  Card,
  Text,
  ToggleButton,
  ToggleButtonGroup,
} from '@aws-amplify/ui-react';
import { useDarkMode } from '../hooks/useDarkMode'; // Import the custom hook
import { useAuth } from '../AuthContext';
import { AuthUser, fetchUserAttributes } from 'aws-amplify/auth';

const Login = (props) => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const navigate = useNavigate();
  const { setIsAuthenticated, setCurrentUser } = useAuth();


  const continueAsGuest = () => {
    // AuthLogin(true);
    navigate('/ShoppingList');
  };

  const theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
  };
  return (
    // if darkMode is true, add the dark class to the div
    <div className={`${darkMode ? 'dark' : ''}`}>
      <ThemeProvider theme={theme} colorMode={darkMode ? 'dark' : 'light'} >
        <div className="login-container min-h-screen bg-white dark:bg-neutral-800 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
            <button
              onClick={continueAsGuest}
              className="mt-4 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Continue as Guest
            </button>
            <div className="hidden sm:block min-h-96 border-l border-gray-600 dark:border-gray-400 mx-4"></div>

            <div className="mt-4 sm:mt-0">
              <Authenticator loginMechanisms={['email']}
              // socialProviders={['amazon', 'apple', 'facebook', 'google']}
              >
                {({ user }) => {
                  if (user) {
                    fetchUserAttributes().then(userDetails => {
                      console.log("log in baby")
                      // AuthLogin(false);
                      setIsAuthenticated(true);
                      setCurrentUser(userDetails);
                      navigate('/ShoppingList');
                    }
                    )
                  }
                  return null;
                }
                }
              </Authenticator>                    </div>
          </div>
          <button
            className="absolute w-16 h-16 right-10 bottom-5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black font-semibold rounded-full"
            onClick={toggleDarkMode}
          >
            {darkMode ? "LHT" : "DRK"}
          </button>
        </div>
      </ThemeProvider >
    </div >
  );
};

export default Login;

// Custom sign in feature
/**
 * import { Authenticator } from '@aws-amplify/ui-react';
import { signUp, SignUpInput } from 'aws-amplify/auth';

export default function App() {
  const services = {
    async handleSignUp(input: SignUpInput) {
      // custom username and email
      const { username, password, options } = input;
      const customUsername = username.toLowerCase();
      const customEmail = options?.userAttributes?.email.toLowerCase();
      return signUp({
        username: customUsername,
        password,
        options: {
          ...input.options,
          userAttributes: {
            ...input.options?.userAttributes,
            email: customEmail,
          },
        },
      });
    },
  };
  return (
    <Authenticator services={services} initialState="signUp">
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
 */