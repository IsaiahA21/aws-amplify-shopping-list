import React, { useState, useRef } from "react";
import { XMarkIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";

const handleImage = (
  selectedImage,
  setSelectedImage,
  fileInputRef,
  setLoading
) => {
  return (
    <>
      <br />

      {/* Input element to select an image file */}
      <input
        type="file"
        name="myImage"
        ref={fileInputRef} // A reference to the file input element so that I can reset its value when necessary.
        // Event handler to capture file selection and update the state
        onChange={(event) => {
          const file = event.target.files[0];
          console.log(file); // Log the selected file
          if (file.size > 5000000) {
            setSelectedImage(null);
            fileInputRef.current.value = ""; // Reset the file input value
            alert("Image is too large!");
            return;
          } else if (
            !["jpg", "jpeg", "png"].includes(file.name.split(".")[1])
          ) {
            setSelectedImage(null);
            fileInputRef.current.value = ""; // Reset the file input value
            alert("File type incorrect!");
            return;
          }
          console.log("here");
          setSelectedImage(file); // Update the state with the selected file
          setLoading(true);
          setTimeout(() => {
            console.log("here1");
            setLoading(false);
          }, 10000);
          console.log("here2");
        }}
      />
    </>
  );
};

const UseAIModal = ({ isOpen, closeModal, addItem, addAllItems }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null); // Create a reference to the file input
  const [loading, setLoading] = useState(false);

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
        <div className="">
          {handleImage(
            selectedImage,
            setSelectedImage,
            fileInputRef,
            setLoading
          )}
        </div>

        {/* Display predictions */}
        <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
          {loading ? (
            // Loading spinner
            <>
              <div class="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </>
          ) : (
            // Display predictions
            predefinedItems.map((item) => (
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
            ))
          )}
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
