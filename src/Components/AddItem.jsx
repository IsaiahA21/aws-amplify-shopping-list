import React, { useState, useEffect } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline'

const AddItem = ({onAdd}) => {
    const [showAddDiv, setShowAddDiv] = useState(false); // State to manage div visibility
    const [itemText, setItemText] = useState('');

    const handleInputClick = () => {
        setShowAddDiv(true);
    };
    const AddItemButton = () => {
        if(itemText.trim() !== ''){
            onAdd(itemText)
            setItemText('');
            // setShowAddDiv(false);
        }
    }
    return (
        <>
            <div className="w-full flex justify-center">
                <div className="flex items-center w-5/6 border border-gray-200 h-14 rounded rounded-b-none">
                    <input
                        type="checkbox"
                        className="mx-2 h-5 w-5 hover:cursor-pointer"
                        disabled
                    />
                    <input
                        value={itemText}
                        type="text"
                        placeholder="Add an Item"
                        className="flex-grow outline-none focus:border-b focus:border-black"
                        onClick={handleInputClick}
                        onKeyUp={ (event) => {
                            if(event.key === 'Enter'){
                                AddItemButton()
                            }
                        }
                        }
                        onChange={(e) => setItemText(e.target.value)}
                    />
                </div>
            </div>
            {showAddDiv && (
                <div className=" w-5/6 mx-auto flex justify-between items-center bg-gray-400 p-2  border-gray-300 h-14 rounded rounded-t-none">
                    <button className="has-tooltip group flex items-center p-2 hover:bg-gray-100 rounded-lg dark:focus:ring-gray-700">
                        <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black mt-12'>use computer vision</span>
                        <SparklesIcon className="text-yellow-400 w-5 h-auto" />
                    </button>
                    <button 
                    onClick={AddItemButton}
                    type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add</button>
                </div>

            )}
        </>
    );
};
export default AddItem;