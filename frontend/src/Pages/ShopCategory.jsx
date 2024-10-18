import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import Loader from "./Loader"; // Import your loader component

const ShopCategory = (props) => {
  const { all_product, setAllProducts } = useContext(ShopContext);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const baseURL = import.meta.env.VITE_API_URL;

  // Fetch local products from context
  useEffect(() => {
    if (all_product && all_product.length > 0) {
      // If products already exist in context, no need to show loader
      setLoading(false);
      setNewProducts(all_product);
    }
  }, [all_product]);

  // Fetch newly added products from MongoDB with a minimum loader duration of 1 second
  useEffect(() => {
    const fetchNewProducts = async () => {
      if (!all_product || all_product.length === 0) {
        // Only fetch if products aren't already in context (prevents refetching on route change)
        try {
          const response = await fetch(`${baseURL}/allproducts`);
          const data = await response.json();
          
          // Ensure loader shows for at least 1 second
          setTimeout(() => {
            setNewProducts(data);
            setLoading(false); // Stop loading after data is fetched and 1 second has passed
            if (setAllProducts) setAllProducts(data); // Update context with fetched data
          }, 1000); // 1 second minimum loader time
        } catch (error) {
          console.error("Error fetching new products:", error);
        }
      }
    };

    fetchNewProducts();
  }, [all_product, baseURL, setAllProducts]);

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  return (
    <div className="">
      <div className="flex my-4 mx-[170px] justify-between items-center">
        <p>
          <span className="font-semibold">Showing 1-{newProducts.length}</span> out of {newProducts.length} products
        </p>
        <div className="flex items-center py-3 px-4 rounded-full ring-2 ring-gray-600 hover:bg-gray-200">
          <span>Sort by</span>
          <img src={dropdown_icon} alt="dropdown" className="ml-2" />
        </div>
      </div>

      <div className="my-10 mx-20 grid grid-cols-4 gap-y-20">
        {newProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No products available</p>
        ) : (
          newProducts.map((item) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            }
            return null;
          })
        )}
      </div>
      <div className="flex justify-center items-center my-[150px] mx-auto w-[233px] h-[69px] rounded-full bg-slate-200 text-zinc-800 font-medium hover:text-black hover:bg-slate-300">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
