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
import { Hub } from 'aws-amplify/utils';
import { Amplify } from 'aws-amplify';
import { confirmUserAttribute, getCurrentUser, fetchUserAttributes, cognito } from 'aws-amplify/auth';
import { useAuth } from "../AuthContext";
import { getUserItems } from "../api/db"


const ShoppingList = (props) => {
    const [darkMode, toggleDarkMode, disableDarkMode, enableDarkMode] = useDarkMode();
    const [items, setItems] = useState([]);
    const [user, setUser] = useState(null); // State to hold user info
    const { username, userId, signInDetails } = useState(null);
    const { isAuthenticated, currentUser, setIsAuthenticated } = useAuth();


    useEffect(() => {
        // setItems(itemData);
        async function fetchData() {
            try {
                const userItems = await getUserItems();
                console.log("retrived this user items:" + JSON.stringify(userItems))
                // Sort items by timestamp in descending order (most recent first)
                const sortedItems = userItems.sort((a, b) => b.timeStamp - a.timeStamp);
                setItems(sortedItems);

            } catch (error) {
                console.error('Error fetching user items:', error);
            }
        }
        fetchData();
    }, []);

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
            {/* {console.log(state.user.signInDetails.loginId)
            } */}
            <ThemeProvider theme={theme} colorMode={darkMode ? 'dark' : 'light'}>
                <div className="login-container min-h-screen bg-white dark:bg-neutral-800">
                    <Navbar
                        darkMode={darkMode}
                        disableDarkMode={disableDarkMode}
                        enableDarkMode={enableDarkMode}
                    // isAuthenticated={props.isAuthenticated}
                    // updatedIsAuthenticated={props.updatedIsAuthenticated}
                    // currentUser={props.currentUser}
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
