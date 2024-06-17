import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    defaultDarkModeOverride,
    ThemeProvider,
} from '@aws-amplify/ui-react';
import { useDarkMode } from '../hooks/useDarkMode';
import {
    Disclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import "./ShoppingList.css"
import AddItem from '../Components/AddItem';
import ItemList from '../Components/ItemList';
import itemData from "../others/items.json";
import { v4 as uuidv4 } from 'uuid'

const ShoppingList = () => {
    const [darkMode, toggleDarkMode, disableDarkMode, enableDarkMode] = useDarkMode();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(itemData);
    }, []);

    const handleAddItem = (newItemName) => {
        const newItem = { id: uuidv4(), name: newItemName };
        // uses the spread operator to copy the existing items array and add the new item to the front of the array.
        setItems([newItem, ...items]); //
    };
    const handleDeleteItem = (itemToDelete) => {
        setItems(items.filter(item => item.id !== itemToDelete.id)); // Remove the item from the list
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
                        {/*In AddItem, When the add button is clicked, it calls the onAdd function passed down as a prop to add the item to the list.  */}
                        {/* The AddItem component is responsible for adding new items, but the actual list of items is managed by the ShoppingList component. 
                        For the ShoppingList component to update the items, the AddItem component needs to communicate the new item back to the ShoppingList. */}
                        <AddItem onAdd={handleAddItem} />

                        {/* The handleDeleteItem function is passed to ItemList as onDelete. */}
                        <div className='mt-2'>
                            <ItemList allItems={items} onDelete={handleDeleteItem} />
                        </div>
                    </main>
                </div>
            </ThemeProvider >

        </div>

    );
};

export default ShoppingList;
