import React, { useState } from "react";

const ItemList = ({ allItems = [], onDelete }) => {
  const [markedForDeletion, setMarkedForDeletion] = useState([]);

  const handleDelete = (item) => {
    // console.log("id: " + item.id + " name: " + item.name + " is marked for deletion.")
    setMarkedForDeletion([...markedForDeletion, item.id]);
    setTimeout(() => {
      onDelete(item);
      setMarkedForDeletion((prev) => prev.filter((id) => id !== item.id)); // after 300ms, remove the item from the list
    }, 300); // Adjust the delay as needed (500ms in this example)
  };

  return (
    <div className="w-full flex flex-col items-center ">
      {allItems.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center w-5/6 border border-gray-200 h-14 rounded transition-opacity duration-500 
                    ${
                      markedForDeletion.includes(item.id)
                        ? "opacity-0"
                        : "opacity-100"
                    }
                `}
        >
          <input
            type="checkbox"
            className="mx-2 h-5 w-5 hover:cursor-pointer"
            checked={markedForDeletion.includes(item.id)}
            onChange={() => handleDelete(item)}
          />
          <div
          className=""
          >
            <span
              className={`${
                markedForDeletion.includes(item.id) ? "line-through" : ""
              }`}
            >
              {item.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
