import React from "react";
import { AccountSettings } from "@aws-amplify/ui-react";
import { XMarkIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from '../hooks/useDarkMode'; // Import the custom hook
import {
    defaultDarkModeOverride,
    ThemeProvider,
} from '@aws-amplify/ui-react';
import "./resetPasswordModal.css";

const ResetPassword = (props) => {
    const [darkMode, toggleDarkMode] = useDarkMode();

    const minLength = {
        validationMode: "onChange",
        validator: (password) => password.length >= 4,
        message: "Password must have length 4 or greater",
    };

    const maxLength = {
        validationMode: "onChange",
        validator: (password) => password.length <= 12,
        message: "Password must have length 12 or less",
    };

    const handleSuccess = () => {
        alert("password is successfully changed!");
    };
    if (props.isOpen === false) {
        return null;
    }
    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
    };
    return (
        // Modal container
        <div className={`${darkMode ? 'dark' : ''}`}>
            <ThemeProvider theme={theme} colorMode={darkMode ? 'dark' : 'light'} >
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            {/* Title */}
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Reset Password
                            </h3>

                            {/* Close button */}
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={props.closeModal}
                            >
                                <XMarkIcon className="w-5 h-5" />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 space-y-4 max-h-80 overflow-y-auto dark:text-white ">
                            <AccountSettings.ChangePassword
                                onSuccess={handleSuccess}
                                validators={[minLength, maxLength]}
                            // className={`${darkMode ? 'dark:text-white dark:bg-gray-800' : 'text-red-600'}`} // Apply dark mode styles to ChangePassword component

                            />
                        </div>

                    </div>
                </div>
            </ThemeProvider >
        </div >
    );
}

export default ResetPassword;
