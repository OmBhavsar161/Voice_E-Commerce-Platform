import React, { useState, useEffect } from 'react';
import Item from '../Item/Item';
import Loader from '../../Pages/Loader'; // Import your loader component

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch new collection data from the backend
    const fetchNewCollections = async () => {
      try {
        setLoading(true); // Start loader when fetching starts
        const response = await fetch(`${baseURL}/newcollections`);
        const data = await response.json();
        setNewCollection(data); // Set the fetched data to state
        setLoading(false); // Stop loader once data is fetched
      } catch (error) {
        console.error("Error fetching new collections:", error);
        setLoading(false); // Stop loader in case of an error
      }
    };

    fetchNewCollections(); // Fetch data
  }, [baseURL]);

  // Render loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-[10px] mb-[100px] ml-4 mt-4">
      <h1 className="text-4xl font-semibold font-sriracha bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
        NEW COLLECTIONS
      </h1>
      <hr className="w-[250px] h-[6px] rounded-full bg-gradient-to-r from-cyan-500 to-lime-500 shadow-lg pb-1" />
      
      <div className="mt-16 grid grid-cols-4 gap-16 gap-y-28">
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
