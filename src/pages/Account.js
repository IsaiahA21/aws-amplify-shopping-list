import { useDarkMode } from '../hooks/useDarkMode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    defaultDarkModeOverride,
    ThemeProvider, AccountSettings, Card, withAuthenticator
} from '@aws-amplify/ui-react';
import Navbar from '../Components/Navbar';
import { useAuth } from "../AuthContext";
import ResetPassword from '../Components/ResetPasswordModal';
import DeleteAccountModal from '../Components/DeleteAccountModal';
import { updateUserAttribute } from 'aws-amplify/auth';
import { getUserItems, deleteItem } from '../api/db';


/** FOr handling user reset password
 * https://sst.dev/archives/handle-forgot-and-reset-password.html
 * 
 * https://medium.com/@muftaudeenjimoh/react-and-authentication-with-aws-amplify-and-cognito-2ccf3aa825e4
 */

const Account = (props) => {
    const [darkMode, toggleDarkMode, disableDarkMode, enableDarkMode] = useDarkMode();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("username@gmail.com");
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const navigate = useNavigate();

    //When the  user's attributes is update and setCurrentUser() is called, it updates the context. The context is managed by the AuthContext.js
    const { isAuthenticated, currentUser, setIsAuthenticated, setCurrentUser } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true); // State variable for loading
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { DeleteUser } = useAuth();


    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
    };
    const handleSuccess = () => {
        alert('password is successfully changed!')
    }
    /**Modal functions */
    const handleOpenPwdModal = () => {
        setOpenModal(true);
    };

    const handleClosePwdModal = () => {
        setOpenModal(false);
    };
    const submitUserChanges = async () => {
        console.log('submitUserChanges clicked');
        if (newFirstName !== '' || newLastName !== '') {
            if (newFirstName !== firstName || newLastName !== lastName) {
                setFirstName(newFirstName);
                setLastName(newLastName);

                // call the function to update the user attribute in the cognito user pool
                handleUpdateUserAttribute('name', newFirstName + ' ' + newLastName);
                setCurrentUser({ ...currentUser, name: newFirstName + ' ' + newLastName });// update the current user in the context    
            }
        }
    };

    async function handleUpdateUserAttribute(attributeKey, value) {
        try {
            const output = await updateUserAttribute({
                userAttribute: {
                    attributeKey,
                    value
                }
            });
            alert(attributeKey + ' was successfully updated.')
            handleUpdateUserAttributeNextSteps(output);
        } catch (error) {
            console.log(error);
        }
    }

    // If changing an attribute that requires confirmation (i.e. email or phone_number), 
    // the user will receive a confirmation code either to their email or cellphone
    function handleUpdateUserAttributeNextSteps(output) {
        const { nextStep } = output;

        switch (nextStep.updateAttributeStep) {
            case 'CONFIRM_ATTRIBUTE_WITH_CODE':
                const codeDeliveryDetails = nextStep.codeDeliveryDetails;
                console.log(
                    `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
                );
                // Collect the confirmation code from the user and pass to confirmUserAttribute.
                break;
            case 'DONE':
                console.log(`attribute was successfully updated.`);
                break;
        }
    }

    useEffect(() => {
        // Redirect to login if not authenticated
        // if (!isAuthenticated || !currentUser) {
        //     navigate('/Login');
        // } else {
        // Fetch user attributes if authenticated
        const fetchUserAttributes = async () => {
            try {
                const fullName = currentUser.name;
                const [first, last] = fullName.split(' ');
                setFirstName(first || '');// set the first name to the first name of the user if it exists
                setLastName(last || '');
                setUserEmail(currentUser.email);
                setNewFirstName(first || '');
                setNewLastName(last || '');
            } catch (error) {
                console.error('Error fetching user attributes', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUserAttributes();
        // }
    }, [isAuthenticated, currentUser, navigate]);

    const isSaveDisabled = (newFirstName === firstName && newLastName === lastName) || newFirstName === '' || newLastName === '';

    if (loading) {
        console.log("loading")
        return (
            <div class="text-center">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        ); // Display loading text while fetching data
    }

    async function deleteUserItems() {
        const items = await getUserItems();
        items.forEach(async (item) => {
            await deleteItem(item.timeStamp);
        });
    }

    const handleDeleteUser = async () => {
        await deleteUserItems();
        const deleteResult = await DeleteUser(); // call the delete user function from the AuthContext
        if (deleteResult === 'SUCCESS') {
            alert('Your account has been deleted.');
        } else {
            alert('There was an error deleting your account. Please try again later!');
        }
        navigate('/');

    };

    const toggleDeleteModal = () => {
        setOpenDeleteModal(!openDeleteModal);
    };

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
                        currentUser={props.currentUser}

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
                            <button
                                onClick={handleOpenPwdModal}
                                type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                            >Reset Password
                            </button>
                            <div
                                onClick={toggleDeleteModal}
                                className=' text-center' > <span className='underline hover:cursor-pointer'>
                                    Delete Account</span>
                            </div>
                            <DeleteAccountModal
                                isOpen={openDeleteModal}
                                onClose={toggleDeleteModal}
                                onDelete={handleDeleteUser}
                            />
                        </form>
                    </main>
                </div>
            </ThemeProvider>
            <ResetPassword
                isOpen={openModal}
                closeModal={handleClosePwdModal}
            />
        </div>
    );
}
export default (Account);// wrap the component with the withAuthenticator meaning the user must be logined to access the page