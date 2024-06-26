import { useDarkMode } from '../hooks/useDarkMode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    defaultDarkModeOverride,
    ThemeProvider, AccountSettings, Card, withAuthenticator
} from '@aws-amplify/ui-react';
import Navbar from '../Components/Navbar';


/** FOr handling user reset password
 * https://sst.dev/archives/handle-forgot-and-reset-password.html
 * 
 * https://medium.com/@muftaudeenjimoh/react-and-authentication-with-aws-amplify-and-cognito-2ccf3aa825e4
 */

const Account = (props) => {
    const [darkMode, toggleDarkMode, disableDarkMode, enableDarkMode] = useDarkMode();
    const [firstName, setFirstName] = useState("Isaiah");
    const [lastName, setLastName] = useState("Asaolu");
    const [userEmail, setUserEmail] = useState("username@gmail.com");

    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);

    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
    };
    const handleSuccess = () => {
        alert('password is successfully changed!')
    }
    const submitUserChanges = () => {
        if (newFirstName !== '' || newLastName !== '') {
            if (newFirstName !== firstName || newLastName !== lastName) {
                setFirstName(newFirstName);
                setLastName(newLastName);
                // alert(firstName + " " + lastName)
                // alert('User details updated successfully');
            }
        }
    };

    const isSaveDisabled = (newFirstName === firstName && newLastName === lastName) || newFirstName === '' || newLastName === '';
    const navi = useNavigate();

    useEffect(() => {
        if (!props.isAuthenticated) {
            navi("/Login");
        }
    }, [props.isAuthenticated, navi]);
    return (
        <div className={`${darkMode && "dark"}`}>
            <ThemeProvider theme={theme} colorMode={darkMode ? 'dark' : 'light'} >
                <div className="login-container min-h-screen bg-white dark:bg-neutral-800">
                    <Navbar
                        darkMode={darkMode}
                        disableDarkMode={disableDarkMode}
                        enableDarkMode={enableDarkMode}
                        isAuthenticated={props.isAuthenticated}
                        updatedIsAuthenticated={props.updatedIsAuthenticated}
                    />
                    <main>
                        {/* user avatar */}
                        <div className='w-1/2 mx-auto text-center my-4'>
                            <div class="relative inline-flex items-center justify-center w-28 h-28 sm:w-44 sm:h-44 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <span class="font-medium text-gray-600 dark:text-gray-300 text-6xl sm:text-8xl">{firstName.at(0) + lastName.at(0)}</span>
                            </div>
                        </div>
                        {/* User fullname */}
                        <div className="flex flex-col justify-center w-5/6 mx-auto ">
                            <div className=" border-b border-black text-2xl sm:text-3xl font-semibold text-center dark:dark:text-gray-300 dark:border-gray-400">
                                <h1>{firstName + " " + lastName}</h1>
                            </div>
                        </div>
                        <form className="flex flex-col justify-center w-1/2 mx-auto mt-5 border p-3 border-black rounded dark:border-gray-400">
                            {/* First name and last name */}
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full md:w-1/2 px-3 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-300" for="grid-first-name">
                                        First Name
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white " id="grid-first-name" type="text" placeholder={firstName} required
                                        value={newFirstName}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                    />
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-300" for="grid-last-name">
                                        Last Name
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder={lastName} required
                                        value={newLastName}
                                        onChange={(e) => setNewLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* email */}
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full md:w-full px-3 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-gray-300" for="grid-email">
                                        Email
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder={userEmail} disabled />
                                </div>
                            </div>
                            <button onClick={submitUserChanges} type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                disabled={isSaveDisabled}
                            >Save</button>
                            <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Reset Password</button>
                        </form>
                    </main>
                </div>
            </ThemeProvider>
        </div>
    );
}
export default (Account);// wrap the component with the withAuthenticator meaning the user must be logined to access the page