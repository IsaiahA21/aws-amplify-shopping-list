import React, { useState } from "react";
import { XMarkIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";

const handleImage = (selectedImage, setSelectedImage) => {
  return (
    <>
      <br />

      {/* Input element to select an image file */}
      <input
        type="file"
        name="myImage"
        // Event handler to capture file selection and update the state
        onChange={(event) => {
          console.log(event.target.files[0]); // Log the selected file
          setSelectedImage(event.target.files[0]); // Update the state with the selected file
        }}
      />
    </>
  );
};

const UseAIModal = ({ isOpen, closeModal, addItem, addAllItems }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [predefinedItems, setPredefinedItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    // "Item 9",
    // "Item 10",
  ]);

  if (!isOpen) {
    return null;
  }

  // Function to handle adding an item and removing it from the list
  const handleAddItem = (item) => {
    addItem(item);
    setPredefinedItems(predefinedItems.filter((i) => i !== item));
  };
  // function to handle remoining an item from the list
  const handleRemoveItem = (item) => {
    setPredefinedItems(predefinedItems.filter((i) => i !== item));
  };
  return (
    // Modal container
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            AI Predict
          </h3>

          {/* Close button */}
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <XMarkIcon className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Image upload */}
        <div className="">{handleImage(selectedImage, setSelectedImage)}</div>

        <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
          {predefinedItems.map((item) => (
            <div key={item} className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">{item}</span>
              <div>
                <button
                  type="button"
                  className="hover:bg-red-400 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                  onClick={() => handleRemoveItem(item)}
                >
                  <TrashIcon className="w-4 h-auto" />
                </button>
                <button
                  type="button"
                  className=" hover:bg-green-400  rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                  onClick={() => handleAddItem(item)}
                >
                  <CheckIcon className="w-4 h-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div class="flex justify-center items-center space-x-4 border-t pt-3">
          <button
            type="button"
            onClick={closeModal}
            class="py-2 w-20 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              addAllItems(predefinedItems);
            }}
            class="w-20 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseAIModal;
