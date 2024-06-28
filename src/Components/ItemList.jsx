import React, { useState } from "react";
import { deleteItem } from "../api/db";

const ItemList = ({ allItems = [], onDelete }) => {
  const [markedForDeletion, setMarkedForDeletion] = useState([]);

  const handleDelete = async (item) => {
    console.log(
      "id: " +
        item.timeStamp +
        " name: " +
        item.itemName +
        " is marked for deletion."
    );
    await deleteItem(item.timeStamp);
    setMarkedForDeletion([...markedForDeletion, item.timeStamp]);
    setTimeout(() => {
      onDelete(item);
      setMarkedForDeletion((prev) =>
        prev.filter((id) => id !== item.timeStamp)
      ); // after 300ms, remove the item from the list
    }, 300); // Adjust the delay as needed (500ms in this example)
  };

  return (
    <div className="w-full flex flex-col items-center ">
      {allItems.map((item, index) => (
        <div
          key={item.timeStamp}
          className={`flex items-center w-5/6 border border-gray-200 h-14 rounded transition-opacity duration-500 
                    ${
                      markedForDeletion.includes(item.timeStamp)
                        ? "opacity-0"
                        : "opacity-100"
                    }
                `}
        >
          <input
            type="checkbox"
            className="mx-2 h-5 w-5 hover:cursor-pointer"
            checked={markedForDeletion.includes(item.timeStamp)}
            onChange={() => handleDelete(item)}
          />
          <div className="dark:text-gray-200">
            <span
              className={`${
                markedForDeletion.includes(item.timeStamp) ? "line-through" : ""
              } `}
            >
              {item.itemName}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
