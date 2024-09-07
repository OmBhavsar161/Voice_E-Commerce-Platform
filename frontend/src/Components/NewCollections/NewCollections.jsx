import React, { useState, useEffect } from 'react';
import Item from '../Item/Item';

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    // Fetch new collection data from backend
    const fetchNewCollections = async () => {
      try {
        const response = await fetch("http://localhost:4000/newcollections"); // Adjust the backend URL if deployed
        const data = await response.json();
        setNewCollection(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching new collections:", error);
      }
    };
    fetchNewCollections();
  }, []);

  return (
    <div className="flex flex-col items-center gap-[10px] mb-[100px] ml-4 mt-4 ">
      <h1 className="text-4xl font-semibold font-sriracha bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
        NEW COLLECTIONS
      </h1>
      <hr className="w-[250px] h-[6px] rounded-full bg-gradient-to-r from-cyan-500 to-lime-500 shadow-lg pb-1" />
      
      <div className="mt-16 grid grid-cols-4 gap-16 gap-y-28 ">
        {newCollection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
