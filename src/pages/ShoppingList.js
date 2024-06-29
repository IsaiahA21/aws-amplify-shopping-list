// src/components/ShoppingList.js

import React, { useState, useEffect } from 'react';
import { ThemeProvider, defaultDarkModeOverride } from '@aws-amplify/ui-react';
import { useDarkMode } from '../hooks/useDarkMode';
import "./ShoppingList.css";
import AddItem from '../Components/AddItem';
import ItemList from '../Components/ItemList';
import itemData from "../others/items.json";
import Navbar from '../Components/Navbar';
import { useAuth } from "../AuthContext";
import { getUserItems } from "../api/db"

const ShoppingList = (props) => {
    const [darkMode, toggleDarkMode, disableDarkMode, enableDarkMode] = useDarkMode();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); // State variable for loading

    useEffect(() => {
        async function fetchData() {
            try {
                const userItems = await getUserItems();
                if (userItems === null) {
                    setItems(itemData);
                    console.log("User not login, using default items")
                } else {
                    console.log("retrived this user items:" + JSON.stringify(userItems))
                    // Sort items by timestamp in descending order (most recent first)
                    const sortedItems = userItems.sort((a, b) => b.timeStamp - a.timeStamp);
                    setItems(sortedItems);
                }

            } catch (error) {
                console.error('Error fetching user items:', error);
            }
            finally {
                setLoading(false); // Set loading to false after fetching data
            }
        }
        fetchData();
    }, []);
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

    const handleAddItem = (ItemObject) => {
        // console.log("The user is " + props.user)
        // const newItem = { id: uuidv4(), name: newItemName };
        setItems((currItems) => [ItemObject, ...currItems]);
    };

    const handleDeleteItem = (itemToDelete) => {
        setItems(items.filter(item => item.timeStamp !== itemToDelete.timeStamp));
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
                                {/* {console.log("isAuthenticated is " + isAuthenticated)} */}
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
