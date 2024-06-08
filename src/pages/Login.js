// src/components/Login.js

import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
// import { Auth } from 'aws-amplify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);// set dark mode to the opposite of whatever it currently is
    }
    const navigate = useNavigate();

    const continueAsGuest = () => {
        // Redirect to a different page
        navigate('/');
    };

    return (
        // if darkMode is true, add the dark class to the div
        <div className={`${darkMode && "dark"}`}>
            <div className="login-container min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
                    <button
                        onClick={continueAsGuest}
                        className="mt-4 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Continue as Guest
                    </button>
                    <div className="hidden sm:block min-h-96 border-l border-gray-600 dark:border-gray-400 mx-4"></div>

                    <div className="mt-4 sm:mt-0">
                        <Authenticator loginMechanisms={['email']} socialProviders={['amazon', 'apple', 'facebook', 'google']}>
                            {({ signOut, user }) => (
                                <main>
                                    <h1>Hello {user.username}</h1>
                                    <button onClick={signOut}>Sign out</button>
                                </main>
                            )}
                        </Authenticator>                    </div>
                </div>
                <button
                    className="absolute w-16 h-16 right-10 bottom-5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black font-semibold rounded-full"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? "LHT" : "DRK"}
                </button>
            </div>
        </div>
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