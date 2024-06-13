import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    defaultDarkModeOverride,
    ThemeProvider,
} from '@aws-amplify/ui-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Fragment } from 'react'
import {
    Disclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { SunIcon, MoonIcon, SparklesIcon } from '@heroicons/react/24/outline'
import "./ShoppingList.css"

const ShoppingList = () => {
    const [darkMode, toggleDarkMode, disableDarkMode, enableDarkMode] = useDarkMode();
    const [showAddDiv, setShowAddDiv] = useState(false); // State to manage div visibility

    const handleInputClick = () => {
        setShowAddDiv(true);
    };
    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className={`${darkMode && "dark"}`}>
            <ThemeProvider theme={theme} colorMode={darkMode ? 'dark' : 'light'} >
                <div className="login-container min-h-screen bg-white dark:bg-neutral-800">
                    <Disclosure as="nav" className="bg-neutral-100 dark:bg-gray-900">
                        {({ open }) => (
                            <>
                                <div className="mx-auto px-2 sm:px-6 lg:px-8">
                                    <div className="relative flex h-20 items-center justify-between">
                                        <div className="relative">
                                            <div className="flex flex-shrink-0 items-center">
                                                <Link to="/">
                                                    <img
                                                        className="h-16 w-auto"
                                                        src="/ShoppingListLogoNoBackground.png"
                                                        alt="App Logo"
                                                    />
                                                </Link>
                                            </div>

                                        </div>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                            <div className={`mx-4  ${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-white border-gray-300'} rounded-xl border `}>
                                                <div className="flex items-center">
                                                    <button
                                                        className={`flex items-center justify-center w-10 h-10 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-400' : 'bg-white hover:bg-slate-100'}`}
                                                        onClick={disableDarkMode}
                                                    >
                                                        <SunIcon className="w-6 h-6 text-orange-300" />
                                                    </button>
                                                    <button
                                                        className={`flex items-center justify-center w-10 h-10 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-400' : 'bg-white hover:bg-slate-100'}`}
                                                        onClick={enableDarkMode}
                                                    >
                                                        <MoonIcon className="w-6 h-6 text-gray-900" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='hidden sm:block text-black dark:text-white'>
                                                Isaiah Asaolu
                                            </div>
                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm  focus:ring-white focus:ring-offset-4 focus: ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <div class="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                            <span class="font-medium text-2xl text-gray-600 dark:text-gray-300">IA</span>
                                                        </div>
                                                    </MenuButton>
                                                </div>
                                                <Transition
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <MenuItem>
                                                            {({ focus }) => (
                                                                <Link
                                                                    to="/"
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Account
                                                                </Link>
                                                            )}
                                                        </MenuItem>
                                                        <MenuItem>
                                                            {({ focus }) => (
                                                                <Link
                                                                    to=""
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Sign out
                                                                </Link>
                                                            )}
                                                        </MenuItem>
                                                    </MenuItems>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </Disclosure>
                    <main>
                        {/* I want this this to be center and the width to be 75% the width of the screen. On the bottom I want a border black */}
                        <div className="flex flex-col justify-center w-5/6 mx-auto  my-5">
                            <div className=" border-b border-black text-3xl font-semibold">
                                <h1>Shopping List</h1>
                            </div>
                        </div>

                        <div className="w-full flex justify-center">
                            <div className="flex items-center w-5/6 border border-gray-200 h-14 rounded rounded-b-none">
                                <input
                                    type="checkbox"
                                    className="mx-2 h-5 w-5 hover:cursor-pointer"
                                    disabled
                                />
                                <input
                                    type="text"
                                    placeholder="Add an Item"
                                    className="flex-grow outline-none focus:border-b focus:border-black"
                                    onClick={handleInputClick}
                                />
                            </div>

                        </div>
                        {showAddDiv && (
                            <div className=" w-5/6 mx-auto flex justify-between items-center bg-gray-400 p-2  border-gray-300 h-14 rounded rounded-t-none">
                                <button className="has-tooltip group flex items-center p-2 hover:bg-gray-100 rounded-lg dark:focus:ring-gray-700">
                                    <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black mt-12'>use computer vision</span>
                                    <SparklesIcon className="text-yellow-400 w-5 h-auto" />
                                </button>

                                <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add</button>
                            </div>

                        )}

                    </main>
                </div>
            </ThemeProvider >

        </div>

    );
};

export default ShoppingList;
