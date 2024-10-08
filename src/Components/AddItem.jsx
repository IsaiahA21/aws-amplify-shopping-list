import React, { useState, useEffect } from "react";
import { SparklesIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import UseAIModal from "./useAIModal";
import { getUserItems, addUserItem } from "../api/db";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../hooks/AuthContext";

const AddItem = ({ onAdd }) => {
  const [showAddDiv, setShowAddDiv] = useState(false); // State to manage div visibility
  const [itemText, setItemText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleInputClick = () => {
    setShowAddDiv(true);
  };

  const closeDiv = () => {
    setShowAddDiv(false);
  };

  /**Modal functions */
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAddFromModal = (item) => {
    doAdd(item);
  };
  // Function to correctly handle adding all items from modal
  const addAllItemsFromModal = (items) => {
    items.forEach((item, index) => {
      setTimeout(() => {
        console.log(item);
        doAdd(item);
      }, index * 100); // Introduce a delay of .1 second between each item
    });
    handleCloseModal(); // Close modal after adding all items
  };
  const handleAddItem = async () => {
    if (itemText.trim() !== "") {
      doAdd(itemText);
      setItemText(""); // Clear input after adding item
    }
  };
  const doAdd = async (text, delay = 0) => {
    let itemObject;
    try {
      // console.log("isAuthenticated is : ", isAuthenticated);

      if (isAuthenticated) {
        itemObject = await addUserItem(text); // Call addUserItem in db.js
      } else {
        itemObject = {
          userId: uuidv4(),
          itemName: text,
          timeStamp: new Date().getTime(),
        }; // Create item object with and current timestamp
      }
      onAdd(itemObject); //  update local state
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error as needed
    }
  };

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
            className="flex-grow outline-none focus:border-b focus:border-black dark:text-gray-200 dark:bg-neutral-800"
            onClick={handleInputClick}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleAddItem();
              }
            }}
            onChange={(e) => setItemText(e.target.value)}
          />
        </div>
      </div>
      {showAddDiv && (
        <div className=" w-5/6 mx-auto flex justify-between items-center bg-gray-400 p-2  border-gray-300 h-14 rounded rounded-t-none">
          <button
            onClick={handleOpenModal}
            className="has-tooltip group flex items-center p-2 hover:bg-gray-100 rounded-lg dark:focus:ring-gray-700"
          >
            <span class="tooltip rounded shadow-lg p-1 bg-gray-100 text-black mt-12">
              use computer vision
            </span>
            <SparklesIcon className="text-yellow-400 w-7 h-auto" />
          </button>
          <div>
            <button
              // onClick={AddItemButton}
              onClick={handleAddItem}
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add
            </button>

            <button
              onClick={closeDiv}
              className="ml-2 p-2 hover:bg-gray-100 rounded-lg dark:focus:ring-gray-700 "
            >
              <ChevronUpIcon className="w-5 h-auto" />
            </button>
          </div>
        </div>
      )}
      <UseAIModal
        isOpen={openModal}
        closeModal={handleCloseModal}
        addItem={handleAddFromModal}
        addAllItems={addAllItemsFromModal}
      />
    </>
  );
};
export default AddItem;
