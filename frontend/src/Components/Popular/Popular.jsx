import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import Loader from '../../Pages/Loader'; // Import your loader component

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch popular products from your backend or context
    const fetchPopularProducts = async () => {
      try {
        setLoading(true); // Start loader when fetching begins
        const response = await fetch(`${baseURL}/popular-products`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPopularProducts(data);
        setLoading(false); // Stop loader once data is fetched
      } catch (error) {
        console.error("Error fetching popular products:", error);
        setLoading(false); // Stop loader in case of error
      }
    };

    fetchPopularProducts(); // Fetch data
  }, [baseURL]);

  // Render loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-[10px] h-[90vh] ml-4 mt-4">
      <h1 className="text-4xl font-semibold font-sriracha bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
        OUR POPULAR PRODUCTS
      </h1>

      <hr className="w-[300px] h-[6px] rounded-full bg-gradient-to-r from-cyan-500 to-lime-500 shadow-lg" />
      <div className="mt-20 flex gap-16">
        {popularProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No popular products available</p>
        ) : (
          popularProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Popular;
