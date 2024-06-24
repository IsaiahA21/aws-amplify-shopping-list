// src/components/ShoppingList.js

import React, { useState, useEffect } from 'react';
import { ThemeProvider, defaultDarkModeOverride } from '@aws-amplify/ui-react';
import { useDarkMode } from '../hooks/useDarkMode';
import "./ShoppingList.css";
import AddItem from '../Components/AddItem';
import ItemList from '../Components/ItemList';
import itemData from "../others/items.json";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../Components/Navbar';

const ShoppingList = () => {
    const [darkMode, toggleDarkMode, disableDarkMode, enableDarkMode] = useDarkMode();
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(itemData);
    }, []);

    const handleAddItem = (newItemName) => {
        const newItem = { id: uuidv4(), name: newItemName };
        setItems((currItems) => [newItem, ...currItems]);
    };

    const handleDeleteItem = (itemToDelete) => {
        setItems(items.filter(item => item.id !== itemToDelete.id));
    };

    const theme = {
        name: 'my-theme',
        overrides: [defaultDarkModeOverride],
    };

    return (
        <div className={`${darkMode && "dark"}`}>
            <ThemeProvider theme={theme} colorMode={darkMode ? 'dark' : 'light'}>
                <div className="login-container min-h-screen bg-white dark:bg-neutral-800">
                    <Navbar
                        darkMode={darkMode}
                        disableDarkMode={disableDarkMode}
                        enableDarkMode={enableDarkMode}
                    />
                    <main>
                        <div className="flex flex-col justify-center w-5/6 mx-auto my-5">
                            <div className="border-b border-black text-4xl font-semibold text-left dark:text-gray-300 dark:border-gray-400">
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
            </ThemeProvider>
        </div>
    );
};

export default ShoppingList;
